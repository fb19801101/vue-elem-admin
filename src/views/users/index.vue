<template>
  <div class="app-container">
    <h1>这个页面为用户管理页面，请自定义添加内容</h1>
    <el-button type="primary" @click="selectUsers">查询用户</el-button>
    <el-button type="primary" @click="registerUser">注册用户</el-button>
    <el-button type="primary" @click="deleteUser">删除用户</el-button>
    <el-button type="primary" @click="modifyUser">修改用户</el-button>

    <br /><br /><br />
    <json-editor ref="jsonEditor" v-model="result" style="font-size:20px" />
  </div>
</template>

<script>
import usersApi from "@api/users";
import JsonEditor from "@/components/JsonEditor";

export default {
  name: "Users",
  components: { JsonEditor },
  data() {
    return {
      result: {}
    };
  },
  methods: {
    selectUsers: function() {
      const _this = this;
      usersApi
        .selectUsers()
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.result = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    registerUser: function() {
      const _this = this;
      usersApi
        .registerUser({username:"test-mocker", password:"123456"})
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.result = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteUser: function() {
      const _this = this;
      usersApi
        .deleteUser(1000)
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.result = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    modifyUser: function() {
      const _this = this;
      usersApi
        .modifyUser({username:"test-mocker", password:"123456"})
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.result = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
