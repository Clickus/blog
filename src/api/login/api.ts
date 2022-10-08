import { BasicData } from "/@/api/model/baseModel";
import { LoginParams, InfoResult, LoginResult, VerificationCodeResult } from "./type.d";
import { defHttp } from "/@/axios";
export * from "./type.d";
enum Api {
  login = "/patrol/login", // 登录
  info = "/patrol/info", // 用户信息
  verificationCode = "/patrol/sms/verificationCode", // 发送验证码
}
/**
 * @desc 登录
 * @param params
 */
export function login(params: LoginParams) {
  return defHttp.post<BasicData<LoginResult>>({ url: Api.login, params }, { isTransformResponse: false, withToken: false });
}
/**
 * @desc 获取用户信息
 * @param params
 */
export function info() {
  return defHttp.get<BasicData<InfoResult>>({ url: Api.info }, { isTransformResponse: false });
}
/**
 * @desc 发送验证码
 * @param params
 */
export function verificationCode(params: VerificationCodeResult) {
  return defHttp.post<BasicData<any>>({ url: Api.verificationCode, params }, { isTransformResponse: false, withToken: false });
}
