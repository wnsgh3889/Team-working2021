import axios from "axios";
import { createAxiosInstance } from "./_request";

export interface PhotoPagingReponse {
  content: PhotoItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}


export interface PhotoItemResponse {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
}

export interface PhotoItemRequest {
  title: string;
  description?: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
}


const photoApi = {
  get: (id: number) =>
    createAxiosInstance().get<PhotoItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/photos/${id}`
    ),
 
  fetch: () =>
    createAxiosInstance().get<PhotoItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/photos`
    ),

  fetchPaging: (page: number, size: number) =>
    createAxiosInstance().get<PhotoPagingReponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/photos/paging?page=${page}&size=${size}`
    ),

 
  add: (photoItem: PhotoItemRequest) =>
    createAxiosInstance().post<PhotoItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/photos`,
      photoItem
    ),
  
  remove: (id: number) =>
    createAxiosInstance().delete<boolean>(
      `${process.env.NEXT_PUBLIC_API_BASE}/photos/${id}`
    ),

  
  modify: (id: number, photoItem: PhotoItemRequest) =>
    createAxiosInstance().put<PhotoItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/photos/${id}`,
      photoItem
    ),
};

export default photoApi;
