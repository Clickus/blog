import type { AxiosRequestConfig, Canceler } from "axios";
import axios from "axios";
import { isFunction } from "/@/utils/is";

// Used to store the identification and cancellation function of each request
let pendingMap = new Map<string, Canceler>();
/**
 * @description 获取请求的URL及标识
 * @param config 请求包含的配置
 */
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join("&");

export class AxiosCanceler {
  /**
   * @description 将请求添加到pending中
   * @param config 请求配置
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!pendingMap.has(url)) {
          // If there is no current request in pending, add it
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description 移除所有pending
   */
  removeAllPending() {
    pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }
  /**
   * @description 移除请求 如果pending中存在当前请求标识，需要取消当前请求，并将它移除
   * @param config 请求相关配置
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // If there is a current request identifier in pending,
      // the current request needs to be cancelled and removed
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description 重置pending
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
