<template>
  <div class="header--wrapper">
    <div class="container">
      <img class="logo" src="../../assets/images/logo.png" alt="" />
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>
<script lang="ts" setup name="WCHeader">
defineProps({
  title: {
    type: String,
    default: "我的组件库-博客技术站",
  },
});
</script>
<style scoped lang="less">
.header--wrapper {
  position: fixed;
  height: @default-header-height;
  width: 100%;
  top: 0;
  left: 0;
  background-color: var(--wc-header);
  border-bottom: 1px solid #f1f1f1;
  z-index: 250;
  .container {
    height: 100%;
    margin: 0 auto;
    max-width: 1440px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #333;
  }
  .logo {
    height: 50px;
  }
}
</style>
