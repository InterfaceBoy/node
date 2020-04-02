/*
 * @Autor: 何元鹏
 * @Date: 2020-03-17 16:36:05
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-03-18 16:50:56
 */
// 建立子进程
const exec = require("child_process").exec;

// 不同路由下面操作
function start(response) {
  exec("ls -lah", function(error, stdout, stderr) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(stdout, stderr);
    response.end();
  });
}

function upload(response) {
  response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
  response.write("<h1 style='text-align:center'> 宝贝我爱你</h1>");
  response.end();
}

exports.start = start;
exports.upload = upload;
