import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// element-ElementPlus
import 'element-plus/dist/index.css'

// vue router
import router from './router/index'

//element plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(router)

// app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.mount("#app");