---
title: Vue3小知识
comment: true
sidebar: true
# link_reprint:
#   - url: null
#     title: null
link_refer:
  - url: null
    title: null
date: 2022-11-13 22:56:40
tags:
categories: vue
---

#### Vue3 小知识

###### vue3 中一些使用技巧 小知识

<!--more-->

- 全局选择器
  ```css
  /* .red 选择器将作用于全局 */
  :global(.red) {
    color: red;
  }
  ```
- 插槽选择器
  ```css
  /* .red 选择器将作用于 <slot /> 渲染出来的内容 */
  :slotted(.red) {
    color: red;
  }
  ```
- 深度选择器

  ```css
  /* ::v-deep 或 /deep/，而 Vue3 中我们可以使用 :deep 这个伪类 */
  .parent :deep(.red) {
    color: red;
  }
  ```

- v-bind css

  ```ts
  import { reactive } from "vue";
  defineProps({
    title: {
      type: String,
      default: "我的组件库",
    },
  });
  const theme: any = reactive({});
  setWhiteTheme();
  function setWhiteTheme() {
    theme.fontColor = "#000";
    theme.backgroundColor = "#fff";
  }
  function setBlackTheme() {
    theme.fontColor = "#fff";
    theme.backgroundColor = "#000";
  }
  ```

  ```css
  .content {
    color: v-bind("theme.fontColor");
    background-color: v-bind("theme.backgroundColor");
    height: @default-header-height;
  }
  ```

- script setup 与 script 一起使用

  ```js
    <script>
    export default {
    inheritAttrs: false, // 禁止父组件传递过来的属性 “透传” 到子组件的根节点
    customOptions: {} // 插件的自定义选项
    }
    </script>
    <script setup>
    </script>
  ```

  - v-memo

  ```html
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
    <p>...more child nodes</p>
  </div>
  ```
