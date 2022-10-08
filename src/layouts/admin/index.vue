<template>
  <n-layout class="admin-wrapper">
    <n-layout-header :inverted="inverted" :bordered="!inverted ? true : false" class="header">
      <div class="logo-wrapper">
        <img class="logo" src="../../assets/images/logo.png" alt="" />
        <h2 class="logo-title">{{ envParams?.VITE_SITE_NAME }}</h2>
      </div>
      <n-menu mode="horizontal" :inverted="inverted" :options="menuOptions" />
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
        <n-menu :inverted="inverted" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
      </n-layout-sider>
      <n-layout style="max-height: 100%">
        <router-view />
      </n-layout>
    </n-layout>
    <n-layout-footer :inverted="inverted" :bordered="!inverted ? true : false" class="footer"
      ><a href="https://beian.miit.gov.cn" target="_blank" rel="nofollow">{{ envParams?.VITE_FILING_NO }}</a></n-layout-footer
    >
  </n-layout>
</template>

<script lang="ts" setup>
import { h, ref, Component } from "vue";
import { NIcon } from "naive-ui";
import { BookOutline as BookIcon, PersonOutline as PersonIcon, WineOutline as WineIcon } from "@vicons/ionicons5";

const envParams = import.meta.env as any;
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const inverted = ref(false);

const menuOptions = [
  {
    label: "且听风吟",
    key: "hear-the-wind-sing",
    icon: renderIcon(BookIcon),
  },
  {
    label: "1973年的弹珠玩具",
    key: "pinball-1973",
    icon: renderIcon(BookIcon),
    // disabled: true,
    children: [
      {
        label: "鼠",
        key: "rat",
      },
    ],
  },
  {
    label: "寻羊冒险记6",
    key: "a-wild-sheep-chase6",
    // disabled: true,
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "鼠",
        key: "rat6",
      },
    ],
  },
  {
    label: "寻羊冒险记5",
    key: "a-wild-sheep-chase5",
    // disabled: true,
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "鼠",
        key: "rat5",
      },
    ],
  },
  {
    label: "寻羊冒险记4",
    key: "a-wild-sheep-chase4",
    // disabled: true,
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "鼠",
        key: "rat4",
      },
    ],
  },
  {
    label: "寻羊冒险记3",
    key: "a-wild-sheep-chase3",
    // disabled: true,
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "鼠",
        key: "rat3",
      },
    ],
  },
  {
    label: "寻羊冒险记2",
    key: "a-wild-sheep-chase2",
    // disabled: true,
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "鼠",
        key: "rat2",
      },
    ],
  },
  {
    label: "寻羊冒险记1",
    key: "a-wild-sheep-chase1",
    // disabled: true,
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "鼠",
        key: "rat1",
      },
    ],
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
    // disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        label: "饮品",
        key: "beverage",
        icon: renderIcon(WineIcon),
        children: [
          {
            label: "威士忌",
            key: "whisky",
          },
        ],
      },
      {
        label: "食物",
        key: "food",
        children: [
          {
            label: "三明治",
            key: "sandwich",
          },
        ],
      },
      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        label: "饮品",
        key: "beverage",
        icon: renderIcon(WineIcon),
        children: [
          {
            label: "威士忌",
            key: "whisky",
          },
        ],
      },
      {
        label: "食物",
        key: "food",
        children: [
          {
            label: "三明治",
            key: "sandwich",
          },
        ],
      },
      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        label: "饮品",
        key: "beverage",
        icon: renderIcon(WineIcon),
        children: [
          {
            label: "威士忌",
            key: "whisky",
          },
        ],
      },
      {
        label: "食物",
        key: "food",
        children: [
          {
            label: "三明治",
            key: "sandwich",
          },
        ],
      },
      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes",
      },
    ],
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
    text-align: center;
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
      &:hover {
        color: #007fff;
      }
    }
  }
}
</style>
