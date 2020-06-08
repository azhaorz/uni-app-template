import dev from "./config.dev";
import prod from "./config.prod";
import { merge } from "lodash-es";
import api from "./api";

const config = {
  api,
  // tip配置
  tip: {
    // 确认按钮颜色
    confirmColor: "#0077FF",
    // 取消按钮颜色
    cancelColor: "#333333"
  },
  //主色调
  themeColor: "#129d7b",
  // 请求配置
  request: {
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    timeout: 10000,
    custom: {
      // loading类型
      loadingType: "normal",
      // 是否需要token认证
      isAuth: true,
      // 是否错误提示
      isError: true,
      // 需要跳转的登录地址
      loginPath: "/pages/login/act-pwd"
    }
  }
};

if (process.env.NODE_ENV === "development") {
  merge(config, dev);
  console.log("开发环境");
} else {
  merge(config, prod);
  console.log("生产环境");
}

export default config;
