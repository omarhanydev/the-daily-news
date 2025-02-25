import dayjs from "dayjs";
import {
  BaseAdapter,
  BaseAdapterFetchParams,
  Article,
  TheGuardianResponse,
} from "../types";

export class TheGuardianAdapter extends BaseAdapter<TheGuardianResponse> {
  constructor(
    name: string,
    id: string,
    apiKey: string,
    processor: (
      data: TheGuardianResponse,
      type: "article" | "category" | "author"
    ) => Promise<Article[] | { label: string; id: string }[]>
  ) {
    super(name, id, apiKey, processor);
  }

  async fetchLatest(): Promise<Response> {
    return fetch(
      `https://content.guardianapis.com/search?api-key=${this.apiKey}&show-tags=contributor&show-fields=thumbnail,byline`
    );
  }

  async fetchFiltered(params: BaseAdapterFetchParams): Promise<Response> {
    return fetch(
      `https://content.guardianapis.com/search?api-key=${
        this.apiKey
      }&show-tags=contributor&show-fields=thumbnail,byline&query-fields=headline,body,byline,publication,section,sectionName${
        params.fromDate ? `&from-date=${this.processDate(params.fromDate)}` : ""
      }${
        params.toDate ? `&to-date=${this.processDate(params.toDate)}` : ""
      }${this.processSearchKeyword(params)}${
        params.categoryId ? `&section=${params.categoryId}` : ""
      }${params.authorId ? `&tag=${params.authorId}` : ""}`
    );
  }

  async fetchCategories(params?: BaseAdapterFetchParams): Promise<Response> {
    return fetch(
      `https://content.guardianapis.com/sections?api-key=${this.apiKey}${
        params?.keyword ? `&q=${params.keyword}` : ""
      }`
    );
  }

  async fetchAuthors(params?: BaseAdapterFetchParams): Promise<Response> {
    return fetch(
      `https://content.guardianapis.com/tags?api-key=${
        this.apiKey
      }&type=contributor&page-size=1000${
        params?.keyword ? `&q=${params.keyword}` : ""
      }`
    );
  }

  private processDate(date: Date | string): string {
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
