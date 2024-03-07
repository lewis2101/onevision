import '@/style.css'
import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import i18n from "@/plugins/i18n";
import router from "@/router";

const app = createApp(App)

registerPlugins(app)

app
  .use(router)
  .use(i18n)
  .mount('#app')
