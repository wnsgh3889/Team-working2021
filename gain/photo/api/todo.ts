import axios from "axios";

interface TodoItemResponse {
  id: number;
  memo: string;
  createdTime: number;
}

interface TodoItemRequest {
  memo: string;
}

const todoApi = {
  fetch: () =>
    axios.get<TodoItemResponse[]>(`${process.env.NEXT_PUBLIC_API_BASE}/todos`),

  add: (todoItem: TodoItemRequest) =>
    axios.post<TodoItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/todos`,
      todoItem
    ),

  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.NEXT_PUBLIC_API_BASE}/todos/${id}`),

  modify: (id: number, todoItem: TodoItemRequest) =>
    axios.put<TodoItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/todos/${id}`,
      todoItem
    ),
};

export default todoApi;
