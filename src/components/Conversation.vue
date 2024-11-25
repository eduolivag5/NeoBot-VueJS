<template>
  <div ref="messagesContainer" class="h-full overflow-y-auto pr-4 pb-4">
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="flex gap-1"
      :class="message.role === 'user' ? 'justify-start' : 'justify-end'"
    >
    <span
  class="max-w-full break-words p-2 rounded-md text-white"
  :class="message.role === 'user' 
    ? 'bg-zinc-700' 
    : 'bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900'"
>
  {{ message.content }}
</span>



    </div>
  </div>
</template>


<script>
export default {
  name: "Conversation",
  props: {
    messages: {
      type: Array,
      required: false,
      default: () => [],
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
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>
