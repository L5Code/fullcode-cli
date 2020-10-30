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
(async function () {
  try {
    const fir = await interview.interviewInNum(1);
    console.log(fir);
    const ser = await interview.interviewInNum(2);
    console.log(ser);
    const third = await interview.interviewInNum(3);
    console.log(third);
  } catch (e) {
    console.log(e.msg, e.num);
  }
  console.log("yeah!");
})();
// 异步等待
(async function () {
  try {
    await Promise.all([
      interview.interviewToName("tencent"),
      interview.interviewToName("baidu"),
    ]);
  } catch (e) {
    console.log(e.msg, e.num);
  }
  console.log("yeah!");
})();
