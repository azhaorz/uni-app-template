<template>
  <view class="login-act-pwd">
    <image
      class="wh-100 br-50p mar-t-87 mar-b-44"
      src="/static/icon/preview.png"
    />
    <!-- 输入账号 -->
    <view class="wrap-input">
      <input
        v-model="account"
        class="input mar-b-23"
        placeholder-style="color: #CDCDCD;"
        placeholder="请输入账号"
      />
    </view>

    <!-- 输入密码 -->
    <view class="wrap-input">
      <input
        v-model="password"
        type="password"
        class="input mar-b-36"
        placeholder-style="color: #CDCDCD;"
        placeholder="请输入密码"
      />
    </view>
    <button @click="login" class="hz-button login-btn">登录</button>
  </view>
</template>

<script>
import { apiActPwdLogin } from "@/services/login";
import { mapActions } from "vuex";

export default {
  name: "login-act-pwd",

  data() {
    return {
      account: "",
      password: ""
    };
  },

  methods: {
    ...mapActions("user", ["setToken"]),

    async login() {
      const { account, password } = this;

      if (!account) return this.$tip.single("账号不能为空");

      if (!password) return this.$tip.single("密码不能为空");

      const {
        data: { access_token }
      } = await apiActPwdLogin(account, password);

      this.setToken(access_token);

      if (this.isHasPrePage()) {
        // 有上一页的话返回上一页
        uni.navigateBack();
        // 加载上一页的onLoad函数
        const pages = getCurrentPages();
        const pre = pages[pages.length - 2];
        pre.onLoad(pre.options);
      } else {
        uni.redirectTo({ url: "/pages/example/index" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-act-pwd {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  .wrap-input {
    .input {
      padding: 0 0 10rpx 10rpx;
      font-size: 32rpx;
      width: 540rpx;
      border-bottom: 1px solid #f2f2f2;
    }
  }
  .login-btn {
    background-color: $color-primary;
    color: #fff;
    height: 72rpx;
    line-height: 72rpx;
    width: 540rpx;
    text-align: center;
    box-shadow: 0 16rpx 16rpx 0 rgba(0, 0, 0, 0.24);
    font-size: 28rpx;
  }
}
</style>
