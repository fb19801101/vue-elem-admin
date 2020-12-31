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

  "GET /mock-api/curve-element/selectCurveElement": curveData[0],
  "GET /mock-api/curve-element/selectCurveLine": {
    code: 0,
    msg: "获取数据成功",
    count: 6,
    data: [
      "K161+800.957-K182+828.224",
      "AK161+800.957-AK182+828.224",
      "BK161+800.957-BK182+828.224",
      "CK161+800.957-CK182+828.224",
      "DK161+800.957-DK182+828.224",
      "D2K161+800.957-D2K182+828.224"
    ]
  },
  "POST /mock-api/curve-element/searchCurveElement": (req, res) => {
    res.send(curveData[1]);
  },
  "POST /mock-api/curve-element/deleteCurveElement": (req, res) => {
    res.send(curveData[2]);
  },
  "POST /mock-api/curve-element/modifyCurveElement": (req, res) => {
    res.send(curveData[3]);
  },

  "GET /mock-api/users/selectUsers": (req, res) => {
    res.send({
      code: 200,
      msg: "获取用户成功",
      data: usersData[0]
    });
  },
  "GET /mock-api/users/searchUsers": (req, res) => {
    res.send({
      code: 200,
      msg: "查询用户成功",
      count: 1,
      param: req.query,
      data: usersData[1]
    });
  },
  "POST /mock-api/users/registerUser": (req, res) => {
    res.send({
      code: 200,
      msg: "注册用户成功",
      count: 1,
      param: req.body,
      data: usersData[2]
    });
  },
  "GET /mock-api/users/deleteUser": (req, res) => {
    res.send({
      code: 200,
      msg: "删除用户成功",
      param: req.query,
      data: usersData[3]
    });
  },
  "POST /mock-api/users/modifyUser": (req, res) => {
    res.send({
      code: 200,
      msg: "修改用户成功",
      count: 1,
      param: req.body,
      data: usersData[4]
    });
  }
};

module.exports = proxy;
