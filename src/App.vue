<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
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
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/styles/reset.scss";
@import "@/styles/common.scss";
@import "@/styles/hzui.scss";
</style>
