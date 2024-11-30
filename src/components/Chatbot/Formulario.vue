<template>
    <div class="mt-auto flex gap-2 p-2 pl-4 bg-zinc-900 rounded-md">
      <input 
        type="text" 
        class="w-full rounded-md text-sm bg-transparent text-white focus:outline-none" 
        v-model="inputText" 
        placeholder="Escribe tu consulta aquí..." 
      />
      
      <button 
        :disabled="loading" 
        class="disabled:bg-zinc-700 transition duration-200 rounded-md bg-indigo-700 hover:bg-indigo-800 font-medium p-2 px-4 text-white" 
        @click="handleSubmit"
      >
        Enviar
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        inputText: '',
      };
    },
    methods: {
      handleSubmit() {
        this.$emit('submit', this.inputText);
        this.inputText = '';
      }
    }
  };
  </script>
  