<template>
  <div class="app-container">
    <vue-table
      caption="权限分类一览表"
      :btree="true"
      :cols="cols"
      :rows="rows"
      :expands="expands"
      :folder="true"
    />
  </div>
</template>

<script>
import VueTable from "@components/VueTable";

export default {
  name: "Role",
  components: { VueTable },
  data() {
    return {
      cols: [],
      rows: [],
      expands: {}
    };
  },
  created() {
    const _this = this;

    _this.cols = [
      {
        id: 1,
        prop: "node",
        label: "权限类型",
        width: 200
      },
      {
        id: 2,
        prop: "id",
        label: "用户 ID",
        width: 100
      },
      {
        id: 3,
        prop: "username",
        label: "用户名称",
        width: 200
      },
      {
        id: 4,
        prop: "password",
        label: "用户密码",
        width: 200
      },
      {
        id: 5,
        prop: "sex",
        label: "性别",
        width: 100
      },
      {
        id: 6,
        prop: "age",
        label: "年龄",
        width: 100
      },
      {
        id: 7,
        prop: "school",
        label: "毕业院校",
        width: 200
      },
      {
        id: 8,
        prop: "phone",
        label: "联系方式",
        width: 200
      }
    ];

    _this.rows = [
      {
        node: "管理权限",
        id: 1100,
        username: "username",
        password: "password",
        sex: "男",
        age: "20",
        school: "西安电子科技大学",
        phone: "13379049154",
        expands: [
          { id: 11001, label: "展开行", value: "Table Expand Row" },
          { id: 11002, label: "展开行", value: "Table Expand Row" },
          { id: 11003, label: "展开行", value: "Table Expand Row" },
          { id: 11004, label: "展开行", value: "Table Expand Row" }
        ],
        children: [
          {
            node: "超级管理员",
            id: 1101,
            username: "username",
            password: "password",
            sex: "男",
            age: "20",
            school: "西安电子科技大学",
            phone: "13379049154",
            children: [
              {
                node: "权限设置",
                id: 11011,
                username: "username",
                password: "password",
                sex: "男",
                age: "20",
                school: "西安电子科技大学",
                phone: "13379049154",
              },
              {
                node: "页面访问",
                id: 11012,
                username: "username",
                password: "password",
                sex: "男",
                age: "20",
                school: "西安电子科技大学",
                phone: "13379049154",
              }
            ]
          },
          {
            node: "普通管理员",
            id: 1102,
            username: "username",
            password: "password",
            sex: "男",
            age: "20",
            school: "西安电子科技大学",
            phone: "13379049154",
            expands: [
              { id: 11021, label: "展开行", value: "Table Expand Row" },
              { id: 11022, label: "展开行", value: "Table Expand Row" },
              { id: 11023, label: "展开行", value: "Table Expand Row" },
              { id: 11024, label: "展开行", value: "Table Expand Row" }
            ],
            children: [
              {
                node: "功能控制",
                id: 11021,
                username: "username",
                password: "password",
                sex: "男",
                age: "20",
                school: "西安电子科技大学",
                phone: "13379049154",
                expands: [
                  { id: 110211, label: "展开行", value: "Table Expand Row" },
                  { id: 110212, label: "展开行", value: "Table Expand Row" },
                  { id: 110213, label: "展开行", value: "Table Expand Row" },
                  { id: 110214, label: "展开行", value: "Table Expand Row" }
                ]
              },
              {
                node: "访问控制",
                id: 11022,
                username: "username",
                password: "password",
                sex: "男",
                age: "20",
                school: "西安电子科技大学",
                phone: "13379049154",
                expands: [
                  { id: 110221, label: "展开行", value: "Table Expand Row" },
                  { id: 110222, label: "展开行", value: "Table Expand Row" },
                  { id: 110223, label: "展开行", value: "Table Expand Row" },
                  { id: 110224, label: "展开行", value: "Table Expand Row" }
                ]
              }
            ]
          }
        ]
      },
      {
        node: "编辑权限",
        id: 1200,
        username: "username",
        password: "password",
        sex: "男",
        age: "20",
        school: "西安电子科技大学",
        phone: "13379049154",
        expands: [
          { id: 12001, label: "展开行", value: "Table Expand Row" },
          { id: 12002, label: "展开行", value: "Table Expand Row" },
          { id: 12003, label: "展开行", value: "Table Expand Row" },
          { id: 12004, label: "展开行", value: "Table Expand Row" }
        ]
      },
      {
        node: "访问权限",
        id: 1300,
        username: "username",
        password: "password",
        sex: "男",
        age: "20",
        school: "西安电子科技大学",
        phone: "13379049154",
        expands: [
          { id: 13001, label: "展开行", value: "Table Expand Row" },
          { id: 13002, label: "展开行", value: "Table Expand Row" },
          { id: 13003, label: "展开行", value: "Table Expand Row" },
          { id: 13004, label: "展开行", value: "Table Expand Row" }
        ]
      },
      {
        node: "测试权限",
        id: 1400,
        username: "username",
        password: "password",
        sex: "男",
        age: "20",
        school: "西安电子科技大学",
        phone: "13379049154",
        children: [
          {
            node: "接口测试",
            id: 1401,
            username: "username",
            password: "password",
            sex: "男",
            age: "20",
            school: "西安电子科技大学",
            phone: "13379049154"
          },
          {
            node: "功能测试",
            id: 1402,
            username: "username",
            password: "password",
            sex: "男",
            age: "20",
            school: "西安电子科技大学",
            phone: "13379049154",
            children: [
              {
                node: "用户列表",
                id: 14021,
                username: "username",
                password: "password",
                sex: "男",
                age: "20",
                school: "西安电子科技大学",
                phone: "13379049154",
              },
              {
                node: "技术交底",
                id: 14022,
                username: "username",
                password: "password",
                sex: "男",
                age: "20",
                school: "西安电子科技大学",
                phone: "13379049154",
                children: [
                  {
                    node: "WBS树",
                    id: 140221,
                    username: "username",
                    password: "password",
                    sex: "男",
                    age: "20",
                    school: "西安电子科技大学",
                    phone: "13379049154",
                  },
                  {
                    node: "流程审核",
                    id: 140222,
                    username: "username",
                    password: "password",
                    sex: "男",
                    age: "20",
                    school: "西安电子科技大学",
                    phone: "13379049154",
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    _this.expands = {
      expand: true,
      button: true,
      caption: "商品详情"
    };
  }
};
</script>
