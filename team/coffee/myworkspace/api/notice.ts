import axios from "axios";
import { createAxiosInstance } from "./_request";

export interface coffeePagingReponse {
  content: coffeeItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface coffeeItemResponse {
  id: number;
  title: string;
  description: string;
  coffeeUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
}

export interface coffeeItemRequest {
  title: string;
  description?: string;
  coffeeUrl: string;
  fileType: string;
  fileName: string;
}


const coffeeApi = {
  get: (id: number) =>
    createAxiosInstance().get<coffeeItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/coffees/${id}`
    ),
 
  fetch: () =>
    createAxiosInstance().get<coffeeItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/coffees`
    ),

  fetchPaging: (page: number, size: number) =>
    createAxiosInstance().get<coffeePagingReponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/coffees/paging?page=${page}&size=${size}`
    ),

  
  add: (coffeeItem: coffeeItemRequest) =>
    createAxiosInstance().post<coffeeItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/coffees`,
      coffeeItem
    ),
 
  remove: (id: number) =>
    createAxiosInstance().delete<boolean>(
      `${process.env.NEXT_PUBLIC_API_BASE}/coffees/${id}`
    ),

  
  modify: (id: number, coffeeItem: coffeeItemRequest) =>
    createAxiosInstance().put<coffeeItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/coffees/${id}`,
      coffeeItem
    ),
};

export default coffeeApi;