<template>
  <div class="flex">
    <div class="hidden md:block">
      <Sidebar />
    </div>
    
    <div class="px-4 py-6 md:py-8 mx-auto w-full h-screen overflow-hidden max-w-4xl">
      <router-view />
    </div>

    

    <!-- https://www.twitterbio.io/ -->
    <!-- https://www.qrgpt.io/-->
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