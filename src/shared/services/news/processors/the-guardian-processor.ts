import {
  Article,
  TheGuardianResponse,
  TheGuardianCategoriesAuthorsResponse,
} from "../types";

export const TheGuardianProcessor = async (
  data: TheGuardianResponse | TheGuardianCategoriesAuthorsResponse,
  type: "article" | "category" | "author" = "article"
): Promise<Article[] | { label: string; id: string }[]> => {
  return new Promise((resolve) => {
    const articles: Article[] = [];
    const categories: { label: string; id: string }[] = [];
    switch (type) {
      case "article":
        (data as TheGuardianResponse)?.response?.results?.map((record) => {
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
        break;
      case "category":
      case "author":
        (data as TheGuardianCategoriesAuthorsResponse)?.response?.results?.map(
          (record) => {
            categories.push({
              id: record.id,
              label: record.webTitle,
            });
          }
        );
        resolve(categories);
        break;
    }
  });
};
