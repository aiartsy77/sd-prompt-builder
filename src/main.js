import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import naive from "naive-ui";

const pinia = createPinia();
const app = createApp(App);
app.use(naive);
app.use(pinia);
app.mount("#app");
