import { ListProjectsResult } from "./type.d";
import { defHttp } from "/@/axios";
export * from "./type.d";
enum Api {
  listProjects = "/patrol/common/listProjects", // 获取项目列表
}
/**
 * @desc 获取项目列表
 * @param params
 */
export function listProjects(params) {
  return defHttp.get<ListProjectsResult>({ url: Api.listProjects, params });
}
