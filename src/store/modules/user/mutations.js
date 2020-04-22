import mTypes from "@/store/mutation-types";

export default {
  [mTypes.SET_TOKEN](state, token) {
    state.token = token;
  }
};
