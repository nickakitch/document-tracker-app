import { router } from "./router";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
