// const http = require("http");
// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end("HI");
// });
// server.listen(3000, () => {
//   console.log("端口3000");
// });

const KoaMin = require("./koa-min");
const app = new KoaMin();

// app.use((req, res) => {
//   res.writeHead(200);
//   res.end("Hi koa-min");
// });

app.use((ctx) => {
  ctx.body = "Hi koa-min";
});

app.use((ctx) => {
    ctx.body = "Hi2 koa-min";
  });

app.listen(3000, () => {
  console.log("端口3000");
});
