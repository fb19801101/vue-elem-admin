/** When your routing table is too long, you can split it into small modules**/

const chartsRouter = {
  path: "/learning/charts",
  component: () => import("@/views/charts/index"),
  redirect: "noredirect",
  name: "Charts",
  meta: {
    title: "charts",
    icon: "chart"
  },
  children: [
    {
      path: "keyboard",
      component: () => import("@/views/charts/keyboard"),
      name: "KeyboardChart",
      meta: { title: "keyboardChart", noCache: true }
    },
    {
      path: "line",
      component: () => import("@/views/charts/line"),
      name: "LineChart",
      meta: { title: "lineChart", noCache: true }
    },
    {
      path: "mixchart",
      component: () => import("@/views/charts/mixChart"),
      name: "MixChart",
      meta: { title: "mixChart", noCache: true }
    }
  ]
};

export default chartsRouter;
