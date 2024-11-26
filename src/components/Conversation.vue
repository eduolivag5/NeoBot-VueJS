<template>
  <div ref="messagesContainer" class="h-full overflow-y-auto pr-4 pb-4">
    <!-- Contenedor de los mensajes con gap aplicado aquí -->
    <div class="flex flex-col gap-1 mt-2">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="flex"
        :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div class="flex flex-col gap-1 max-w-full">
          <p class="capitalize text-xs text-gray-400" :class="message.role === 'user' ? 'text-right' : 'text-left'">
            {{ message.role === 'user' ? 'Tú' : 'Neobot IA' }}
          </p>
          <span
            class="break-words p-2 text-xs rounded-md text-white"
            :class="{
              'bg-zinc-700': message.role === 'user',
              'bg-gradient-to-r from-blue-900 to-indigo-700': message.role !== 'user' && message.content !== 'loading', 
              'p-3': message.content === 'loading',
            }"
          >
            <template v-if="message.content === 'loading'">
              <div class="flex justify-end w-full">
                <LoadingDots />
              </div>
            </template>
            <template v-else>
              {{ message.content }}
            </template>
          </span>
        </div>
      </div>
      
    </div>
    <!-- Mostrar el mensaje de error si existe -->
    <div v-if="errorMessage"class=" text-red-500 text-center text-sm">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import LoadingDots from './LoadingDots.vue'; // Importa el componente LoadingDots

export default {
  name: "Conversation",
  components: {
    LoadingDots, // Registra el componente LoadingDots
  },
  props: {
    messages: {
      type: Array,
      required: false,
      default: () => [],
    },
    errorMessage: {  // Propiedad para el mensaje de error
      type: String,
      required: false,
      default: '',
    },
  },
  watch: {
    messages: {
      handler() {
        this.scrollToBottom();
      },
      deep: true,
    },
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth", // Desplazamiento suave
          });
        }
      });
    },
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>
