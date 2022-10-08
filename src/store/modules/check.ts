import { SubmitParams } from "/@/api/check/type.d";
import { ListProjectsResult } from "/@/api/common/type.d";
import { defineStore } from "pinia";

import { defaultInfo } from "./check-json";
interface CheckState {
  selectProject: ListProjectsResult | undefined;
  submitInfo: SubmitParams;
  info: any;
  remark: string | undefined;
}
export const useCheckStore = defineStore("check", {
  state: (): CheckState => {
    return {
      selectProject: undefined,
      submitInfo: {
        targetId: undefined,
        result: undefined,
        remark: undefined,
        patrolItems: [],
      },
      info: { ...defaultInfo },
      remark: undefined,
    };
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, key: "check" }],
  },
  getters: {},
  actions: {
    /**设置选中项目信息 */
    setProjectInfo(values) {
      this.selectProject = values;
    },
    /**设置已填写的信息 */
    setFieldsInfo(values) {
      this.info = JSON.parse(JSON.stringify(values || defaultInfo));
    },
    /**设置备注 */
    setRemark(values) {
      this.remark = values;
    },
  },
});
