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
    path: "/",
    redirect: "/admin",
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    redirect: "/admin/articles",
    children: [
      {
        path: "articles",
        name: "articles",
        component: () => import("/@/pages/admin/articles/index.vue"),
        meta: { title: "文章列表" },
      },
      {
        path: "tags",
        name: "tags",
        component: () => import("/@/pages/admin/tags/index.vue"),
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
