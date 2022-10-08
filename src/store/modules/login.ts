import { InfoResult } from "/@/api/login/type.d";
import { defineStore } from "pinia";
interface LoginState {
  token: string;
  userInfo: InfoResult | undefined;
}
/**用户登录 验证码 一级 用户信息 */
export const useLoginStore = defineStore("login", {
  state: (): LoginState => {
    return {
      token: "",
      userInfo: undefined,
    };
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, key: "login" }],
  },
  getters: {},
  actions: {
    /**设置token */
    setToken(values) {
      this.token = values;
    },
    /**设置用户信息 */
    setUserInfo(values) {
      this.userInfo = values;
    },
  },
});
