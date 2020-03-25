import createLogger from "vuex/dist/logger";

export default createLogger({
  collapsed: false, // 自动展开记录的 mutation
  logger: console // 自定义 console 实现，默认为 `console`
});
