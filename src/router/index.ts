// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Chatbot from '../components/Chatbot/Chatbot.vue';
import QrCode from '../components/QrCode/QrCode.vue';
import BiographyGenerator from '../components/Biography Generator/BiographyGenerator.vue';
import Home from '../components/Home.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/chatbot', name: 'chatbot', component: Chatbot },
  { path: '/qrCode', name:'qrGenerator', component: QrCode },
  { path: '/biography-generator', name: 'biographyGenerator', component: BiographyGenerator },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
