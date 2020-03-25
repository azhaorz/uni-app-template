import * as types from "@/store/mutation-types";

export default {
  exampleAction({ commit }, payload) {
    console.log("exampleAction");
    commit(types.EXAMPLE_MUTATION, payload);
  }
};
