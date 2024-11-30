<template>
  <form @submit.prevent="generateQRCode" class="flex flex-col gap-4">
    <!-- Input de URL -->
    <div class="space-y-2">
      <label for="url" class="block text-sm font-medium mb-1">URL</label>
      <input
        v-model="url"
        id="url"
        type="text"
        class="p-2 bg-zinc-800 focus:outline-none rounded w-full"
        placeholder="Introduce una URL"
        required
      />
    </div>

    <!-- Colores Sólidos -->
    <div class="flex w-full justify-between gap-8">
      <div class="flex-1 space-y-2">
        <label class="block text-sm font-medium mb-1">Color</label>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(solid, index) in solidColors"
            :key="index"
            @click="selectSolid(solid)"
            :style="{ background: solid }"
            class="h-8 w-8 rounded-full cursor-pointer transition-all relative"
            :class="{
              'filter brightness-75': selectedType === 'solid' && backgroundColor === solid
            }"
          >
            <div v-if="selectedType === 'solid' && backgroundColor === solid" class="absolute inset-0 flex items-center justify-center text-white">
              <img src="/icons/checkIcon.svg" alt="Check" class="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón Generar -->
    <button
      type="submit"
      class="bg-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
    >
      Generar QR
    </button>
  </form>
</template>

<script>
export default {
  emits: ['generate'],
  data() {
    return {
      url: '',
      backgroundColor: '#ffffff', // Color por defecto
      selectedType: '', // 'solid'
      solidColors: [
          'rgb(248, 249, 250)', // Gris muy claro
          'rgb(222, 226, 230)', // Gris claro
          'rgb(73, 80, 87)', // Gris oscuro
          'rgb(33, 37, 41)', // Gris carbón
          'rgb(255, 89, 94)', // Rojo vivo
          'rgb(255, 146, 76)', // Naranja vibrante
          'rgb(255, 202, 58)', // Amarillo intenso
          'rgb(138, 201, 38)', // Verde fresco
          'rgb(63, 201, 93)', // Verde esmeralda
          'rgb(255, 173, 173)', // Rosa claro
          'rgb(255, 194, 169)', // Naranja pastel
          'rgb(202, 255, 191)', // Verde menta
          'rgb(195, 255, 208)', // Verde pastel
          'rgb(54, 148, 157)', // Azul verde
          'rgb(25, 130, 196)', // Azul brillante
          'rgb(66, 103, 172)', // Azul medio
          'rgb(86, 90, 160)', // Azul pálido
          'rgb(238, 75, 134)', // Fucsia
          'rgb(170, 224, 239)', // Azul cielo suave
      ]

    };
  },
  methods: {
    generateQRCode() {
      if (!this.url) return;
      this.$emit('generate', {
        url: this.url,
        backgroundColor: this.backgroundColor,
      });
    },
    selectSolid(solid) {
      this.selectedType = 'solid';
      this.backgroundColor = solid;
    },
  },
};
</script>
