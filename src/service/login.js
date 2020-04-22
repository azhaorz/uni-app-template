import request from "@/utils/request";
import config from "@/config";

/**
 * 账号密码登录
 */
export function apiActPwdLogin(account, password) {
  return request.post(
    config.api.login.actpwd,
    {
      username: account,
      password
    },
    {
      custom: {
        isToken: false
      }
    }
  );
}
