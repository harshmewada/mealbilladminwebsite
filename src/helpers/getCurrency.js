const getCurrency = (token) => {
  const tkn = localStorage.getItem("currency");
  return tkn;
};
export default getCurrency;
