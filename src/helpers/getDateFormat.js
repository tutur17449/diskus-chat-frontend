import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { enGB } from "date-fns/locale";

const getDateFormat = (timestamp) => {
  console.log(timestamp);
  const dt = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: enGB,
  });
  return dt;
};

export default getDateFormat;
