import Vue from "vue";
import App from "./App";
import store from "./store";
import Tip from "./utils/tip";
import bus from "./utils/bus";
import "./mixins/system"; // 系统相关函数
import "./filters/number"; // 数字相关过滤器
import "./filters/date"; // 日期相关过滤器

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$tip = Tip;
Vue.prototype.$bus = bus;

App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();
