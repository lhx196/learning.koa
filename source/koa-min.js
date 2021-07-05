const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class KoaMin {
  constructor() {
    this.middlewares = [];
  }

  listen(...args) {
    const server = http.createServer(async(req, res) => {
      //   this.callback(req, res);
      // 创建上下文
      const ctx = this.createContext(req, res);

      // 合成函数
      const fn = this.compose(this.middlewares);
      await fn(ctx);
      res.end(ctx.body);
    });
    server.listen(...args);
  }

  // use(callback) {
  //   this.callback = callback;
  // }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  //   创建上下文实例，将context，request，response挂在一起
  createContext(req, res) {
    //   Object.create(proto, [propertiesObject])
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  compose(middlewares) {
    return function (ctx) {
      return dispatch(0);
      // 执行当前函数，并传递下一个中间件函数next
      function dispatch(i) {
        let fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(
          //   fn为中间件的执行函数，参数是下一个中间函数，所以next为下一个中间件函数
          fn(ctx, function next() {
            return dispatch(i + 1);
          })
        );
      }
    };
  }
}

module.exports = KoaMin;
