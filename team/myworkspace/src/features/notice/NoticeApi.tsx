import axios from "axios";

export interface NoticeItemResponse {
    postNumber: internal;
    mainTitle: string;
    content: string;
    postingDate: string;
}


export interface NoticeItemRequest {
  id?: number;
    name: string;
    phone: string;
    email: string;
    memo: string;
}

const NoticeApi = {
  fetch: () =>
    axios.get<NoticeItemResponse[]>(`${process.env.REACT_APP_API_BASE}/Notices`),

  add: (NoticeItem: NoticeItemRequest) =>
    axios.post<NoticeItemResponse>(
      `${process.env.REACT_APP_API_BASE}/Notices`,
      NoticeItem
    ),

  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/Notices/${id}`),


  modify: (id: number, NoticeItem: NoticeItemRequest) =>
    axios.put<NoticeItemResponse>(
      `${process.env.REACT_APP_API_BASE}/Notices/${id}`,
      NoticeItem
    ),
};

export default NoticeApi;
tItemRequest {
  id?: number;
  postNumber: internal;
  mainTitle: string;
  content: string;
  postingDate: string;
}

const NoticeApi = {
  fetch: () =>
    axios.get<NoticeItemResponse[]>(`${process.env.REACT_APP_API_BASE}/Notices`),

  add: (NoticeItem: NoticeItemRequest) =>
    axios.post<NoticeItemResponse>(
      `${process.env.REACT_APP_API_BASE}/Notices`,
      NoticeItem
    ),

  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/Notices/${id}`),


  modify: (id: number, NoticeItem: NoticeItemRequest) =>
    axios.put<NoticeItemResponse>(
      `${process.env.REACT_APP_API_BASE}/Notices/${id}`,
      NoticeItem
    ),
};

export default NoticeApi;
