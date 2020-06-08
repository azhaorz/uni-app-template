/**
 * 缓存相关混入
 */

import Vue from "vue";

Vue.mixin({
  methods: {
    /**
     * 获取特殊机型的底部高度
     */
    getSpecialModelBottomHeight() {
      var res = uni.getSystemInfoSync();
      res.model = res.model.replace(" ", "");
      res.model = res.model.toLowerCase();
      if (
        res.model.indexOf("iphonex") != -1 ||
        res.model.indexOf("iphone11") != -1
      ) {
        return 50;
      }
      return 0;
    },

    /**
     * 授权错误处理
     */
    async authErrorHandler({ errMsg }) {
      const [key, value] = errMsg.split(":");
      console.log(key);
      if (value === "fail auth deny") {
        const bol = await this.$tip.double(
          "该授权被拒绝过，需手动开启后，重新点击",
          "授权提示",
          "去开启"
        );
        if (!bol) return;
        await uni.openSetting();
      }
    }
  }
});
