const removeToken = (token) => {
  const tkn = localStorage.removeItem("token");
  return tkn;
};
export default removeToken;
