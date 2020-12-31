<template>
  <div class="app-container">
    <h1>这个页面为用户管理页面，请自定义添加内容</h1>
    <el-button type="primary" @click="searchUsers">查询用户</el-button>
    <el-button type="primary" @click="registerUser">注册用户</el-button>
    <el-button type="primary" @click="deleteUser">删除用户</el-button>
    <el-button type="primary" @click="modifyUser">修改用户</el-button>

    <br /><br />
    <json-editor ref="jsonEditor" v-model="result" style="font-size:20px" />
    <br /><br />

    <vue-table
      caption="用户信息一览表"
      :refresh="refresh"
      :page="page"
      :toolbar="{
        search: true,
        left: ['refresh', 'upload', 'download'],
        right: ['edit', 'delete', 'printer']
      }"
      :cols="cols"
      :rows="rows"
      :filters="['username', 'role']"
      @handleRow="handleRow"
      @handlePage="handlePage"
    />
  </div>
</template>

<script>
import usersApi from "@api/users";
import JsonEditor from "@/components/JsonEditor";
import VueTable from "@components/VueTable";

export default {
  name: "Users",
  components: { JsonEditor, VueTable },
  data() {
    return {
      result: {},
      cols: [],
      rows: [],
      page: {},
      refresh: ""
    };
  },
  created() {
    const _this = this;

    _this.cols = [
      {
        id: 1,
        prop: "id",
        label: "用户 ID",
        width: 100,
        align: "center"
      },
      {
        id: 2,
        prop: "username",
        label: "用户名称",
        width: 200,
        align: "center"
      },
      {
        id: 3,
        prop: "password",
        label: "用户密码",
        width: 200,
        align: "center"
      },
      {
        id: 4,
        prop: "role",
        label: "用户角色",
        width: 200,
        align: "center",
        filters: [
          { text: "admin", value: "管理员" },
          { text: "editor", value: "编辑者" }
        ]
      },
      {
        id: 5,
        prop: "phone",
        label: "用户电话",
        width: 200,
        align: "center"
      },
      {
        id: 6,
        prop: "img",
        label: "用户图标",
        width: 180,
        align: "center"
      },
      {
        id: 7,
        prop: "ctrl",
        label: "操作",
        width: 150,
        align: "center",
        slot: [
          { type: "row-edit", name: "edit" },
          { type: "row-del", name: "del" }
        ]
      }
    ];

    usersApi
      .selectUsers()
      .then(res => {
        _this.$message.success(res.data.msg);
        _this.rows = res.data.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    searchUsers: function() {
      const _this = this;
      usersApi
        .searchUsers("search")
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.result = res.data;
          _this.rows = res.data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    registerUser: function() {
      const _this = this;
      usersApi
        .registerUser({
          username: "register",
          password: "register@123456",
          role: "editor",
          phone: "17791540396",
          img: "http://www.baidu.com/"
        })
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.result = res.data;
          _this.rows = res.data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteUser: function() {
      const _this = this;
      usersApi
        .deleteUser(4)
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.result = res.data;
          _this.rows = res.data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    modifyUser: function() {
      const _this = this;
      usersApi
        .modifyUser({
          username: "modify",
          password: "modify@123456",
          role: "test",
          phone: "17791540396",
          img: "http://www.baidu.com/"
        })
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.result = res.data;
          _this.rows = res.data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRow(row, type) {
      alert(JSON.stringify(row));
      alert(type);
    },
    handlePage(value) {
      console.log(value);
    }
  }
};
</script>
