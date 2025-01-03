<template>
  <div class="flex h-full">
    <div class="hidden md:block">
      <Sidebar />
    </div>
    
    <div class="px-4 py-6 md:py-8 mx-auto w-full max-w-4xl">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Sidebar
  }
};
</script>