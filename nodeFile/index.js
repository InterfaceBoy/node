/*
 * @Autor: 何元鹏
 * @Date: 2020-03-18 16:57:19
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-03-18 18:24:07
 */
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
  "/upload": requestHandlers.upload,
  "/show": requestHandlers.show
};
/**
 * @description: 调用服务
 *  路由方法调用
 *  启用requestHandlers方法
 */
server.start(router.route, handle);
