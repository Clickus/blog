import { loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  /**加载运行时相应配置文件 */
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const { VITE_PORT } = env || {};
  console.log(command, root, env, "command---");
  return {
    /**启动服务 */
    server: {
      // host: true,
      port: (VITE_PORT as unknown as number) || 5555,
      // proxy: createProxy(VITE_PROXY as unknown as any[]),
    },
    plugins: [
      vue(),
      vueSetupExtend(),
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
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
  };
};
