<template>
    <div class="flex flex-col justify-center items-center h-full">
        <h1 class="text-4xl font-semibold text-center mb-10">Bienvenido a NeoBot</h1>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
            <div v-for="link in HomeLinks" :key="link.link" class="p-4 border border-zinc-600 hover:bg-zinc-800 rounded-lg transition duration-200">
                <router-link :to="link.link" class="flex flex-col items-center text-center">
                    <div class="flex gap-4 items-center justify-center mb-4">
                        <img :src="`/icons/${link.icon}.svg`" alt="Icono de la página" class="h-10 w-10">
                        <h2 class="font-medium">{{ link.title }}</h2>
                    </div>
                    <p class="text-sm text-gray-400">{{ link.description }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        name: "Home",
        data() {
            return {
                HomeLinks: [
                { link: "/chatbot", title: "Chatbot", icon: "message-chat", description: "Accede a nuestro chatbot inteligente." },
                { link: "/qrCode", title: "Generador QR", icon: "qrcode", description: "Crea códigos QR fácilmente." },
                { link: "/biography-generator", title: "Generador Biografía", icon: "text-writter", description: "Genera biografías personalizadas." },
                ],
            };
        },
    };
</script>
  