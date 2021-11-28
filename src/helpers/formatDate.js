import moment from "moment";
import { DATEFORMAT } from "../contants";

const formatDate = (date, format) => {
  if (!date) {
    return "-";
  } else {
    return moment(date).format(format || DATEFORMAT);
  }
};
export default formatDate;
