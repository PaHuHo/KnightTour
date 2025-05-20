import "./assets/main.css";

import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import App from "./App.vue";

import GameMenu from "./components/GameMenu.vue";
import GameScreen from "./components/Game.vue";

const routes = [
  { path: "/", component: GameMenu },
  { path: "/play-game", component: GameScreen },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
createApp(App).use(router).mount("#app");
