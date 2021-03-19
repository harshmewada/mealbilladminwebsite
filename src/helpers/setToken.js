const setToken = (token) => {
  const tkn = localStorage.setItem("token", token);
  return tkn;
};
export default setToken;
