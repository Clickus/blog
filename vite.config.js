import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import vueSetupExtend from "vite-plugin-vue-setup-extend";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  /**别名 */
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: path.resolve(__dirname, "src") + "/",
      },
    ],
  },
      /**css相关配置 */
      css: {
        preprocessorOptions: {
          less: {
            additionalData: '@import "/@/css/var.less";',
            javascriptEnabled: true,
          },
        },
      },
})
