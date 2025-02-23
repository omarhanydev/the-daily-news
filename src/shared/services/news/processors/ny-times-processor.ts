import { Article, NyTimesResponse } from "../types";

export const NyTimesProcessor = async (
  data: NyTimesResponse
): Promise<Article[]> => {
  return new Promise((resolve) => {
    const articles: Article[] = [];
    data?.response?.docs?.map((record) => {
      articles.push({
        id: record._id,
        author: record.byline?.original?.replace("By ", ""),
        category: record.section_name,
        description: record.snippet,
        image:
          record.multimedia?.length > 0
            ? "https://www.nytimes.com/" + record.multimedia[0].url
            : "",
        publishedAt: record.pub_date,
        source: "NY Times",
        sourceId: "ny-times",
        title: record.headline.main,
        url: record.web_url,
      });
    });
    resolve(articles);
  });
};
