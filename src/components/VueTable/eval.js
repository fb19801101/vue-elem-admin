import Vue from "vue";

// Flattened array
export default function treeToArray(data) {
  let tmp = [];
  data.forEach(item => {
    tmp.push(item);
    if (item.children && item.children.length > 0) {
      const res = treeToArray(item.children);
      tmp = tmp.concat(res);
    }
    Vue.delete(item, "children");
  });
  return tmp;
}

let id = 1;
export function addAttrs(
  data,
  { parent = null, level = 0, expand = false, show = true, select = false } = {}
) {
  data.forEach(item => {
    Vue.set(item, "_id", id++);
    Vue.set(item, "_level", level);
    Vue.set(item, "_expand", expand);
    Vue.set(item, "_parent", parent);
    Vue.set(item, "_show", show);
    Vue.set(item, "_select", select);
    Vue.set(item, "_icon", false);
    if (item.children && item.children.length > 0) {
      Vue.set(item, "_icon", true);
      addAttrs(item.children, {
        parent: item,
        level: level + 1,
        expand: expand,
        show: show,
        select: select
      });
    }
  });
}
