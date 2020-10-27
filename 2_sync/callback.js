function interview(callback) {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      callback("success");
    } else {
      //  错误必须在callback中抛出，不然异步操作会使错误在新的事件循环中无法被捕获
      callback(new Error("fail"));
    }
  }, 500);
}
// 执行
interview(function (res) {
  if (res instanceof Error) {
    console.log("cry");
  } else {
    console.log("smile");
  }
});
