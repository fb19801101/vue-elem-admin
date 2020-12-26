// 使用 require 引入json文件，可以直接访问数据

const appData = require("./data.json");
const curveData = require("./curve.json");
const usersData = require("./users.json");
const proxy = {
  "GET /mock-api/login": {
    success: appData.login.success,
    message: appData.login.message,
    file: "a.txt"
  },
  "GET /mock-api/list": [
    { id: 1, username: "kenny", sex: 6 },
    { id: 2, username: "kenny", sex: 6 }
  ],
  "POST /mock-api/post": (req, res) => {
    res.send({
      status: "error",
      code: 403
    });
  },
  "DELETE /mock-api/remove": (req, res) => {
    res.send({
      status: "ok",
      message: "删除成功！"
    });
  },

  "GET /mock-api/curve-element/selectCurveElement": curveData,
  "GET /mock-api/curve-element/selectCurveLine": {
    code: 0,
    msg: "获取数据成功",
    count: 6,
    data: [
      { ceQx: "K161+800.957-K182+828.224" },
      { ceQx: "AK161+800.957-AK182+828.224" },
      { ceQx: "BK161+800.957-BK182+828.224" },
      { ceQx: "CK161+800.957-CK182+828.224" },
      { ceQx: "DK161+800.957-DK182+828.224" },
      { ceQx: "D2K161+800.957-D2K182+828.224" }
    ]
  },

  "GET /mock-api/users/selectUsers": usersData,
  "POST /mock-api/users/registerUser": (req, res) => {
    res.send({
      code: 200,
      msg: "注册用户成功",
      count: 1,
      param: req.body,
      data: {
        id: 3,
        username: "normal",
        password: "normal@111111",
        name: "消费者",
        role: "normal",
        status: 0
      }
    });
  },
  "GET /mock-api/users/deleteUser": (req, res) => {
    res.send({
      code: 200,
      msg: "删除用户成功",
      param: req.params
    });
  },
  "POST /mock-api/users/modifyUser": (req, res) => {
    res.send({
      code: 200,
      msg: "修改用户成功",
      count: 1,
      param: req.body,
      data: {
        id: 3,
        username: "normal",
        password: "normal@111111",
        name: "消费者",
        role: "normal",
        status: 0
      }
    });
  }
};

module.exports = proxy;
