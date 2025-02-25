import dayjs from "dayjs";
import {
  BaseAdapter,
  BaseAdapterFetchParams,
  Article,
  NyTimesResponse,
} from "../types";

export class NyTimesAdapter extends BaseAdapter<NyTimesResponse> {
  fetchCategories: undefined;
  fetchAuthors: undefined;

  constructor(
    name: string,
    id: string,
    apiKey: string,
    processor: (data: NyTimesResponse) => Promise<Article[]>
  ) {
    super(name, id, apiKey, processor);
  }

  async fetchLatest(): Promise<Response> {
    return fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${this.apiKey}`
    );
  }

  async fetchFiltered(params: BaseAdapterFetchParams): Promise<Response> {
    return fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${
        this.apiKey
      }${
        params.fromDate
          ? `&begin_date=${this.processDate(params.fromDate)}`
          : ""
      }${params.toDate ? `&end_date=${this.processDate(params.toDate)}` : ""}${
        params.keyword ? `&q=${params.keyword}` : ""
      }${this.processCategoryAndAuthor(params)}`
    );
  }

  private processDate(date: Date | string): string {
    return dayjs(date).format("YYYYMMDD");
  }

  private processCategoryAndAuthor(params: BaseAdapterFetchParams): string {
    const processFqValue = (type: string, value: string) => {
      if (type === "category") {
        return `section_name.contains:(\\"${value}\\")`;
      }
      if (type === "author") {
        return `byline:(\\"${value}\\")`;
      }
      return "";
    };
    const categoryAndAuthorQuery =
      [
        { type: "category", value: params.category || params.categoryId },
        { type: "author", value: params.author },
      ].reduce<string>((acc, curr) => {
        if (acc == "" && curr.value) {
          return `&fq=${processFqValue(curr.type, curr.value)}`;
        }
        if (curr.value) {
          return `${acc} AND ${processFqValue(curr.type, curr.value)}`;
        }
        return acc;
      }, "") || "";
    return categoryAndAuthorQuery;
  }
}
