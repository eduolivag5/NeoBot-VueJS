<template>
  <div id="sidebar" class="h-screen flex flex-col">

    <div class="w-64 h-full shadow-lg flex flex-col">

      <router-link to="/" class="p-4 flex items-center gap-4 text-lg font-bold">
        <img src="/logoNeobot.svg" alt="NeoBot Logo" class="w-8 h-8 rounded-full" />
        <span class="text-3xl">NeoBot</span>
      </router-link>

      <nav class="flex-1 p-2 space-y-2">
        <router-link 
          v-for="item in menuItems" 
          :key="item.id"
          :to="item.route"
          class="text-gray-200 text-sm w-full flex items-center gap-4 px-4 py-2 transition duration-200 font-medium"
          :class="[active === item.id && 'border-l-4 border-indigo-500']"
          @click="setActive(item.id)"
        >
          <img :src="`/icons/${item.icon}.svg`" class="w-6 h-6 rounded-full" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="p-4 text-center text-sm">
        &copy; 2024 NeoBot
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: this.getActiveTabFromRoute(), // Obtener el valor de la URL
      menuItems: [
        { id: 'chatbot', label: 'Chatbot', icon: 'message-chat', route: '/chatbot' },
        { id: 'qrGenerator', label: 'Generador QR', icon: 'qrcode', route: '/qrCode' },
        { id: 'biographyGenerator', label: 'Generador de biografía', icon: 'text-writter', route: '/biography-generator' }
      ]
    };
  },
  methods: {
    // Método para extraer la pestaña activa de la URL
    getActiveTabFromRoute() {
      const routeName = this.$route.name; // Obtener el nombre de la ruta activa
      return routeName || 'chatbot'; // Si no se encuentra un nombre de ruta, usar 'chatbot' como predeterminado
    },
    setActive(id) {
      this.active = id; // Actualizar la pestaña activa
    }
  },
  watch: {
    // Observar los cambios en la ruta para actualizar la pestaña activa
    '$route'(to, from) {
      this.active = this.getActiveTabFromRoute();
    }
  }
};
</script>

<style>
/* Import Boxicons */
@import url('https://cdn.jsdelivr.net/gh/boxicons/boxicons@2.1.1/css/boxicons.min.css');

#sidebar {
  background-color: #1e2023;
}
</style>
