const setLocalKOTPrintEnable = (token) => {
  const tkn = localStorage.setItem("enableKOT", token);
  return tkn;
};
export default setLocalKOTPrintEnable;
