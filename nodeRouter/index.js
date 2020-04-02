/*
 * @创建者: 何元鹏
 * @创建时间: Do not edit
 * @修改者: 何元鹏
 * @修改时间: Do not edit
 */
const server = require("./server");
const router = require("./router");
const requestHandlers = require("./requestHandlers");

// 创建路由以及执行方法
let handle = {
  "/start": requestHandlers.start,
  "/upload": requestHandlers.upload
};
/**
 * @description: 调用服务
 *  路由方法调用
 *  启用requestHandlers方法
 */
server.start(router.route, handle);
