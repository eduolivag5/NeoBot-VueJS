<template>
  <div class="h-full flex flex-col gap-4 overflow-hidden">
    <!-- Encabezado -->
    <div class="mb-4">
      <h1 class="font-bold text-4xl md:text-6xl">NeoBot</h1>
      <h1 class="font-medium text-gray-300 text-lg md:text-xl">Pregunta a la IA lo que quieras</h1>
    </div>

    <!-- Componente de conversación, ocupa todo el espacio disponible -->
    <div class="flex-1 bg-zinc-900 p-4 overflow-hidden rounded-md">
      <p class="text-lg font-semibold">Historial de conversación</p>
      <p v-if="conversation.length === 0" class="text-gray-300">No hay mensajes en el historial de conversación.</p>
      <div class="mt-2 p-2 h-full pb-8">
        <Conversation :messages="conversation" />
      </div>
    </div>

    <!-- Formulario fijo al final -->
    <div class="mt-auto">
      <Formulario @submit="handleSubmit" />
    </div>

    <!-- Mostrar errores en caso de que falle la llamada -->
    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Formulario from './components/Formulario.vue';
import Conversation from './components/Conversation.vue';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export default {
  components: {
    Formulario,
    Conversation,
  },
  data() {
    return {
      conversation: [],
      errorMessage: '', // Mensaje de error
    };
  },
  methods: {
    async handleSubmit(inputText) {
      try {
        // Agregar el mensaje del usuario al JSON
        this.conversation.push({
          role: "user",
          content: inputText,
        });

        // Configurar la solicitud a OpenAI
        const requestBody = {
          model: "gpt-4o-mini",
          messages: this.conversation,
        };

        const headers = {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        };

        /* Realizar la solicitud a la API
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          requestBody,
          { headers }
        );

        // Obtener la respuesta de la API
        const assistantResponse = response.data.choices[0].message.content;
        */

        const assistantResponse = 'Hola, ¿cómo estás?';

        // Agregar el mensaje del asistente al JSON
        this.conversation.push({
          role: "assistant",
          content: assistantResponse,
        });

        // Limpiar errores si todo funciona
        this.errorMessage = '';
      } catch (error) {
        // Manejar errores
        this.errorMessage = 'Hubo un error al realizar la solicitud a la API.';
      }
    },
  },
};
</script>
