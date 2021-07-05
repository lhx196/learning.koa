// const add = (x, y) => x + y;
// const square = (z) => z * z;

// const fn = (x, y) => square(add(x, y));

// const compose = (fn1,fn2) => (...args) => fn2(fn1(...args));

// const compose = (...[first,...other]) => (...args) => {
//     let ret = first(...args)
//     other.forEach(fn=> ret = fn(ret))
//     return ret
// }

// const compose = (...funs) => funs.reduce((a,b) => (...args)=> b(a(...args)))

// console.log(compose(add, square)(2, 3));

// <!-----------------------异步compose next------------------------->
function compose(middlewares) {
  return function () {
    return dispatch(0);
    // 执行当前函数，并传递下一个中间件函数next
    function dispatch(i) {
      let fn = middlewares[i];
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        //   fn为中间件的执行函数，参数是下一个中间函数，所以next为下一个中间件函数
        fn(function next() {
          return dispatch(i + 1);
        })
      );
    }
  };
}

async function fn1(next) {
  console.log("fn1");
  await next();
  console.log("end fn1");
}

async function fn2(next) {
  console.log("fn2");
  await delay();
  await next();
  console.log("end fn2");
}

function fn3(next) {
  console.log("fn3");
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
}

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
// console.log(typeof finalFn)
// console.log(finalFn);
finalFn();
