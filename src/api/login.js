import request from "@/utils/request";

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  };
  return request({
    url: "/login/login",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "/login/logout",
    method: "post"
  });
}

export function registerUser(username, password1, password2) {
  const data = {
    username,
    password1,
    password2
  };
  return request({
    url: "/user/register",
    method: "post",
    data
  });
}

export function getUserInfo(token) {
  return request({
    url: "/user/info",
    method: "get",
    params: { token }
  });
}
