<script>
import { mapActions } from "vuex";

export default {
  onLaunch() {
    this.autoLogin();

    console.log("App Launch");
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },
  onError(e) {
    console.log(e);

    if (e instanceof Error) {
      this.$tip.double(e.stack, "异常");
    } else {
      this.$tip.double(e, "异常");
    }
    // console.log("App Error", e);
  },
  onUnhandledRejection(e) {
    console.log(e);
  },

  methods: {
    ...mapActions("user", ["getToken"]),
    /**
     * 自动登录
     */
    async autoLogin() {
      this.getToken();
      // const token = await this.getToken();
      // if (token) uni.redirectTo({ url: "/pages/example/index" });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/reset.scss";
@import "@/styles/common.scss";
@import "@/styles/hzui.scss";
</style>
