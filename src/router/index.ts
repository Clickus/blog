import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// import DefaultLayout from "/@/layouts/default/index.vue";
import AdminLayout from "/@/layouts/admin/index.vue";
const routes: RouteRecordRaw[] = [
  {
    name: "notFound",
    path: "/:path(.*)+",
    redirect: {
      name: "NotFound",
    },
  },
  {
    path: "/NotFound",
    name: "NotFound",
    component: () => import("/@/pages/abnormal/404.vue"),
    meta: { title: "找不到页面" },
  },
  {
    path: "/",
    redirect: "/admin",
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    redirect: "/admin/article-manage",
    children: [
      {
        path: "article-manage",
        name: "article-manage",
        component: () => import("/@/pages/admin/article-manage/index.vue"),
        meta: { title: "文章列表" },
      },
      {
        path: "tag-manage",
        name: "tag-manage",
        component: () => import("/@/pages/admin/tag-manage/index.vue"),
        meta: { title: "标签列表" },
      },
      {
        path: "resource-manage",
        name: "resource-manage",
        component: () => import("/@/pages/admin/tag-manage/index.vue"),
        meta: { title: "标签列表" },
      },
      {
        path: "account-manage",
        name: "account-manage",
        component: () => import("/@/pages/admin/tag-manage/index.vue"),
        meta: { title: "标签列表" },
      },
    ],
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
