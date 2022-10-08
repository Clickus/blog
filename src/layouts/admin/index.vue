<template>
  <n-layout class="admin-wrapper">
    <n-layout-header :inverted="inverted" :bordered="!inverted ? true : false" class="header">
      <div class="logo-wrapper">
        <img class="logo" src="../../assets/images/logo.png" alt="" />
        <!-- <h2 class="logo-title">{{ envParams?.VITE_SITE_NAME }}</h2> -->
      </div>
      <!-- <n-menu mode="horizontal" :inverted="inverted" :options="menuOptions" /> -->
    </n-layout-header>
    <n-layout has-sider class="content">
      <n-layout-sider
        :bordered="!inverted ? true : false"
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        :inverted="inverted"
        style="max-height: 100%"
      >
        <n-menu
          :inverted="inverted"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :default-value="menuOptions[0]?.key"
        />
      </n-layout-sider>
      <n-layout style="max-height: 100%">
        <router-view />
      </n-layout>
    </n-layout>
    <n-layout-footer :inverted="inverted" :bordered="!inverted ? true : false" class="footer">
      <span>{{ envParams?.VITE_SITE_NAME }}</span>
      <a href="https://beian.miit.gov.cn" target="_blank" rel="nofollow">{{ envParams?.VITE_FILING_NO }}</a>
    </n-layout-footer>
  </n-layout>
</template>
<script lang="ts" setup>
  import { h, ref, Component } from "vue";
  import { NIcon, NEllipsis } from "naive-ui";
  import type { MenuOption } from "naive-ui";
  import { BookmarksOutline, PricetagOutline, FileTrayFullOutline, PaperPlaneOutline } from "@vicons/ionicons5";
  import { RouteParamsRaw, RouterLink } from "vue-router";
  /**加载环境变量 */
  const envParams = import.meta.env as any;
  /**渲染图标Icon */
  const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) });
  };
  /**处理超长的菜单名称 */
  const renderMenuLabel = (label: string): Component => {
    return () => h(NEllipsis, null, { default: () => label });
  };
  /**
   * 渲染vue-router
   * @param param { name: 路由名称, params: params参数, query: query参数, label: 标题 }
   */
  const renderMenuVueRouter = ({
    name,
    params,
    query,
    label,
  }: {
    name?: string;
    params?: RouteParamsRaw;
    query?: RouteParamsRaw;
    label: string;
  }): Component => {
    if (!name) return renderMenuLabel(label);
    return () =>
      h(
        RouterLink,
        {
          to: {
            name,
            params,
            query,
          },
        },
        { default: renderMenuLabel(label) },
      );
  };
  /**颜色反转 */
  const inverted = ref(false);
  /**菜单配置项 */
  const menuOptions: MenuOption[] = [
    {
      label: renderMenuVueRouter({
        label: "文章管理",
        name: "article-manage",
      }),
      key: "article-manage",
      icon: renderIcon(BookmarksOutline),
    },
    {
      label: renderMenuVueRouter({
        label: "标签管理",
        name: "tag-manage",
      }),
      key: "tag-manage",
      icon: renderIcon(PricetagOutline),
    },
    {
      label: renderMenuVueRouter({
        label: "资源管理",
        name: "resource-manage",
      }),
      key: "resource-manage",
      icon: renderIcon(FileTrayFullOutline),
    },
    {
      label: renderMenuVueRouter({
        label: "账号管理",
        name: "account-manage",
      }),
      key: "account-manage",
      icon: renderIcon(PaperPlaneOutline),
    },
  ];
</script>

<style scoped lang="less">
  .admin-wrapper {
    height: 100%;
    background-color: #f4f4f4;

    :deep(.n-layout-scroll-container) {
      overflow: hidden;
    }
    .content {
      width: 100%;
      height: calc(100% - @default-header-height - @default-footer-height);
      background-color: #fff;
      box-sizing: border-box;
      overflow: hidden;
    }

    .header {
      height: @default-header-height;
      width: 100%;
      // background-color: var(--wc-header);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .container {
        height: 100%;
        margin: 0 auto;
        max-width: 1440px;
        display: flex;
        align-items: center;
        font-size: 16px;
      }
      .logo-wrapper {
        color: #333;
        display: flex;
        width: 240px;
        align-items: center;
        box-sizing: border-box;
        height: @default-header-height;
        .logo {
          height: 50px;
        }
        .logo-title {
          flex: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-top: 6px;
        }
      }
    }
    .footer {
      height: @default-footer-height;
      line-height: @default-footer-height;
      box-sizing: border-box;
      width: 100%;
      text-align: center;
      a {
        color: #999;
        font-size: 12px;
        margin-left: 12px;
        &:hover {
          color: #007fff;
        }
      }
    }
  }
</style>
