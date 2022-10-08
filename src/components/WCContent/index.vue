<template>
  <div class="content--wrapper">{{ content }}</div>
</template>
<script lang="ts" setup name="WCContent">
defineProps({
  content: {
    type: String,
    default: "内容升级中正在完善中...",
  },
});
</script>
<style scoped lang="less">
.content--wrapper {
  position: fixed;
  width: 100%;
  top: calc(@default-header-height + 12px);
  bottom: @default-footer-height;
  height: calc(100% - @default-header-height - @default-footer-height - 12px);
  text-align: center;
  background-color: #fff;
  max-width: 1440px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  box-sizing: border-box;
  padding: 12px;
}
</style>
