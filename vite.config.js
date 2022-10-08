import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueSetupExtend(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
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
