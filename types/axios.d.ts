export type ErrorMessageMode = "none" | "modal" | "message" | undefined;

export interface RequestOptions {
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式请求参数时间
  formatDate?: boolean;
  // 是否处理请求结果
  isTransformResponse?: boolean;
  // 是否返回原生响应头
  // 例如：当需要获取响应头时使用该属性
  isReturnNativeResponse?: boolean;
  // 是否加入前缀
  joinPrefix?: boolean;
  // 接口地址，留空使用默认apiUrl
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // 错误信息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 是否添加时间戳
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // 是否在header中发送token
  withToken?: boolean;
  // 是否使用mock数据 使用yapi数据
  isMock?: boolean;
  // 忽略接口前缀
  ingoreApiUrl?: boolean;
}

export interface Result<T = any> {
  code: number;
  type?: "success" | "error" | "warning";
  msg: string;
  data?: T;
}
