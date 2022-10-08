/**登录 请求参数 */
export interface LoginParams {
  phone: string; // 手机号
  code: string; // 验证码
}
/**登录 返回结果 */
export interface LoginResult {
  token: string; // 令牌
  hasPassword: boolean; // 用户是否设置了密码
}
/**用户信息 返回结果 */
export interface InfoResult {
  /**
   * 级别  super_admin 超管  admin子管
   */
  level: string;
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 手机号
   */
  phoneNumber: string;
  /**
   * 拥有的权限
   */
  permissions?: string[];
}
/**发送验证码 请求参数 */
export interface VerificationCodeResult {
  /**
   * 手机号
   */
  phone: string;
  /**
   * 短信类型 1登录  2重置密码
   */
  businessType: number;
}
