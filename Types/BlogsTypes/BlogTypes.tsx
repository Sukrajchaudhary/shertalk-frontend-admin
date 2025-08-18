export interface RootBlogs {
  count: number;
  next: string;
  previous: string;
  results: BlogResults[];
}

export interface BlogResults {
  id: number;
  category: RootResultsCategory;
  tags: RootResultsTags[];
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  views: number;
  image: string;
  state: string;
  author: number;
}

export interface RootResultsCategory {
  id: number;
  name: string;
  slug: string;
}

export interface RootResultsTags {
  id: number;
  name: string;
  slug: string;
}