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
