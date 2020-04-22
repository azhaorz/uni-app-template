import mTypes from "@/store/mutation-types";
import * as Storages from "@/config/storage-keys";

export default {
  /**
   * 设置token
   * @param {string} token 用户登录凭证
   */
  setToken({ commit }, token) {
    commit(mTypes.SET_TOKEN, token);
    uni.setStorage({ key: Storages.TOKEN, data: token });
  },

  /**
   * 获取本地缓存token
   */
  async getToken({ commit }) {
    const token = uni.getStorageSync(Storages.TOKEN);
    commit(mTypes.SET_TOKEN, token);
    return token;
  }
};
