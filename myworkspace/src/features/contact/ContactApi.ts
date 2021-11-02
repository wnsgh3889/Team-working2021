import axios from "axios";

export interface ContactItemResponse {
    id: number;
    name: string;
    phone: string;
    email: string;
    createdTime: string;
    memo: string;
}

export interface ContactItemRequest {
  id?: number;
    name: string;
    phone: string;
    email: string;
    memo: string;
}

const ContactApi = {
  fetch: () =>
    axios.get<ContactItemResponse[]>(`${process.env.REACT_APP_API_BASE}/contacts`),

  add: (ContactItem: ContactItemRequest) =>
    axios.post<ContactItemResponse>(
      `${process.env.REACT_APP_API_BASE}/contacts`,
      ContactItem
    ),

  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/contacts/${id}`),


  modify: (id: number, ContactItem: ContactItemRequest) =>
    axios.put<ContactItemResponse>(
      `${process.env.REACT_APP_API_BASE}/contacts/${id}`,
      ContactItem
    ),
};

export default ContactApi;
