import "./assets/main.css";

import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import App from "./App.vue";
import { createPinia } from 'pinia'
import GameMenu from "./components/GameMenu.vue";
import GameScreen from "./components/GameScreen.vue";

const routes = [
  { path: "/", component: GameMenu, name:'game-menu' },
  { path: "/play-game/:id", component: GameScreen,name:'game-screen' },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
createApp(App).use(router).use(createPinia()).mount("#app");
