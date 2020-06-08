import Vue from "vue";

Vue.filter("secondToYearMonthDay", function(str) {
  if (!str) return "- -";
  const date = new Date(parseFloat(str) * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  return `${year}.${month}.${day}`;
});
