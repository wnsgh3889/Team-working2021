import axios from "axios";
import { createAxiosInstance } from "./_request";

export interface noticePagingReponse {
  content: noticeItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface noticeItemResponse {
  id: number;
  title: string;
  description: string;
  noticeUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
}

export interface noticeItemRequest {
  title: string;
  description?: string;
  noticeUrl: string;
  fileType: string;
  fileName: string;
}

const noticeApi = {
  get: (id: number) =>
    createAxiosInstance().get<noticeItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/notices/${id}`
    ),

  fetch: () =>
    createAxiosInstance().get<noticeItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/notices`
    ),

  fetchPaging: (page: number, size: number) =>
    createAxiosInstance().get<noticePagingReponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/notices/paging?page=${page}&size=${size}`
    ),

  add: (noticeItem: noticeItemRequest) =>
    createAxiosInstance().post<noticeItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/notices`,
      noticeItem
    ),

  remove: (id: number) =>
    createAxiosInstance().delete<boolean>(
      `${process.env.NEXT_PUBLIC_API_BASE}/notices/${id}`
    ),

  modify: (id: number, noticeItem: noticeItemRequest) =>
    createAxiosInstance().put<noticeItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/notices/${id}`,
      noticeItem
    ),
};

export default noticeApi;
