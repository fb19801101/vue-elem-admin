import Vue from "vue";
import Router from "vue-router";

//在引入router之前重写push方法
//每次push都去主动写一个空的回调（或者显式指定onComplete和onAbort回调函数）。
//this.$router.push({ path: this.redirect || "/" }, () => {});
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

/* Router Modules */
import componentsRouter from "./modules/components";
import chartsRouter from "./modules/charts";
import nestedRouter from "./modules/nested";
import tableRouter from "./modules/table";
import treeTableRouter from "./modules/tree-table";
import menuRouter from "./modules/menu";

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/authredirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "dashboard",
          noCache: true,
          affix: true
        }
      }
    ]
  },

  {
    path: "/documentation",
    component: Layout,
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/documentation/index"),
        name: "Documentation",
        meta: { title: "documentation", icon: "documentation", affix: true }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/guide/index"),
        name: "Guide",
        meta: { title: "guide", icon: "guide", noCache: true }
      }
    ]
  }
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: "/users",
    component: Layout,
    meta: {
      roles: ["admin", "editor", "normal"] // you can set roles in root nav }
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/users/index"),
        name: "Users",
        meta: { title: "users", icon: "users" }
      }
    ]
  },
  {
    path: "/role",
    component: Layout,
    meta: {
      roles: ["admin", "editor"] // you can set roles in root nav }
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/role/index"),
        name: "Role",
        meta: { title: "role", icon: "role" }
      }
    ]
  },
  {
    path: "/disclose",
    component: Layout,
    meta: {
      roles: ["admin", "editor", "normal"] // you can set roles in root nav }
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/disclose/index"),
        name: "Disclose",
        meta: { title: "disclose", icon: "disclose" }
      }
    ]
  },

  {
    path: "/measure",
    component: Layout,
    meta: {
      roles: ["admin"] // you can set roles in root nav }
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/measure"),
        name: "Measure",
        meta: { title: "measure", icon: "measure" }
      }
    ]
  },

  {
    path: "/learning",
    component: Layout,
    redirect: "/learning/index",
    alwaysShow: true, // will always show the root menu
    meta: {
      title: "learning",
      icon: "learning",
      roles: ["admin", "editor"]
    },
    children: [
      {
        path: "/learning/permission",
        component: () => import("@/views/permission/index"),
        redirect: "/permission/index",
        alwaysShow: true, // will always show the root menu
        meta: {
          title: "permission",
          icon: "lock",
          roles: ["admin", "editor"] // you can set roles in root nav
        },
        children: [
          {
            path: "page",
            component: () => import("@/views/permission/page"),
            name: "PagePermission",
            meta: {
              title: "pagePermission",
              roles: ["admin"] // or you can only set roles in sub nav
            }
          },
          {
            path: "directive",
            component: () => import("@/views/permission/directive"),
            name: "DirectivePermission",
            meta: {
              title: "directivePermission"
              // if do not set roles, means: this page does not require permission
            }
          }
        ]
      },

      {
        path: "/learning/icon",
        component: () => import("@/views/svg-icons/index"),
        children: [
          {
            path: "index",
            name: "Icons",
            meta: { title: "icons", icon: "icon", noCache: true }
          }
        ]
      },

      /** When your routing table is too long, you can split it into small modules**/
      componentsRouter,
      chartsRouter,
      nestedRouter,
      tableRouter,
      treeTableRouter,

      {
        path: "/learning/example",
        component: () => import("@/views/example/index"),
        redirect: "/example/list",
        name: "Example",
        meta: {
          title: "example",
          icon: "example"
        },
        children: [
          {
            path: "create",
            component: () => import("@/views/example/create"),
            name: "CreateArticle",
            meta: { title: "createArticle", icon: "edit" }
          },
          {
            path: "edit/:id(\\d+)",
            component: () => import("@/views/example/edit"),
            name: "EditArticle",
            meta: { title: "editArticle", noCache: true },
            hidden: true
          },
          {
            path: "list",
            component: () => import("@/views/example/list"),
            name: "ArticleList",
            meta: { title: "articleList", icon: "list" }
          }
        ]
      },

      {
        path: "/learning/tab",
        component: () => import("@/views/tab/index"),
        children: [
          {
            path: "index",
            name: "Tab",
            meta: { title: "tab", icon: "tab" }
          }
        ]
      },

      {
        path: "/learning/error",
        component: () => import("@/views/errorPage/index"),
        redirect: "noredirect",
        name: "ErrorPages",
        meta: {
          title: "errorPages",
          icon: "404"
        },
        children: [
          {
            path: "401",
            component: () => import("@/views/errorPage/401"),
            name: "Page401",
            meta: { title: "page401", noCache: true }
          },
          {
            path: "404",
            component: () => import("@/views/errorPage/404"),
            name: "Page404",
            meta: { title: "page404", noCache: true }
          }
        ]
      },

      {
        path: "/learning/error-log",
        component: () => import("@/views/errorLog/index"),
        redirect: "noredirect",
        children: [
          {
            path: "log",
            name: "ErrorLog",
            meta: { title: "errorLog", icon: "bug" }
          }
        ]
      },

      {
        path: "/learning/excel",
        component: () => import("@/views/excel/index"),
        redirect: "/excel/export-excel",
        name: "Excel",
        meta: {
          title: "excel",
          icon: "excel"
        },
        children: [
          {
            path: "export-excel",
            component: () => import("@/views/excel/exportExcel"),
            name: "ExportExcel",
            meta: { title: "exportExcel" }
          },
          {
            path: "export-selected-excel",
            component: () => import("@/views/excel/selectExcel"),
            name: "SelectExcel",
            meta: { title: "selectExcel" }
          },
          {
            path: "upload-excel",
            component: () => import("@/views/excel/uploadExcel"),
            name: "UploadExcel",
            meta: { title: "uploadExcel" }
          }
        ]
      },

      {
        path: "/learning/zip",
        component: () => import("@/views/zip/index"),
        redirect: "/zip/download",
        alwaysShow: true,
        meta: { title: "zip", icon: "zip" },
        children: [
          {
            path: "download",
            name: "ExportZip",
            meta: { title: "exportZip" }
          }
        ]
      },

      {
        path: "/learning/pdf",
        component: () => import("@/views/pdf/index"),
        redirect: "/pdf/index",
        children: [
          {
            path: "index",
            name: "PDF",
            meta: { title: "pdf", icon: "pdf" }
          }
        ]
      },

      {
        path: "/learning/pdf/download",
        component: () => import("@/views/pdf/download"),
        hidden: true
      },

      {
        path: "/learning/theme",
        component: () => import("@/views/theme/index"),
        redirect: "noredirect",
        children: [
          {
            path: "index",
            name: "Theme",
            meta: { title: "theme", icon: "theme" }
          }
        ]
      },

      {
        path: "/learning/clipboard",
        component: () => import("@/views/clipboard/index"),
        redirect: "noredirect",
        children: [
          {
            path: "index",
            name: "ClipboardDemo",
            meta: { title: "clipboardDemo", icon: "clipboard" }
          }
        ]
      },

      {
        path: "/learning/external-link",
        children: [
          {
            path: "https://github.com/PanJiaChen/vue-element-admin",
            meta: { title: "externalLink", icon: "link" }
          }
        ]
      }
    ]
  },

  {
    path: "/i18n",
    component: Layout,
    meta: {
      roles: ["admin"] // you can set roles in root nav }
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/i18n-demo/index"),
        name: "I18n",
        meta: { title: "i18n", icon: "international" }
      }
    ]
  },

  menuRouter.companyRouter,
  menuRouter.projectRouter,

  { path: "*", redirect: "/404", hidden: true }
];
