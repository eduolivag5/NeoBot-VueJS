<template>
  <div class="h-full flex flex-col gap-4 overflow-hidden">
    <Header />
    
    <div class="flex-1 bg-zinc-900 p-4 overflow-hidden rounded-md">
      <div class="flex justify-between items-center">
        <p class="text-lg font-semibold">Historial</p>
        <button v-if="conversation.length > 0" @click="showConfirmModal = true" class="flex gap-1 items-center text-sm text-gray-400 hover:text-white">
          <XCircleIcon class="h-4 w-4" />
          Eliminar historial
        </button>
      </div>
      
      <p v-if="conversation.length === 0" class="text-gray-300 font-extralight">No hay mensajes en esta conversación.</p>
      <div class="mt-2 h-full pb-8">
        <Conversation :messages="conversation" :errorMessage="errorMessage" />
      </div>
    </div>

    <!-- Pasar la propiedad loading a Formulario -->
    <Formulario :loading="loading" @submit="handleSubmit" />

    <!-- Modal de Confirmación -->
    <ConfirmModal 
      :isVisible="showConfirmModal" 
      @update:visible="showConfirmModal = $event" 
      @delete="deleteConversation" 
    />
  </div>
</template>

<script>
import axios from 'axios';
import Formulario from './components/Formulario.vue';
import Conversation from './components/Conversation.vue';
import Header from './components/Header.vue';
import LoadingDots from './components/LoadingDots.vue';
import { XCircleIcon } from '@heroicons/vue/16/solid';
import ConfirmModal from './components/ConfirmModal.vue'; // Importar el modal

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export default {
  components: {
    Formulario,
    Conversation,
    Header,
    LoadingDots,
    XCircleIcon,
    ConfirmModal,
  },
  data() {
    return {
      conversation: [],
      errorMessage: '',
      loading: false,
      showConfirmModal: false,
    };
  },
  methods: {
    async handleSubmit(inputText) {
      try {
        this.conversation.push({
          role: "user",
          content: inputText,
        });
        this.saveConversationToCache();

        this.loading = true;
        this.conversation.push({
          role: "assistant",
          content: "loading",
        });
        this.saveConversationToCache();

        const requestBody = {
          model: "gpt-4o-mini",
          messages: this.conversation,
        };

        const headers = {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        };

        /*const assistantResponse = await new Promise((resolve) => {
          setTimeout(() => {
            resolve("prueba")
          }, 5000);
        });*/
        
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          requestBody,
          { headers }
        );

        // Obtener la respuesta de la API
        const assistantResponse = response.data.choices[0].message.content;

        this.conversation.pop();

        this.conversation.push({
          role: "assistant",
          content: assistantResponse,
        });
        this.saveConversationToCache();

        this.errorMessage = "";

        this.loading = false; // Set loading to false
      } catch (error) {
        this.errorMessage = "Hubo un error al realizar la solicitud a la API.";
        this.loading = false;
      }
    },
    saveConversationToCache() {
      localStorage.setItem("conversation", JSON.stringify(this.conversation));
    },
    loadConversationFromCache() {
      const cachedConversation = localStorage.getItem("conversation");
      if (cachedConversation) {
        this.conversation = JSON.parse(cachedConversation);
      }
    },
    deleteConversation() {
      this.conversation = [];
      localStorage.removeItem("conversation");
      this.showConfirmModal = false; // Cerrar el modal después de eliminar
    },
  },
  mounted() {
    this.loadConversationFromCache();
  },
};
</script>