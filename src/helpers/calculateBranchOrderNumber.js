const calculateBranchOrderNumber = (branchCode, lastOrderNumber) => {
  return branchCode + (lastOrderNumber + 1);
};
export default calculateBranchOrderNumber;
