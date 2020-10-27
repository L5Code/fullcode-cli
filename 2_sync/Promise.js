const interview = {
  interviewInNum: function (num) {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        let success = {};
        success.msg = "success";
        success.num = num;
        return resolve(success);
      } else {
        let error = new Error("fail");
        error.msg = "fail";
        error.num = num;
        throw reject(error);
      }
    });
  },
  interviewToName: function (name) {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        let success = {};
        success.msg = "success";
        success.name = name;
        return resolve(success);
      } else {
        let error = new Error("fail");
        error.msg = "fail";
        error.name = name;
        throw reject(error);
      }
    });
  },
};

// 异步嵌套
interview
  .interviewInNum(1)
  .then((res) => {
    console.log(res);
    return interview.interviewInNum(2);
  })
  .then((res) => {
    console.log(res);
    return interview.interviewInNum(3);
  })
  .then(() => {
    console.log("yeah!");
  })
  .catch((err) => {
    console.log(err.msg, err.num);
  });

// 异步等待
Promise.all([
  interview.interviewToName("tencent"),
  interview.interviewToName("baidu"),
])
  .then(() => {
    console.log("all to pass");
  })
  .catch((err) => {
    console.log("fail from", err.name);
  });
