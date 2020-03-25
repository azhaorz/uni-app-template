import Request from "./request";
import _config from "@/config";
import Tip from "../tip";
import status from "./status";

const request = new Request();

request.setConfig(config => {
  /* 设置全局配置 */
  config.baseUrl = _config.request.baseUrl;
  config.header = {
    ...config.header
  };
  config.custom = { loadingType: "normal" };
  return config;
});

request.interceptor.request((config, cancel) => {
  Tip.loading("", config.custom.loadingType);
  /* 请求之前拦截器 */
  config.header = {
    ...config.header
  };
  // if (config.custom.auth) {
  //   config.header.token = 'token'
  // }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  console.log(cancel);

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
  response => {
    /* 请求之后拦截器 */
    const {
      config: {
        custom: { loadingType }
      }
    } = response;
    Tip.loaded(loadingType);
    return response;
  },
  response => {
    const {
      statusCode,
      config: {
        url,
        custom: { loadingType }
      }
    } = response;
    if (statusCode !== 200) {
      Tip.single(`${url}: ${status[statusCode]}`, `${statusCode}`);
    }
    // 请求错误做点什么
    Tip.loaded(loadingType);
    return response;
  }
);

export default request;
