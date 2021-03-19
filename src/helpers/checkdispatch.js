const checkDispatch = async (mainfunction, successcallback, failcallback) => {
  try {
    await mainfunction()
      .then((res) => {
        if (res.payload.status === 200) {
          console.log(successcallback);
          successcallback && successcallback();
        } else {
          console.log("api error");
          failcallback && failcallback();
        }
      })
      .catch((err) => {
        console.log(failcallback);
        console.log("api error", err);
        failcallback && failcallback();
      });
  } catch {
    failcallback && failcallback();
  }
};

export default checkDispatch;
