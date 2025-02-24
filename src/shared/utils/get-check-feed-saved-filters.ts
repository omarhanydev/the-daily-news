import dayjs, { Dayjs } from "dayjs";

const processFiltersToServiceFilters = (data: {
  keyword: string;
  customDate: Dayjs | string | null;
  dateType: string;
  sources: { label: string; id: string }[];
  category: { label: string; id: string };
  author: { label: string; id: string };
}) => {
  const { keyword, customDate, dateType, sources, category, author } = data;

  const fromDate = () => {
    if (customDate) {
      return new Date(customDate).toISOString();
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
      return new Date(customDate).toISOString();
    }
    return null;
  };

  return {
    keyword,
    fromDate: fromDate(),
    toDate: toDate(),
    category: category?.id === category?.label ? category?.label : null,
    categoryId: category?.id !== category?.label ? category?.id : null,
    author: author?.id === author?.label ? author?.label : null,
    authorId: author?.id !== author?.label ? author?.id : null,
  };
};

const getFeedSavedFiltersFromLocalStorage = () => {
  return localStorage?.getItem("feedSaved")
    ? JSON.parse(localStorage.getItem("feedSaved") || "false")
    : null;
};

export { getFeedSavedFiltersFromLocalStorage, processFiltersToServiceFilters };
