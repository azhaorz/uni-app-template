import Vue from "vue";

Vue.filter("toFixed", function(value, digit = 2) {
  if (!value && value !== 0) return "- -";
  return value.toFixed(digit);
});

Vue.filter("telEncrypt", function(tel) {
  return tel ? tel.replace(/^(\d{3})\d*(\d{4})$/, "$1****$2") : "- -";
});

Vue.filter("parseFloat", function(str) {
  return str ? parseFloat(str) : 0;
});
