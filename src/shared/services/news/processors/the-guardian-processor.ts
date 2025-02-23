import { Article, TheGuardianResponse } from "../types";

export const TheGuardianProcessor = async (
  data: TheGuardianResponse
): Promise<Article[]> => {
  return new Promise((resolve) => {
    const articles: Article[] = [];
    data?.response?.results?.map((record) => {
      articles.push({
        id: record.id,
        author: record.fields?.byline,
        authorId:
          record.tags?.find((tag) => tag.type === "contributor")?.id || "",
        category: record.sectionName,
        categoryId: record.sectionId,
        description: record.webTitle,
        image: record?.fields?.thumbnail,
        publishedAt: record.webPublicationDate,
        source: "The Guardian",
        sourceId: "the-guardian",
        title: record.webTitle,
        url: record.webUrl,
      });
    });
    resolve(articles);
  });
};
