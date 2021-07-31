const setLocalPrintEnable = (token) => {
  const tkn = localStorage.setItem("enablePrinting", token);
  return tkn;
};
export default setLocalPrintEnable;
