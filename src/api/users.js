// CurveElement 相关接口
import axios from "@utils/axios/baseAxios";

export default {
  selectUsers: function() {
    return axios.axiosGet("/users/selectUsers");
  },
  searchUsers: function(username) {
    return axios.axiosGet("/users/searchUsers", {
      username: username
    });
  },
  registerUser: function(user) {
    return axios.axiosPost("/users/registerUser", {
      user: user
    });
  },
  deleteUser: function(id) {
    return axios.axiosGet("/users/deleteUser", {
      id: id
    });
  },
  modifyUser: function(user) {
    return axios.axiosPost("/users/modifyUser", {
      user: user
    });
  }
};
