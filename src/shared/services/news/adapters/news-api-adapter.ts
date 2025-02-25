import dayjs from "dayjs";
import {
  BaseAdapter,
  BaseAdapterFetchParams,
  Article,
  NewsApiResponse,
} from "../types";

export class NewsApiAdapter extends BaseAdapter<NewsApiResponse> {
  fetchCategories: undefined;
  fetchAuthors: undefined;

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

  async fetchFiltered(params: BaseAdapterFetchParams): Promise<Response> {
    if (
      !params.keyword &&
      !params.category &&
      !params.categoryId &&
      !params.author
    ) {
      return this.fetchLatest();
    }
    return fetch(
      `https://newsapi.org/v2/everything?apiKey=${this.apiKey}${
        params.fromDate ? `&from=${this.processDate(params.fromDate)}` : ""
      }${
        params.toDate ? `&to=${this.processDate(params.toDate)}` : ""
      }${`&q=${this.processKeywordAndCategoryAndAuthor(params)}`}`
    );
  }

  private processDate(date: Date | string): string {
    return dayjs(date).format("YYYY-MM-DD");
  }

  private processKeywordAndCategoryAndAuthor(
    params: BaseAdapterFetchParams
  ): string {
    return (
      params.keyword ||
      params.category ||
      params.categoryId ||
      params.author ||
      ""
    );
  }
}
