<template>
    <div class="flex gap-1">
      <div v-for="n in 3" :key="n" class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" :style="dotStyle(n)"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoadingDots",
    methods: {
      dotStyle(index) {
        return {
          animationDelay: `${index * 0.2}s`,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }
  
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  </style>
  