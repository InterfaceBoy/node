/*
 * @Autor: 何元鹏
 * @Date: 2020-03-18 16:56:38
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-03-18 17:02:56
 */
function route(handle, pathname, response, request) {
  if (typeof handle[pathname] === "function") {
    return handle[pathname](response, request);
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
