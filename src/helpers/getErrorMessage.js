const getErrorMessage = (error) => {
  console.log("error", error);
  return error?.error?.response?.data?.message;
};
export default getErrorMessage;
