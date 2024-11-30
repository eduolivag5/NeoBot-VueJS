<template>
  <div class="mt-10 w-full flex flex-col items-center border-t-2 border-gray-700 p-4">
    <span class="mb-4 text-lg font-medium" v-if="qrCodeInstance">Tu código QR:</span>
    <div class="flex gap-4 text-center">
      <div ref="qrCodeContainer"></div>
      <div v-if="qrCodeInstance">
        <button 
          class="px-8 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition duration-200"
          @click="downloadQRCode"
        >
          Descargar
        </button>
      </div>
    </div>
  </div>
  
</template>

<script>
import QRCodeStyling from 'qr-code-styling';

export default {
  props: {
    qrCodeData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      qrCodeInstance: null, // Variable para almacenar la instancia del QR generado
    };
  },
  watch: {
    qrCodeData: {
      immediate: true,
      handler(newData) {
        if (newData) {
          this.$nextTick(() => {
            this.generateQrCode(newData.url, newData.backgroundColor);
          });
        }
      },
    },
  },
  methods: {
    generateQrCode(url, backgroundColor) {
      // Limpiar el contenedor antes de agregar un nuevo QR
      const container = this.$refs.qrCodeContainer;
      container.innerHTML = ''; // Borrar cualquier contenido previo del contenedor

      // Si el color de fondo no se pasa, se establece como blanco por defecto
      const backgroundOptions = { color: backgroundColor || '#FFFFFF' };

      const options = {
        width: 200,
        height: 200,
        type: 'svg', // Se puede elegir 'svg' o 'canvas'
        data: url,
        dotsOptions: {
          color: '#000000', // Color de los puntos del QR
        },
        backgroundOptions,
      };

      // Crear nueva instancia de QRCodeStyling
      const qrCode = new QRCodeStyling(options);
      
      // Agregarlo al contenedor
      qrCode.append(container);
      
      // Guardar la nueva instancia
      this.qrCodeInstance = qrCode; // Almacena la nueva instancia
    },

    downloadQRCode() {
      // Aseguramos que el código QR esté generado
      if (this.qrCodeInstance) {
        this.qrCodeInstance.download({
          name: 'qr-code',
          extension: 'png', // Puedes elegir 'svg' o 'png'
        });
      }
    },
  },
};
</script>
