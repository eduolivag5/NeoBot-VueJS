<template>
    <div class="mb-4">
        <h1 class="text-white font-bold text-3xl md:text-5xl">Genera un código QR</h1>
    </div>
    <QrInputForm @generate="handleGenerate" />
    <QrDisplay :qrCodeData="qrCodeData" />
  </template>
  
<script>
    import QrInputForm from './QrInputForm.vue';
    import QrDisplay from './QrDisplay.vue';
    
    export default {
        components: { QrInputForm, QrDisplay },
        data() {
            return {
                qrCodeData: null, // Datos del código QR generado
            };
        },
        methods: {
            handleGenerate(data) {
                this.qrCodeData = data; // Recibe los datos del formulario
            },
        },
    };
</script>
  