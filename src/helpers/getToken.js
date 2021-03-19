const getToken = (token) => {
  const tkn = localStorage.getItem("token");
  return tkn;
};
export default getToken;
