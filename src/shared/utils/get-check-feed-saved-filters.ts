import dayjs from "dayjs";
import { ActiveFilters } from "@/shared/stores";

const processFiltersToServiceFilters = (data: ActiveFilters) => {
  const { keyword, customDate, dateType, category, author } = data;

  const fromDate = () => {
    if (customDate) {
      return dayjs(customDate).toISOString();
    } else if (dateType === "past-hour") {
      return dayjs().subtract(1, "hour").toDate().toISOString();
    } else if (dateType === "past-day") {
      return dayjs().subtract(1, "day").toDate().toISOString();
    } else if (dateType === "past-week") {
      return dayjs().subtract(1, "week").toDate().toISOString();
    } else if (dateType === "past-month") {
      return dayjs().subtract(1, "month").toDate().toISOString();
    } else if (dateType === "past-year") {
      return dayjs().subtract(1, "year").toDate().toISOString();
    }
    return null;
  };

  const toDate = () => {
    if (customDate) {
      return dayjs(customDate).toISOString();
    }
    return null;
  };

  return {
    keyword,
    fromDate: fromDate(),
    toDate: toDate(),
    category:
      typeof category === "object" && category?.id === category?.label
        ? category?.label
        : null,
    categoryId:
      typeof category === "object" && category?.id !== category?.label
        ? category?.id
        : null,
    author:
      typeof author === "object" && author?.id === author?.label
        ? author?.label
        : null,
    authorId:
      typeof author === "object" && author?.id !== author?.label
        ? author?.id
        : null,
  };
};

const getFeedSavedFiltersFromLocalStorage = () => {
  return localStorage?.getItem("feedSaved")
    ? JSON.parse(localStorage.getItem("feedSaved") || "false")
    : null;
};

export { getFeedSavedFiltersFromLocalStorage, processFiltersToServiceFilters };
