import dayjs from "dayjs";
import {
  BaseAdapter,
  BaseAdapterFetchParams,
  Article,
  NewsApiResponse,
} from "../types";

export class NewsApiAdapter extends BaseAdapter<NewsApiResponse> {
  constructor(
    name: string,
    id: string,
    apiKey: string,
    processor: (data: NewsApiResponse) => Promise<Article[]>
  ) {
    super(name, id, apiKey, processor);
  }

  async fetchLatest(): Promise<Response> {
    return fetch(
      `https://newsapi.org/v2/top-headlines?apiKey=${this.apiKey}&language=en`
    );
  }

  async fetchFilter(params: BaseAdapterFetchParams): Promise<Response> {
    return fetch(
      `https://newsapi.org/v2/everything?apiKey=${this.apiKey}${
        params.fromDate ? `&from=${this.processDate(params.fromDate)}` : ""
      }${
        params.toDate ? `&to=${this.processDate(params.toDate)}` : ""
      }${this.processSearchKeyword(params)}`
    );
  }

  private processDate(date: Date): string {
    return dayjs(date).format("YYYY-MM-DD");
  }

  private processSearchKeyword(params: BaseAdapterFetchParams): string {
    const searchKeywordQuery =
      [params.keyword, params.category, params.author].reduce<string>(
        (acc, curr) => {
          if (acc == "" && curr) {
            return `&q=${curr}`;
          }
          if (curr) {
            return `${acc} AND ${curr}`;
          }
          return acc;
        },
        ""
      ) || "";
    return searchKeywordQuery;
  }
}
