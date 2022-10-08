/**提交巡检 请求参数 */
export interface SubmitParams {
  /**
   * 巡检对象ID
   */
  targetId: number | undefined;
  /**
   * 巡检结果 1较好 2中等 3较差
   */
  result: string | undefined;
  /**
   * 备注
   */
  remark: string | undefined;
  /**
   * 巡检事项
   */
  patrolItems?: {
    /**
     * 事项编号
     */
    itemNo: string;
    /**
     * 事项类型 JUDGE判断 TEXT_BOX文本框 REMARK备注
     */
    itemType: string;
    /**
     * 答案
     */
    answer?: string;
  }[];
}

/**查询巡检详情 返回结果 */
export interface GetResult {
  /**
   * 巡检订单信息
   */
  patrolOrder: {
    /**
     * 备注
     */
    remark: string | undefined;
    /**
     * 巡检单号
     */
    orderNo?: string;
    /**
     * 巡检主体类型 1建管处 2担保公司
     */
    bodyOfficeType?: string;
    /**
     * 巡检结果
     */
    result?: string;
    /**
     * 巡检主体人员姓名
     */
    bodyAcctName?: string;
    /**
     * 巡检对象姓名
     */
    targetName?: string;
    /**
     * 巡检时间
     */
    patrolTime?: string;
    /**
     * 建设单位
     */
    buildEntName?: string;
    /**
     * 施工单位
     */
    constructionEntName?: string;
  };
  /**
   * 巡检事项，key为事项编号
   */
  patrolItem?: {
    key?: {
      /**
       * 事项编号
       */
      itemNo?: string;
      /**
       * 题型
       */
      itemType?: string;
      /**
       * 回答，不同类型回答不同
       * 1. 判断 1是 0否
       * 2. 文本框
       * 3. 图文 json类型
       */
      answer?: string;
    };
  };
}

/**查询记录列表 返回结果 */
export interface ListResult {
  totalCount?: number;
  data?: {
    /**
     * 巡检单号
     */
    orderNo?: string;
    /**
     * 巡检事项类型 1农民工工资巡检
     */
    itemType?: string;
    /**
     * 巡检对象名称
     */
    targetName?: string;
    /**
     * 巡检类型 1主动巡检
     */
    type?: string;
    /**
     * 巡检主体类型 1建管处 2担保公司
     */
    bodyOfficeType?: string;
    /**
     * 巡检人员姓名
     */
    bodyAcctName?: string;
    /**
     * 巡检时间
     */
    patrolTime?: string;
    /**
     * 巡检结果 1较好,无需整改 2中等,需轻微整改 3较差,需大力整改
     */
    result?: string;
  }[];
}
