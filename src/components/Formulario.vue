<template>
    <div class="space-y-2">
        <input type="text"class="w-full rounded-md bg-zinc-900 p-4 text-white focus:outline-none" v-model="inputText" placeholder="Escribe tu consulta aquí..."></input>
        
        <button class="rounded-md bg-indigo-700 hover:bg-indigo-800 w-full font-medium p-2 text-white" @click="handleSubmit">Enviar</button>
    </div>
</template>
  
<script>
    export default {
    data() {
        return {
            inputText: '', // Almacena el texto del usuario
        };
    },
    methods: {
        // Emitir el texto al componente padre
        handleSubmit() {
            this.$emit('submit', this.inputText);
            this.inputText = ''; // Limpiar el campo de texto
        }
    }
    };
</script>
  