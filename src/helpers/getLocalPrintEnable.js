const getLocalPrintEnable = (token) => {
  const tkn = localStorage.getItem("enablePrinting");
  return tkn;
};
export default getLocalPrintEnable;
