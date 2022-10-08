import dayjs from "dayjs";
export const YMDFormat = val => {
  if (!val) return "--";
  if (val === "****") return val;
  if (typeof val === "number" && val < 0) return "**";
  return dayjs(val).format("YYYY-MM-DD");
};
export const YMFormat = val => {
  if (!val) return "--";
  if (val === "****") return val;
  return dayjs(val).format("YYYY-MM");
};
export const YMDHMFormat = val => {
  if (!val) return "--";
  if (val === "****") return val;
  return dayjs(val).format("YYYY-MM-DD HH:mm");
};
export const YMDHMSFormat = val => {
  if (!val) return "--";
  if (val === "****") return val;
  return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
};
export const dateFormat = (val, format = "YYYY.MM.DD HH:mm") => {
  if (!val || isNaN(parseFloat(val))) return "--";
  if (val === "****") return val;
  return dayjs(String(val).length === 19 ? val : parseFloat(val)).format(format);
};

/**计算两个日期相差多少天 */
export const diffDay = (start, end) => {
  if (!start || !end) return 0;
  /**计算相差多少天 放开float 不然计算偏差大*/
  return parseFloat(dayjs(end).diff(dayjs(start), "day", true)).toFixed(1);
};
