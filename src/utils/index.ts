import type { RouteLocationNormalized, RouteRecordNormalized } from "vue-router";
import { unref } from "vue";
import { isObject } from "/@/utils/is";
export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * 将对象作为参数添加到 URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = "";
  for (const key in obj) {
    parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, "?") + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(url: string, opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }) {
  const { target = "__blank", noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noreferrer=yes");

  window.open(url, target, feature.join(","));
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props as any).map(key => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map(item => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

/**
 * 添加千位分隔符
 */
export function addCommas(x: any): string {
  if (typeof x === "string" && x.indexOf(",") > -1) {
    return x;
  }
  if (isNaN(x)) {
    return "**";
  }
  x = (x + "").split(".");
  return x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (x.length > 1 ? "." + x[1] : "");
}

/**
 * @description 乘法函数 防止精度丢失
 * @param { number } num1
 * @param { number } num2
 */
export function mcl(num1: number | string, num2: string | number) {
  let m = 0,
    // eslint-disable-next-line prefer-const
    s1 = num1.toString(),
    // eslint-disable-next-line prefer-const
    s2 = num2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / Math.pow(10, m);
}

/**
 * @description 除法  防止精度丢失
 * @param { number } num1
 * @param { number } num2
 */
export function division(num1: number | string, num2: string | number) {
  let t1: number | string, t2: number | string, r1: number | string, r2: number | string;
  try {
    t1 = num1.toString().split(".")[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = num2.toString().split(".")[1].length;
  } catch (e) {
    t2 = 0;
  }
  // eslint-disable-next-line prefer-const
  r1 = Number(num1.toString().replace(".", ""));
  // eslint-disable-next-line prefer-const
  r2 = Number(num2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * @description 加法  防止精度丢失
 * @param { number } arg1
 * @param { number } arg2
 */
export function add(arg1: number, arg2: number) {
  let r1: number | string, r2: number | string, m: number | string;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  // eslint-disable-next-line prefer-const
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

/**
 * @description 减法 防止精度丢失
 * @param { number } arg1
 * @param { number } arg2
 */
export function sub(arg1: number, arg2: number) {
  let r1: number | string, r2: number | string;
  let m: number | string = 0;
  let n: number | string = 0;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

/**
 * @desc 计算比例 保留两位小数
 * @param num 被除数
 * @param num1 除数
 */
export function calculateProportion(num: number, num1: number): string {
  if (!num && !num1) return "--";
  if (!num || !num1) return "0.00%";
  const per = Number((division(num, num1) * 100).toString().match(/^\d+(?:\.\d{0,2})?/));
  return `${per}%`;
}

/**
 * @desc 计算比例 保留1位小数
 * @param num 被除数
 * @param num1 除数
 */
export function calculateProportionOne(num: number, num1: number): string {
  if (!num || !num1) return "0.00%";
  const per = toDecimal(division(num, num1) * 100, 1);
  return `${per}%`;
}

/**
 * 保留指定位小数，不进行四舍五入
 */
export const toDecimal = (val: any, digits = 2): string | boolean => {
  const f = parseFloat(val);
  if (isNaN(f)) {
    return false;
  }
  let s = f.toString();
  let rs = s.indexOf(".");
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + digits) {
    s += "0";
  }
  const index = s.indexOf(".");
  s = s.substring(0, index + digits + 1);
  return s;
};

/**
 * 金额转化
 * 用于前端显示金额/100（大额 / 10000）保留两位小数（多余位数舍去，不进行四舍五入）
 * @param {*} money
 * @param {boolean} [isLargeAmount=true] 是否是大额，大额 / 1000000
 * @param {boolean} [valueAddCommas=true]
 * @return {*}  {string}
 */
export const moneyFormat = (money: any, isLargeAmount = true, valueAddCommas = false): string => {
  if (`${money}`.includes("*")) {
    return money;
  } else if (!parseInt(money)) {
    return "0.00";
  } else {
    const value = (money / (isLargeAmount ? 1000000 : 100)).toFixed(2);
    return valueAddCommas ? addCommas(value) : value;
  }
};

/**
 * 小数转为百分比，保留两位小数
 */
export const percentFormat = (value: number | string) => {
  return (+value * 100).toFixed(2);
};

//解决百分比和不是100%的问题
export const getPercentValue = (arrList: any[], index: number, precision?: number) => {
  /**不存在直接放回0 */
  if (!arrList[index]) return 0;
  /**为传递精度默认1位 */
  if (!precision) precision = 1;
  /**计算总和 reduce*/
  const sum = arrList.reduce((acc, val) => {
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  /**综合为0 返回0 */
  if (sum === 0) return 0;
  /**精度 */
  const digits = Math.pow(10, precision);
  const votesPerQuota = arrList.map(val => {
    return ((isNaN(val) ? 0 : val) / sum) * digits * 100;
  });
  const targetSeats = digits * 100;
  const seats = votesPerQuota.map(votes => {
    return Math.floor(votes);
  });
  let currentSum = seats.reduce((acc, val) => {
    return acc + val;
  }, 0);
  const remainder = votesPerQuota.map(function (votes, index) {
    return votes - seats[index];
  });
  while (currentSum < targetSeats) {
    let max = Number.NEGATIVE_INFINITY;
    let maxId = -1;
    for (let i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i];
        maxId = i;
      }
    }
    ++seats[maxId];
    remainder[maxId] = 0;
    ++currentSum;
  }
  return seats[index] / digits;
};

/**
 * @desc 字符串中某些文字高亮
 * @param val 原字符串
 * @param keyword 需要高亮的文字
 */
export function brightenKeyword(val: string, keyword = "") {
  val = val + "";
  if (val.indexOf(keyword) !== -1 && keyword !== "") {
    return val.replace(keyword, '<font color="#0155E5">' + keyword + "</font>");
  } else {
    return val;
  }
}
