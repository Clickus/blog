import { Component } from "vue";
import type { App } from "vue";

interface FileType {
  [key: string]: Component;
}
interface componentItem {
  name: string;
  sfc: Component;
}
/*
 * 从components文件夹导入所有的组件
 * “组件名name没有写”，将自动组件名注册
 */

/**install unplugin-vue-define-options 或者安装插件 */
const componentsFiles: Record<string, FileType> = import.meta.globEager("/src/components/*/*.vue");
const componentList: componentItem[] = [];
const files: Record<string, FileType> = Object.assign({}, componentsFiles);
Object.keys(files).forEach((c: string) => {
  const component = files[c]?.default;
  console.log(component);
  
  component?.name && componentList.push({ name: (component.name as string), sfc: component });
});
export function registerGlobComp(app: App) {
  console.log(componentList);
  
  componentList.forEach(comp => {
    app.component(comp.name, comp.sfc);
  });
}
