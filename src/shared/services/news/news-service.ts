import { NewsApiAdapter } from "./adapters/news-api-adapter";
import { NyTimesAdapter } from "./adapters/ny-times-adapter";
import { TheGuardianAdapter } from "./adapters/the-guardian-adapter";
import { Article, BaseAdapter } from "./types";
import { TheGuardianProcessor } from "./processors/the-guardian-processor";
import { NyTimesProcessor } from "./processors/ny-times-processor";
import { NewsApiProcessor } from "./processors/news-api-processor";

export class NewsService {
  private adapters: BaseAdapter[];

  constructor(adapters: string[]) {
    this.adapters = [];
    adapters.forEach((adapterId) => {
      switch (adapterId) {
        case "news-api":
          this.adapters.push(
            new NewsApiAdapter(
              "News API",
              "news-api",
              import.meta.env.VITE_NEWS_API_KEY || "",
              NewsApiProcessor
            )
          );
          break;
        case "ny-times":
          this.adapters.push(
            new NyTimesAdapter(
              "NY Times",
              "ny-times",
              import.meta.env.VITE_NY_TIMES_API_KEY || "",
              NyTimesProcessor
            )
          );
          break;
        case "the-guardian":
          this.adapters.push(
            new TheGuardianAdapter(
              "The Guardian",
              "the-guardian",
              import.meta.env.VITE_THE_GUARDIAN_API_KEY || "",
              TheGuardianProcessor
            )
          );
          break;
      }
    });
  }

  async fetchLatestNews(): Promise<PromiseSettledResult<Article[]>[]> {
    return await Promise.allSettled(
      this.adapters.map(async (adapter) => {
        const response = await adapter.fetchLatest();
        const data = await response.json();
        if (response.ok) {
          return await adapter.processor(data);
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
            data: data,
            adapter: {
              id: adapter.id,
              name: adapter.name,
            },
          });
        }
      })
    );
  }
}

export const newsService = new NewsService(["news-api", "ny-times", "the-guardian"]);