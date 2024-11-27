<template>
  <div ref="messagesContainer" class="h-full overflow-y-auto pr-4 pb-4">
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
              <div v-html="formatMessage(message.content)"></div>
            </template>
          </span>
        </div>
      </div>
      
    </div>

    <div v-if="errorMessage"class=" text-red-500 text-center text-sm">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import LoadingDots from './LoadingDots.vue';

export default {
  name: "Conversation",
  components: {
    LoadingDots,
  },
  props: {
    messages: {
      type: Array,
      required: false,
      default: () => [],
    },
    errorMessage: {
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
            behavior: "smooth",
          });
        }
      });
    },
    formatMessage(content) {
      let formattedContent = content.replace(/\n/g, '<br />');
      formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      return formattedContent;
    }
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>
