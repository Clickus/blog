<template>
  <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </n-config-provider>
</template>
<script setup></script>
<style>
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}

:root {
  --wc-header: #fff;
}

/* UI组件样式重置 */
.n-config-provider {
  height: 100%;
  overflow: hidden;
}
</style>
