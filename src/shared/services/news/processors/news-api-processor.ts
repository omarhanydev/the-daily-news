import { Article, NewsApiResponse } from "../types";

export const NewsApiProcessor = async (
  data: NewsApiResponse
): Promise<Article[]> => {
  return new Promise((resolve) => {
    const articles: Article[] = [];
    data?.articles?.map((record) => {
      articles.push({
        id: Math.random().toString(36).substring(2, 15),
        description: record.description || "",
        image: record.urlToImage || "",
        publishedAt: record.publishedAt,
        source: "News API",
        sourceId: "news-api",
        title: record.title,
        url: record.url,
      });
    });
    resolve(articles);
  });
};
