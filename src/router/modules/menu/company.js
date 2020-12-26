import Layout from "@views/layout/Layout";
import Menu1 from "@views/company/menu-1/index";
import Menu2 from "@views/company/menu-1/menu-2/index";
import Menu3 from "@views/company/menu-1/menu-2/menu-3/index";
import Menu4 from "@views/company/menu-1/menu-2/menu-3/menu-4/index";

const menuRouter = {
  path: "/company",
  component: Layout,
  name: "company",
  redirect: "/company/menu-1",
  meta: {
    title: "公司层级菜单",
    icon: "component"
  },
  children: [
    {
      path: "menu-1",
      component: Menu1,
      name: "menu-1",
      redirect: "/company/menu-1/menu-1-1",
      meta: {
        title: "项目初始化"
      },
      children: [
        {
          path: "menu-1-1",
          component: Menu2,
          name: "menu-1-1",
          redirect: "/company/menu-1/menu-1-1/menu-1-1-1",
          meta: {
            title: "基础架构"
          },
          children: [
            {
              path: "menu-1-1-1",
              component: Menu3,
              name: "menu-1-1-1",
              redirect: "/company/menu-1/menu-1-1/menu-1-1-1/menu-1-1-1-1",
              meta: {
                title: "WBS"
              },
              children: [
                {
                  path: "menu-1-1-1-1",
                  component: Menu4,
                  name: "menu-1-1-1-1",
                  meta: {
                    title: "标准库维护"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-1-1-2",
              component: Menu3,
              name: "menu-1-1-2",
              redirect: "/company/menu-1/menu-1-1/menu-1-1-2/menu-1-1-2-1",
              meta: {
                title: "OBS"
              },
              children: [
                {
                  path: "menu-1-1-2-1",
                  component: Menu4,
                  name: "menu-1-1-2-1",
                  meta: {
                    title: "作业队伍划分"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-1-1-3",
              component: Menu3,
              name: "menu-1-1-3",
              redirect: "/company/menu-1/menu-1-1/menu-1-1-3/menu-1-1-3-1",
              meta: {
                title: "TBS"
              },
              children: [
                {
                  path: "menu-1-1-3-1",
                  component: Menu4,
                  name: "menu-1-1-3-1",
                  meta: {
                    title: "管理团队划分"
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          path: "menu-1-2",
          component: Menu2,
          name: "menu-1-2",
          redirect: "/company/menu-1/menu-1-2/menu-1-2-1",
          meta: {
            title: "基本信息"
          },
          children: [
            {
              path: "menu-1-2-1",
              component: Menu3,
              name: "menu-1-2-1",
              meta: {
                title: "工程概况"
              },
              children: []
            },
            {
              path: "menu-1-2-2",
              component: Menu3,
              name: "menu-1-2-2",
              meta: {
                title: "工期产值"
              },
              children: []
            },
            {
              path: "menu-1-2-3",
              component: Menu3,
              name: "menu-1-2-3",
              meta: {
                title: "项目部属性"
              },
              children: []
            }
          ]
        }
      ]
    },
    {
      path: "menu-2",
      component: Menu1,
      name: "menu-2",
      redirect: "/company/menu-2/menu-2-1",
      meta: {
        title: "拉动生产"
      },
      children: [
        {
          path: "menu-2-1",
          component: Menu2,
          name: "menu-2-1",
          redirect: "/company/menu-2/menu-2-1/menu-2-1-1",
          meta: {
            title: "事前计划"
          },
          children: [
            {
              path: "menu-2-1-1",
              component: Menu3,
              name: "menu-2-1-1",
              meta: {
                title: "施工计划"
              },
              children: []
            }
          ]
        },
        {
          path: "menu-2-2",
          component: Menu2,
          name: "menu-2-2",
          redirect: "/company/menu-2/menu-2-2/menu-2-2-1",
          meta: {
            title: "事中控制"
          },
          children: [
            {
              path: "menu-2-2-1",
              component: Menu3,
              name: "menu-2-2-1",
              meta: {
                title: "进度预警"
              },
              children: []
            }
          ]
        },
        {
          path: "menu-2-3",
          component: Menu2,
          name: "menu-2-3",
          redirect: "/company/menu-2/menu-2-3/menu-2-3-1",
          meta: {
            title: "工作安排"
          },
          children: [
            {
              path: "menu-2-3-1",
              component: Menu3,
              name: "menu-2-3-1",
              meta: {
                title: "初级版本"
              },
              children: []
            },
            {
              path: "menu-2-3-2",
              component: Menu3,
              name: "menu-2-3-2",
              meta: {
                title: "中级版本"
              },
              children: []
            },
            {
              path: "menu-2-3-3",
              component: Menu3,
              name: "menu-2-3-3",
              meta: {
                title: "高级版本"
              },
              children: []
            }
          ]
        },
        {
          path: "menu-2-4",
          component: Menu2,
          name: "menu-2-4",
          redirect: "/company/menu-2/menu-2-4/menu-2-4-1",
          meta: {
            title: "钢筋加工场"
          },
          children: [
            {
              path: "menu-2-4-1",
              component: Menu3,
              name: "menu-2-4-1",
              meta: {
                title: "构件库维护"
              },
              children: []
            }
          ]
        },
        {
          path: "menu-2-5",
          component: Menu2,
          name: "menu-2-5",
          redirect: "/company/menu-2/menu-2-5/menu-2-5-1",
          meta: {
            title: "经济分析"
          },
          children: [
            {
              path: "menu-2-5-1",
              component: Menu3,
              name: "menu-2-5-1",
              meta: {
                title: "工序挂载清单"
              },
              children: []
            }
          ]
        }
      ]
    },
    {
      path: "menu-3",
      component: Menu1,
      name: "menu-3",
      redirect: "/company/menu-3/menu-3-1",
      meta: {
        title: "团队协作"
      },
      children: [
        {
          path: "menu-3-1",
          component: Menu2,
          name: "menu-3-1",
          redirect: "/company/menu-3/menu-3-1/menu-3-1-1",
          meta: {
            title: "工程管理部"
          },
          children: [
            {
              path: "menu-3-1-1",
              component: Menu3,
              name: "menu-3-1-1",
              redirect: "/company/menu-3/menu-3-1/menu-3-1-1/menu-3-1-1-1",
              meta: {
                title: "专项方案"
              },
              children: [
                {
                  path: "menu-3-1-1-1",
                  component: Menu4,
                  name: "menu-3-1-1-1",
                  meta: {
                    title: "方案管理"
                  },
                  children: []
                },
                {
                  path: "menu-3-1-1-2",
                  component: Menu4,
                  name: "menu-3-1-1-2",
                  meta: {
                    title: "方案审批"
                  },
                  children: []
                },
                {
                  path: "menu-3-1-1-3",
                  component: Menu4,
                  name: "menu-3-1-1-3",
                  meta: {
                    title: "方案执行"
                  },
                  children: []
                },
                {
                  path: "menu-3-1-1-4",
                  component: Menu4,
                  name: "menu-3-1-1-4",
                  meta: {
                    title: "专家库"
                  },
                  children: []
                },
                {
                  path: "menu-3-1-1-5",
                  component: Menu4,
                  name: "menu-3-1-1-5",
                  meta: {
                    title: "方案类型维护"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-1-2",
              component: Menu3,
              name: "menu-3-1-2",
              redirect: "/company/menu-3/menu-3-1/menu-3-1-2/menu-3-1-2-1",
              meta: {
                title: "技术交底"
              },
              children: [
                {
                  path: "menu-3-1-2-1",
                  component: Menu4,
                  name: "menu-3-1-2-1",
                  meta: {
                    title: "交底看板"
                  },
                  children: []
                },
                {
                  path: "menu-3-1-2-2",
                  component: Menu4,
                  name: "menu-3-1-2-2",
                  meta: {
                    title: "交底共享库"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-1-3",
              component: Menu3,
              name: "menu-3-1-3",
              redirect: "/company/menu-3/menu-3-1/menu-3-1-3/menu-3-1-3-1",
              meta: {
                title: "工程算量"
              },
              children: [
                {
                  path: "menu-3-1-3-1",
                  component: Menu4,
                  name: "menu-3-1-3-1",
                  meta: {
                    title: "算量看板"
                  },
                  children: []
                },
                {
                  path: "menu-3-1-3-2",
                  component: Menu4,
                  name: "menu-3-1-3-2",
                  meta: {
                    title: "公式维护"
                  },
                  children: []
                },
                {
                  path: "menu-3-1-3-3",
                  component: Menu4,
                  name: "menu-3-1-3-3",
                  meta: {
                    title: "图纸模板库"
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          path: "menu-3-2",
          component: Menu2,
          name: "menu-3-2",
          meta: {
            title: "人力资源部"
          },
          children: []
        },
        {
          path: "menu-3-3",
          component: Menu2,
          name: "menu-3-3",
          meta: {
            title: "经济管理部"
          },
          children: []
        },
        {
          path: "menu-3-4",
          component: Menu2,
          name: "menu-3-4",
          meta: {
            title: "经营计划部"
          },
          children: []
        },
        {
          path: "menu-3-5",
          component: Menu2,
          name: "menu-3-5",
          meta: {
            title: "物资管理部"
          },
          children: []
        },
        {
          path: "menu-3-6",
          component: Menu2,
          name: "menu-3-6",
          meta: {
            title: "设备管理部"
          },
          children: []
        },
        {
          path: "menu-3-7",
          component: Menu2,
          name: "menu-3-7",
          redirect: "/company/menu-3/menu-3-7/menu-3-7-1",
          meta: {
            title: "安全管理部"
          },
          children: [
            {
              path: "menu-3-7-1",
              component: Menu3,
              name: "menu-3-7-1",
              redirect: "/company/menu-3/menu-3-7/menu-3-7-1/menu-3-7-1-1",
              meta: {
                title: "安全验收标准库"
              },
              children: [
                {
                  path: "menu-3-7-1-1",
                  component: Menu4,
                  name: "menu-3-7-1-1",
                  meta: {
                    title: "安全验收标准库"
                  },
                  children: []
                },
                {
                  path: "menu-3-7-1-2",
                  component: Menu4,
                  name: "menu-3-7-1-2",
                  meta: {
                    title: "隐患排查巡检库"
                  },
                  children: []
                },
                {
                  path: "menu-3-7-1-3",
                  component: Menu4,
                  name: "menu-3-7-1-3",
                  meta: {
                    title: "安全督查巡检库"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-7-2",
              component: Menu3,
              name: "menu-3-7-2",
              redirect: "/company/menu-3/menu-3-7/menu-3-7-2/menu-3-7-2-1",
              meta: {
                title: "验收整改"
              },
              children: [
                {
                  path: "menu-3-7-2-1",
                  component: Menu4,
                  name: "menu-3-7-2-1",
                  meta: {
                    title: "安全条件验收"
                  },
                  children: []
                },
                {
                  path: "menu-3-7-2-2",
                  component: Menu4,
                  name: "menu-3-7-2-2",
                  meta: {
                    title: "外部问题检查库"
                  },
                  children: []
                },
                {
                  path: "menu-3-7-2-3",
                  component: Menu4,
                  name: "menu-3-7-2-3",
                  meta: {
                    title: "隐患排查整改"
                  },
                  children: []
                },
                {
                  path: "menu-3-7-2-4",
                  component: Menu4,
                  name: "menu-3-7-2-4",
                  meta: {
                    title: "安全督查"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-7-3",
              component: Menu3,
              name: "menu-3-7-3",
              redirect: "/company/menu-3/menu-3-7/menu-3-7-3/menu-3-7-3-1",
              meta: {
                title: "互动交谈"
              },
              children: [
                {
                  path: "menu-3-7-3-1",
                  component: Menu4,
                  name: "menu-3-7-3-1",
                  meta: {
                    title: "安全违章交谈"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-7-4",
              component: Menu3,
              name: "menu-3-7-4",
              redirect: "/company/menu-3/menu-3-7/menu-3-7-4/menu-3-7-4-1",
              meta: {
                title: "安全条件"
              },
              children: [
                {
                  path: "menu-3-7-4-1",
                  component: Menu4,
                  name: "menu-3-7-4-1",
                  meta: {
                    title: "安全责任等级"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-7-5",
              component: Menu3,
              name: "menu-3-7-5",
              redirect: "/company/menu-3/menu-3-7/menu-3-7-5/menu-3-7-5-1",
              meta: {
                title: "安全教育"
              },
              children: [
                {
                  path: "menu-3-7-5-1",
                  component: Menu4,
                  name: "menu-3-7-5-1",
                  meta: {
                    title: "三级教育"
                  },
                  children: []
                },
                {
                  path: "menu-3-7-5-2",
                  component: Menu4,
                  name: "menu-3-7-5-2",
                  meta: {
                    title: "班前教育"
                  },
                  children: []
                },
                {
                  path: "menu-3-7-5-3",
                  component: Menu4,
                  name: "menu-3-7-5-3",
                  meta: {
                    title: "巡回教育"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-7-6",
              component: Menu3,
              name: "menu-3-7-6",
              redirect: "/company/menu-3/menu-3-7/menu-3-7-6/menu-3-7-6-1",
              meta: {
                title: "安全内业"
              },
              children: [
                {
                  path: "menu-3-7-6-1",
                  component: Menu4,
                  name: "menu-3-7-6-1",
                  meta: {
                    title: "文件回复管理"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-7-7",
              component: Menu3,
              name: "menu-3-7-7",
              redirect: "/company/menu-3/menu-3-7/menu-3-7-7/menu-3-7-7-1",
              meta: {
                title: "安全考核"
              },
              children: [
                {
                  path: "menu-3-7-7-1",
                  component: Menu4,
                  name: "menu-3-7-7-1",
                  meta: {
                    title: "文件回复考核"
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          path: "menu-3-8",
          component: Menu2,
          name: "menu-3-8",
          redirect: "/company/menu-3/menu-3-8/menu-3-8-1",
          meta: {
            title: "财务部"
          },
          children: [
            {
              path: "menu-3-8-1",
              component: Menu3,
              name: "menu-3-8-1",
              redirect: "/company/menu-3/menu-3-8/menu-3-8-1/menu-3-8-1-1",
              meta: {
                title: "工资管理"
              },
              children: [
                {
                  path: "menu-3-8-1-1",
                  component: Menu4,
                  name: "menu-3-8-1-1",
                  meta: {
                    title: "薪酬标准"
                  },
                  children: []
                },
                {
                  path: "menu-3-8-1-2",
                  component: Menu4,
                  name: "menu-3-8-1-2",
                  meta: {
                    title: "工资介绍信（财务）"
                  },
                  children: []
                },
                {
                  path: "menu-3-8-1-3",
                  component: Menu4,
                  name: "menu-3-8-1-3",
                  meta: {
                    title: "工资介绍信（社保）"
                  },
                  children: []
                },
                {
                  path: "menu-3-8-1-4",
                  component: Menu4,
                  name: "menu-3-8-1-4",
                  meta: {
                    title: "计提产值表"
                  },
                  children: []
                },
                {
                  path: "menu-3-8-1-5",
                  component: Menu4,
                  name: "menu-3-8-1-5",
                  meta: {
                    title: "计提进度"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-8-2",
              component: Menu3,
              name: "menu-3-8-2",
              redirect: "/company/menu-3/menu-3-8/menu-3-8-2/menu-3-8-2-1",
              meta: {
                title: "劳动生产率"
              },
              children: [
                {
                  path: "menu-3-8-2-1",
                  component: Menu4,
                  name: "menu-3-8-2-1",
                  meta: {
                    title: "人均产值"
                  },
                  children: []
                },
                {
                  path: "menu-3-8-2-2",
                  component: Menu4,
                  name: "menu-3-8-2-2",
                  meta: {
                    title: "产值工资比"
                  },
                  children: []
                },
                {
                  path: "menu-3-8-2-3",
                  component: Menu4,
                  name: "menu-3-8-2-3",
                  meta: {
                    title: "管理费产值比"
                  },
                  children: []
                },
                {
                  path: "menu-3-8-2-4",
                  component: Menu4,
                  name: "menu-3-8-2-4",
                  meta: {
                    title: "趋势比较"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-8-3",
              component: Menu3,
              name: "menu-3-8-3",
              redirect: "/company/menu-3/menu-3-8/menu-3-8-3/menu-3-8-3-1",
              meta: {
                title: "社保办"
              },
              children: [
                {
                  path: "menu-3-8-3-1",
                  component: Menu4,
                  name: "menu-3-8-3-1",
                  meta: {
                    title: "参保明细"
                  },
                  children: []
                },
                {
                  path: "menu-3-8-3-2",
                  component: Menu4,
                  name: "menu-3-8-3-2",
                  meta: {
                    title: "年度设置"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-8-4",
              component: Menu3,
              name: "menu-3-8-4",
              redirect: "/company/menu-3/menu-3-8/menu-3-8-4/menu-3-8-4-1",
              meta: {
                title: "数据采集"
              },
              children: [
                {
                  path: "menu-3-8-4-1",
                  component: Menu4,
                  name: "menu-3-8-4-1",
                  meta: {
                    title: "本级管理费"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-8-5",
              component: Menu3,
              name: "menu-3-8-5",
              redirect: "/company/menu-3/menu-3-8/menu-3-8-5/menu-3-8-5-1",
              meta: {
                title: "初始数据"
              },
              children: [
                {
                  path: "menu-3-8-5-1",
                  component: Menu4,
                  name: "menu-3-8-5-1",
                  meta: {
                    title: "数据录入"
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          path: "menu-3-9",
          component: Menu2,
          name: "menu-3-9",
          redirect: "/company/menu-3/menu-3-9/menu-3-9-1",
          meta: {
            title: "党委组织部"
          },
          children: [
            {
              path: "menu-3-9-1",
              component: Menu3,
              name: "menu-3-9-1",
              redirect: "/company/menu-3/menu-3-9/menu-3-9-1/menu-3-9-1-1",
              meta: {
                title: "党务管理"
              },
              children: [
                {
                  path: "menu-3-9-1-1",
                  component: Menu4,
                  name: "menu-3-9-1-1",
                  meta: {
                    title: "党员花名册"
                  },
                  children: []
                },
                {
                  path: "menu-3-9-1-2",
                  component: Menu4,
                  name: "menu-3-9-1-2",
                  meta: {
                    title: "关系转接"
                  },
                  children: []
                },
                {
                  path: "menu-3-9-1-3",
                  component: Menu4,
                  name: "menu-3-9-1-3",
                  meta: {
                    title: "党费收缴"
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          path: "menu-3-10",
          component: Menu2,
          name: "menu-3-10",
          redirect: "/company/menu-3/menu-3-10/menu-3-10-1",
          meta: {
            title: "行政办公室"
          },
          children: [
            {
              path: "menu-3-10-1",
              component: Menu3,
              name: "menu-3-10-1",
              redirect: "/company/menu-3/menu-3-10/menu-3-10-1/menu-3-10-1-1",
              meta: {
                title: "出勤管理"
              },
              children: [
                {
                  path: "menu-3-10-1-1",
                  component: Menu4,
                  name: "menu-3-10-1-1",
                  meta: {
                    title: "人员出勤"
                  },
                  children: []
                },
                {
                  path: "menu-3-10-1-2",
                  component: Menu4,
                  name: "menu-3-10-1-2",
                  meta: {
                    title: "打卡明细"
                  },
                  children: []
                },
                {
                  path: "menu-3-10-1-3",
                  component: Menu4,
                  name: "menu-3-10-1-3",
                  meta: {
                    title: "人像审核"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-10-2",
              component: Menu3,
              name: "menu-3-10-2",
              redirect: "/company/menu-3/menu-3-10/menu-3-10-2/menu-3-10-2-1",
              meta: {
                title: "会议管理"
              },
              children: [
                {
                  path: "menu-3-10-2-1",
                  component: Menu4,
                  name: "menu-3-10-2-1",
                  meta: {
                    title: "会议安排"
                  },
                  children: []
                },
                {
                  path: "menu-3-10-2-2",
                  component: Menu4,
                  name: "menu-3-10-2-2",
                  meta: {
                    title: "会议室管理"
                  },
                  children: []
                },
                {
                  path: "menu-3-10-2-3",
                  component: Menu4,
                  name: "menu-3-10-2-3",
                  meta: {
                    title: "我的会议"
                  },
                  children: []
                }
              ]
            },
            {
              path: "menu-3-10-3",
              component: Menu3,
              name: "menu-3-10-3",
              redirect: "/company/menu-3/menu-3-10/menu-3-10-3/menu-3-10-3-1",
              meta: {
                title: "配置管理"
              },
              children: [
                {
                  path: "menu-3-10-3-1",
                  component: Menu4,
                  name: "menu-3-10-3-1",
                  meta: {
                    title: "行政分管配置"
                  },
                  children: []
                },
                {
                  path: "menu-3-10-3-2",
                  component: Menu4,
                  name: "menu-3-10-3-2",
                  meta: {
                    title: "请销假配置"
                  },
                  children: []
                },
                {
                  path: "menu-3-10-3-3",
                  component: Menu4,
                  name: "menu-3-10-3-3",
                  meta: {
                    title: "考勤配置"
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          path: "menu-3-11",
          component: Menu2,
          name: "menu-3-11",
          redirect: "/company/menu-3/menu-3-11/menu-3-11-1",
          meta: {
            title: "试验室"
          },
          children: [
            {
              path: "menu-3-11-1",
              component: Menu3,
              name: "menu-3-11-1",
              meta: {
                title: "原材检测"
              },
              children: []
            },
            {
              path: "menu-3-11-2",
              component: Menu3,
              name: "menu-3-11-2",
              meta: {
                title: "砼配合比"
              },
              children: []
            }
          ]
        }
      ]
    },
    {
      path: "menu-4",
      component: Menu1,
      name: "menu-4",
      redirect: "/company/menu-4/menu-4-1",
      meta: {
        title: "OA办公"
      },
      children: [
        {
          path: "menu-4-1",
          component: Menu2,
          name: "menu-4-1",
          redirect: "/company/menu-4/menu-4-1/menu-4-1-1",
          meta: {
            title: "请销假"
          },
          children: [
            {
              path: "menu-4-1-1",
              component: Menu3,
              name: "menu-4-1-1",
              meta: {
                title: "请假"
              },
              children: []
            },
            {
              path: "menu-4-1-2",
              component: Menu3,
              name: "menu-4-1-2",
              meta: {
                title: "出差"
              },
              children: []
            }
          ]
        },
        {
          path: "menu-4-2",
          component: Menu2,
          name: "menu-4-2",
          redirect: "/company/menu-4/menu-4-2/menu-4-2-1",
          meta: {
            title: "收发文"
          },
          children: [
            {
              path: "menu-4-2-1",
              component: Menu3,
              name: "menu-4-2-1",
              meta: {
                title: "收文"
              },
              children: []
            },
            {
              path: "menu-4-2-2",
              component: Menu3,
              name: "menu-4-2-2",
              meta: {
                title: "发文"
              },
              children: []
            }
          ]
        },
        {
          path: "menu-4-3",
          component: Menu2,
          name: "menu-4-3",
          redirect: "/company/menu-4/menu-4-3/menu-4-3-1",
          meta: {
            title: "培训考试"
          },
          children: [
            {
              path: "menu-4-3-1",
              component: Menu3,
              name: "menu-4-3-1",
              meta: {
                title: "视频监控"
              },
              children: []
            },
            {
              path: "menu-4-3-2",
              component: Menu3,
              name: "menu-4-3-2",
              meta: {
                title: "课件共享"
              },
              children: []
            },
            {
              path: "menu-4-3-3",
              component: Menu3,
              name: "menu-4-3-3",
              meta: {
                title: "培训打分"
              },
              children: []
            }
          ]
        }
      ]
    },
    {
      path: "menu-5",
      component: Menu1,
      name: "menu-5",
      redirect: "/company/menu-5/menu-5-1",
      meta: {
        title: "综合看板"
      },
      children: [
        {
          path: "menu-5-1",
          component: Menu2,
          name: "menu-5-1",
          redirect: "/company/menu-5/menu-5-1/menu-5-1-1",
          meta: {
            title: "聚合看板"
          },
          children: [
            {
              path: "menu-5-1-1",
              component: Menu3,
              name: "menu-5-1-1",
              meta: {
                title: "项目看板"
              },
              children: []
            }
          ]
        },
        {
          path: "menu-5-2",
          component: Menu2,
          name: "menu-5-2",
          meta: {
            title: "智慧工地"
          },
          children: []
        }
      ]
    }
  ]
};

export default menuRouter;
