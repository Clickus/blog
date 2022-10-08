import type { Router } from "vue-router";
import { AxiosCanceler } from "/@/axios/axiosCancel";
/** 路由守卫 */
export function setupRouterGuard(router: Router) {
  createGuard(router);
}
/**
 * 路由切换时关闭当前页面完成请求的接口
 * @param router
 */
function createGuard(router: Router) {
  let axiosCanceler: Nullable<AxiosCanceler> = new AxiosCanceler();
  router.beforeEach(to => {
    /**切换路由会删除之前的请求 */
    axiosCanceler?.removeAllPending();
    /**动态设置页面title */
    const title = to?.meta?.title;
    if (title) document.title = title as string;
    return true;
  });
}
