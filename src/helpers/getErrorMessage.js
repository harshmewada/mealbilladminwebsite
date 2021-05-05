const getErrorMessage = (error) => {
  return typeof error?.error?.response?.data?.message==="string" ? error?.error?.response?.data?.message:undefined;
};
export default getErrorMessage;
