const actionCreator = (type) => {
  return {
    type: type,
    success: `${type}_SUCCESS`,
    fail: `${type}_FAIL`,
  };
};
export default actionCreator;
