import { param2Obj } from "@/utils";
import adminGif from "@/assets/roles_images/admin.gif";
import editorGif from "@/assets/roles_images/editor.gif";
import normalGif from "@/assets/roles_images/normal.gif";
import testGif from "@/assets/roles_images/test.gif";

const userMap = {
  admin: {
    roles: ["admin"],
    token: "admin",
    introduction: "我是超级管理员",
    avatar: adminGif,
    //"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin"
  },
  editor: {
    roles: ["editor"],
    token: "editor",
    introduction: "我是编辑",
    avatar: editorGif,
    //"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor"
  },
  normal: {
    roles: ["normal"],
    token: "normal",
    introduction: "我是过客",
    avatar: normalGif,
    //"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal User"
  },
  test: {
    roles: ["test"],
    token: "test",
    introduction: "我是测试",
    avatar: testGif,
    //"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Test User"
  }
};

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body);
    return userMap[username];
  },
  registerUser: config => {
    const { username } = JSON.parse(config.body);
    return userMap[username];
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
      return false;
    }
  },
  logout: () => "success"
};
