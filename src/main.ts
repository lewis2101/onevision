import '@/style.css'
import { registerPlugins } from '@/plugins'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import App from './App.vue'
import { createApp } from 'vue'
import i18n from "@/plugins/i18n";
import router from "@/router";

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker);

registerPlugins(app)

app
  .use(router)
  .use(i18n)
  .mount('#app')
