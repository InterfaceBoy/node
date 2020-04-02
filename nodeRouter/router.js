function route(handle, pathname, response) {
  if (typeof handle[pathname] === "function") {
    console.log("程序处理" + pathname);
    return handle[pathname](response);
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
