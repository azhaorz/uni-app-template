import Request from "./request";
import _config from "@/config";
import Tip from "../tip";
import status from "./status";
import store from "@/store";
import { merge } from "lodash-es";

const request = new Request();

request.setConfig(config => {
  /* 设置全局配置 */
  merge(config, _config.request);

  return config;
});

request.interceptor.request((config, cancel) => {
  // 是否需要携带token
  if (config.custom.isToken) {
    // 查看token是否存在
    if (!store.state.user.token) {
      // 校验是否配置了登陆路由
      if (!config.custom.loginPath)
        throw new Error("请在配置文件中传入登录路由");

      Tip.single("登录才可访问", "提示", "去登陆").then(() => {
        uni.navigateTo({
          url: config.custom.loginPath
        });
      });
      return cancel("token 不存在");
    } else {
      // token存在，登录成功
    }
  }

  Tip.loading("", config.custom.loadingType);

  // if (config.custom.auth) {
  //   config.header.token = 'token'
  // }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config;
});

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
request.validateStatus = statusCode => {
  const firstCodeNum = statusCode.toString().substring(0, 1);
  return firstCodeNum === "2";
};

request.interceptor.response(
  async response => {
    /* 成功拦截 */
    const {
      config: {
        custom: { loadingType, loginPath }
      },
      data: { code, msg }
    } = response;
    Tip.loaded(loadingType);

    // 与token相关错误
    if (code === -1) {
      await Tip.single(msg);
      // 登录过期
      uni.navigateTo({
        url: loginPath
      });
      return Promise.reject(msg);
    }

    // 错误相关
    if (code !== 0) {
      Tip.single(msg);
      return Promise.reject(response.data);
    }

    return response.data;
  },
  response => {
    /* 错误拦截 */
    const {
      statusCode,
      config: {
        url,
        custom: { loadingType }
      }
    } = response;
    Tip.loaded(loadingType);

    if (statusCode !== 200) {
      Tip.single(`${url}: ${status[statusCode]}`, `${statusCode}`);
    }
    return response;
  }
);

export default request;
