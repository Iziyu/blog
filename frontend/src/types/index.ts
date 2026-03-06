export interface User {
  id: number;
  name: string;
  email: string;
  mobile?: string;
  sex?: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  cate_id: number;
  name: string;
  display_name: string;
  cover?: string;
  active: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  user_id?: number;
  cate_id: number;
  title: string;
  brief: string;
  content: string;
  view_cnt: number;
  vote_cnt: number;
  comment_cnt: number;
  active: number;
  created_at: string;
  updated_at: string;
  user?: User;
  category?: Category;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  comment_id: number;
  user_id: number;
  article_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}
