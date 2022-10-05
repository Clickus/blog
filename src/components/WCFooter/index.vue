<template>
  <div class="footer--wrapper">
    <a href="https://beian.miit.gov.cn" target="_blank" rel="nofollow">{{ no }}</a>
  </div>
</template>
<script lang="ts" setup name="WCFooter">
defineProps({
  no: {
    type: String,
    default: "蜀ICP备2020028876号-2",
  },
});
</script>
<style scoped lang="less">
.footer--wrapper {
  position: fixed;
  height: @default-footer-height;
  line-height: @default-footer-height;
  width: 100%;
  bottom: 0;
  left: 0;
  text-align: center;
  a {
    color: #999;
    font-size: 12px;
    &:hover {
      color: #007fff;
    }
  }
}
</style>
