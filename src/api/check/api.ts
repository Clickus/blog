import { BasicData } from "/@/api/model/baseModel";
import { GetResult, ListResult, SubmitParams } from "./type.d";
import { defHttp } from "/@/axios";
export * from "./type.d";
enum Api {
  list = "/patrol/patrolOrder/list", // 查询巡检列表
  info = "/patrol/patrolOrder/get", // 查询巡检详情
  submit = "/patrol/patrolOrder/submit", // 提交
}
/**
 * @desc 查询巡检列表
 * @param params
 */
export function list(params) {
  return defHttp.get<ListResult>({ url: Api.list, params });
}
/**
 * @desc 查询巡检详情
 * @param params
 */
export function info(params) {
  return defHttp.get<GetResult>({ url: Api.info, params });
}
/**
 * @desc 提交
 * @param params
 */
export function submit(params: SubmitParams) {
  return defHttp.post<BasicData<any>>({ url: Api.submit, params }, { isTransformResponse: false });
}
