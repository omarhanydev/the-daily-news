import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const dayjsInit = () => {
  dayjs.extend(relativeTime);
};

export { dayjsInit };
