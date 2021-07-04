# Koa的学习之路

## 实现koa简单封装逻辑
1. api优化化
- 用新建一个context对象，利用Object.create继承以及get set访问器属性，将request，response对象挂载到context的request,response上
- 优化api 将context.request/response直接挂载到ctx.res/req上