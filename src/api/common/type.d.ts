/**获取项目列表 返回结果 */
export interface ListProjectsResult {
  /**
   * 项目ID
   */
  projectId: number;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 建设单位
   */
  buildEntName: string;
  /**
   * 施工单位
   */
  constructionEntName: string;
}
