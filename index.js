const Koa = require("koa");
const app = new Koa();
app.use(async (ctx, next) => {
  //
  const start = Date.now();
  await next();
  const end = Date.now();
  console.log(`请求${ctx.url} 耗时${parseInt(end - start)}ms`);
});

app.use(async (ctx) => {
  const expire = Date.now() + 1000;
  while (Date.now() < expire)
    //   延时1s执行
    ctx.body = {
      name: "tom",
    };
});


app.listen(3000, () => {
  console.log("server ar 3000");
});
