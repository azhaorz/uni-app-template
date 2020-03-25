<template>
  <view class="example">
    <view>example</view>
  </view>
</template>

<script>
import { mapActions } from "vuex";
// import { apiLiveBanner } from "@/service/live";

export default {
  async onShow() {
    this.exampleAction("example");
    // apiLiveBanner();
  },

  methods: {
    ...mapActions("example", ["exampleAction"])
  }
};
</script>

<style lang="scss">
.content {
  text-align: center;
  height: 400upx;
}

.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
