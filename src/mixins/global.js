/**
 * 全局混入
 */

import Vue from "vue";
import config from "@/config";

Vue.mixin({
  data() {
    return {
      // 主色
      _colorPrimary: config.colorPrimary
    };
  },
  methods: {
    /**
     * 路由跳转
     */
    navTo(url) {
      uni.navigateTo({ url });
    }
  }
});
