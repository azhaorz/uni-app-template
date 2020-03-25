import Vue from "vue";
import App from "./App";
import store from "./store";
import Tip from "./utils/tip";

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$tip = Tip;

App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();
