import mTypes from "@/store/mutation-types";

export default {
  [mTypes.EXAMPLE_MUTATION](state, payload) {
    console.log("example_mutation");
    state.example = payload;
  }
};
