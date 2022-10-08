import { createApp } from 'vue'
import App from './App.vue'
import { setupRouterGuard } from "/@/router/guard";
import { registerGlobComp } from "/@/components/registerGlobComp";
import router from "./router";
import store from "./store";


// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp(App);
/**注册全局组件 */
registerGlobComp(app);
/**路由守卫 */
setupRouterGuard(router);
/**路由 */
app.use(router);
/**pinia状态管理 */
app.use(store);
/**挂载 */
app.mount("#app");


