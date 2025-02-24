import { Dayjs } from "dayjs";

const processSavedFeedForLocalStorage = (data: {
  keyword: string | null;
  customDate: Dayjs | null | string | undefined;
  dateType: string | null;
  sources: { label: string; id: string }[];
  category: { label: string; id: string } | string | null;
  author: { label: string; id: string } | string | null;
}) => {
  return {
    ...data,
    customDate:
      data.dateType == "custom"
        ? data.customDate &&
          typeof (data.customDate as Dayjs).toDate === "function"
          ? (data.customDate as Dayjs).isValid()
            ? (data.customDate as Dayjs).toDate().toISOString()
            : null
          : null
        : null,
  };
};

export { processSavedFeedForLocalStorage };
