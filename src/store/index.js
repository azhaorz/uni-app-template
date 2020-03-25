import Vue from "vue";
import Vuex from "vuex";
import logger from "./createLogger";
import state from "./global/state";
import actions from "./global/actions";
import mutations from "./global/mutations";

import example from "./modules/example";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [logger],
  modules: {
    example
  },
  state,
  actions,
  mutations
});

export default store;
