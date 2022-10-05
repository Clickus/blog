import { createApp } from 'vue'
import App from './App.vue'
import { registerGlobComp } from "/@/components/registerGlobComp";


const app = createApp(App);
/**注册全局组件 */
registerGlobComp(app);
/**挂载 */
app.mount("#app");

