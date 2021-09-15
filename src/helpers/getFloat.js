const getFloat = (value, decimals) => {
  if (typeof value === "string") {
    return parseFloat(parseFloat(value).toFixed(decimals || 2));
  }
  return parseFloat(value.toFixed(decimals || 2));
};
export default getFloat;
