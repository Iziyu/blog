import axios from 'axios';
import type { Article, AuthResponse, Category, Comment, PaginatedResponse } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const articleApi = {
  list: (params?: { page?: number; page_size?: number; search?: string; cate_id?: number }) =>
    api.get<PaginatedResponse<Article>>('/articles', { params }).then((r) => r.data),

  show: (id: number) =>
    api.get<{ data: Article }>(`/articles/${id}`).then((r) => r.data.data),

  create: (data: { cate_id: number; title: string; brief: string; content: string }) =>
    api.post<{ data: Article }>('/articles', data).then((r) => r.data.data),

  update: (id: number, data: Partial<{ cate_id: number; title: string; brief: string; content: string }>) =>
    api.put<{ data: Article }>(`/articles/${id}`, data).then((r) => r.data.data),

  delete: (id: number) =>
    api.delete(`/articles/${id}`),
};

export const categoryApi = {
  list: () =>
    api.get<{ data: Category[] }>('/categories').then((r) => r.data.data),
};

export const commentApi = {
  list: (articleId: number) =>
    api.get<{ data: Comment[] }>(`/articles/${articleId}/comments`).then((r) => r.data.data),

  create: (articleId: number, data: { content: string; comment_id?: number }) =>
    api.post<{ data: Comment }>(`/articles/${articleId}/comments`, data).then((r) => r.data.data),
};

export const voteApi = {
  toggle: (articleId: number) =>
    api.post<{ voted: boolean; vote_cnt: number }>(`/articles/${articleId}/vote`).then((r) => r.data),

  status: (articleId: number) =>
    api.get<{ voted: boolean }>(`/articles/${articleId}/vote/status`).then((r) => r.data),
};

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data).then((r) => r.data),

  register: (data: { name: string; email: string; password: string }) =>
    api.post<AuthResponse>('/auth/register', data).then((r) => r.data),

  me: () =>
    api.get<{ user: import('../types').User }>('/auth/me').then((r) => r.data.user),
};

export default api;
