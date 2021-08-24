const setCurrency = (token) => {
  const tkn = localStorage.setItem("currency", token);
  return tkn;
};
export default setCurrency;
