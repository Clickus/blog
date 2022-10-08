import { h, computed } from "vue";
import { RouteComponent, useRoute } from "vue-router";
export default function routerReplaceSelf(component) {
  return {
    name: "routerReplaceSelf",
    render() {
      const route = useRoute();
      const showChild = computed(() => {
        return route.matched[route.matched.length - 1].meta.nested;
      });
      const childComponent = route.matched[route.matched.length - 1]?.components?.default as RouteComponent;
      return showChild.value ? h(childComponent) : h(component);
    }
  };
}
