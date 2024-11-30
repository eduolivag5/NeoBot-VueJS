<template>
    <div v-if="isVisible" class="p-4 transition duration-200 fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-70 z-50">
      <div class="bg-zinc-800 rounded-lg p-6 w-96">
        <h2 class="text-lg font-semibold">¿Estás seguro?</h2>
        <p class="text-sm text-gray-300 mb-4">Una vez eliminado, no podrás recuperar el historial de la conversación.</p>
        <div class="flex justify-end gap-4">
          <button @click="cancel" class="px-4 py-2 text-sm text-white bg-gray-700 rounded-md hover:bg-gray-800">Cancelar</button>
          <button @click="confirmDelete" class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Eliminar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
    },
    methods: {
      cancel() {
        this.$emit('update:visible', false); 
      },
      confirmDelete() {
        this.$emit('delete');
        this.$emit('update:visible', false);
      },
    },
  };
  </script>
  