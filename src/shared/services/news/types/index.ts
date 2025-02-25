/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class BaseAdapter<T = any> {
  name: string;
  id: string;
  apiKey: string;
  processor: (
    data: T,
    type: "article" | "category" | "author"
  ) => Promise<Article[] | { label: string; id: string }[]>;

  constructor(
    name: string,
    id: string,
    apiKey: string,
    processor: (
      data: T,
      type: "article" | "category" | "author"
    ) => Promise<Article[] | { label: string; id: string }[]>
  ) {
    if (!apiKey) {
      throw new Error("API key is required");
    }
    this.name = name;
    this.id = id;
    this.apiKey = apiKey;
    this.processor = processor;
  }

  abstract fetchLatest(): Promise<Response>;
  abstract fetchFiltered(params: BaseAdapterFetchParams): Promise<Response>;
  abstract fetchCategories?(params?: BaseAdapterFetchParams): Promise<Response>;
  abstract fetchAuthors?(params?: BaseAdapterFetchParams): Promise<Response>;
}

export type BaseAdapterFetchParams = {
  keyword?: string | null;
  fromDate?: Date | string | null;
  toDate?: Date | string | null;
  category?: string | null;
  categoryId?: string | null;
  author?: string | null;
  authorId?: string | null;
  page?: number | null;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  source: string;
  sourceId: string;
  author?: string;
  authorId?: string;
  category?: string;
  categoryId?: string;
};

// The Guardian

export type TheGuardianResponse = {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: TheGuardianArticle[];
  };
};

type TheGuardianArticle = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields: {
    byline: string;
    thumbnail: string;
  };
  tags: TheGuardianArticleTag[];
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
};

type TheGuardianArticleTag = {
  id: string;
  type: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  references: unknown[];
  bio?: string;
  bylineImageUrl?: string;
  bylineLargeImageUrl?: string;
  firstName?: string;
  lastName?: string;
  twitterHandle?: string;
};

export type TheGuardianCategoriesAuthorsResponse = {
  response: {
    status: string;
    userTier: string;
    total: number;
    results: TheGuardianCategoriesResult[];
  };
};

type TheGuardianCategoriesResult = {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  editions: TheGuardianCategoriesEdition[];
};

type TheGuardianCategoriesEdition = {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  code: string;
};

// Ny Times

export type NyTimesResponse = {
  status: string;
  copyright: string;
  response: {
    docs: NyTimesArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
};

type NyTimesArticle = {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: NyTimesMultimedia[];
  headline: NyTimesHeadline;
  keywords: NyTimesKeyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name?: string;
  byline: NyTimesByline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
};

type NyTimesMultimedia = {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: {
    xlarge?: string;
    xlargewidth?: number;
    xlargeheight?: number;
  };
  subType: string;
  crop_name: string;
};

type NyTimesHeadline = {
  main: string;
  kicker: string | null;
  content_kicker: string | null;
  print_headline: string | null;
  name: string | null;
  seo: string | null;
  sub: string | null;
};

type NyTimesKeyword = {
  name: string;
  value: string;
  rank: number;
  major: string;
};

type NyTimesByline = {
  original: string;
  person: NyTimesPerson[];
  organization: string | null;
};

type NyTimesPerson = {
  firstname: string;
  middlename: string | null;
  lastname: string;
  qualifier: string | null;
  title: string | null;
  role: string;
  organization: string;
  rank: number;
};

// News API

export type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
};

type NewsApiArticle = {
  source: NewsApiSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

type NewsApiSource = {
  id: string | null;
  name: string;
};
