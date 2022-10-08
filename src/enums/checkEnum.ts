/**每项item字段类型 */
export interface ItemFieldType {
  label: string;
  value: string;
}

/**将hashmap转化为数组类型 */
function hashToArray(hashObj): ItemFieldType[] {
  return Object.keys(hashObj).map(item => {
    return {
      label: hashObj[item],
      value: String(item),
    };
  });
}
/**
 * @description: 请求响应结果枚举
 */
export enum TabsTypeEnum {
  BASIC_INFO = "BASIC_INFO",
  EMP_INFO = "EMP_INFO",
  REL_MANAGE = "REL_MANAGE",
  SALARY_ACCOUNT = "SALARY_ACCOUNT",
  PUBLICITY_ANNOUNCE = "PUBLICITY_ANNOUNCE",
  CHECK_CONTENT = "CHECK_CONTENT",
}
/**巡检类型 */
export const CheckTabsTypeObject = {
  BASIC_INFO: "基础资料",
  EMP_INFO: "用工资料",
  REL_MANAGE: "实名制管理",
  SALARY_ACCOUNT: "农民工工资专户",
  PUBLICITY_ANNOUNCE: "维权公示",
  CHECK_CONTENT: "抽查内容",
};
/**巡检类型list {[label]: [value]} */
export const CheckTabsTypeList = hashToArray(CheckTabsTypeObject);
