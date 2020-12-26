/** When your routing table is too long, you can split it into small modules**/
import Layout from "@views/layout/Layout";
import Menu1 from "@views/menu/menu-1/index";
import Menu2 from "@views/menu/menu-1/menu-2/index";
import Menu3 from "@views/menu/menu-1/menu-2/menu-3/index";
import Menu4 from "@views/menu/menu-1/menu-2/menu-3/menu-4/index";
import Menu5 from "@views/menu/menu-1/menu-2/menu-3/menu-4/menu-5/index";

const MenuComponents = [Menu1, Menu2, Menu3, Menu4, Menu5];
function getSubMenuRouter(redirect, menu) {
  let level = 0;
  let _level = menu.name.indexOf("-");
  while (_level !== -1) {
    level++;
    _level = menu.name.indexOf("-", _level + 1);
  }
  let index = redirect.lastIndexOf("/");
  let _redirect = redirect.substring(0, index + 1);
  if (menu.children.length > 0) {
    return {
      path: menu.name,
      component: MenuComponents[level - 1],
      name: menu.name,
      redirect: _redirect + menu.name + "/" + menu.children[0].name,
      meta: { title: menu.title },
      children: menu.children
    };
  } else {
    return {
      path: menu.name,
      component: MenuComponents[level - 1],
      name: menu.name,
      meta: { title: menu.title },
      children: []
    };
  }
}
function getMenuRouter(menu) {
  if (menu.children != null) {
    for (let i = 0; i < menu.children.length; i++) {
      menu.children[i] = getSubMenuRouter(menu.redirect, menu.children[i]);
      if (menu.children[i].children != null) {
        getMenuRouter(menu.children[i]);
      }
    }
  }
}

const menuData = require("./menu.json");
const companyRouter = {
  path: "/" + menuData.company.name,
  component: Layout,
  name: menuData.company.name,
  redirect:
    "/" + menuData.company.name + "/" + menuData.company.children[0].name,
  meta: {
    title: menuData.company.title,
    icon: "component",
    roles: ["admin", "test"]
  },
  children: menuData.company.children
};
const projectRouter = {
  path: "/" + menuData.project.name,
  component: Layout,
  name: menuData.project.name,
  redirect:
    "/" + menuData.project.name + "/" + menuData.project.children[0].name,
  meta: {
    title: menuData.project.title,
    icon: "component",
    roles: ["admin", "test"]
  },
  children: menuData.project.children
};
getMenuRouter(companyRouter);
getMenuRouter(projectRouter);

// var FileSaver = require("file-saver");
// var blob = new Blob([JSON.stringify(companyRouter)], {
//   type: "text/plain;charset=utf-8"
// });
// FileSaver.saveAs(blob, "menuRouter.txt");

export default { companyRouter, projectRouter };
