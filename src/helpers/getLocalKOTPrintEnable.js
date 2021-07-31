const getLocalKOTPrintEnable = (token) => {
  const tkn = localStorage.getItem("enableKOT");
  return tkn;
};
export default getLocalKOTPrintEnable;
