import axios from "axios";
import { createAxiosInstance } from "./_request";

interface SignUpRequest {
  userId: string;
  password: string;
  username: string;
  email: string;
  role: string;
  img?: string;
}

interface SignInRequest {
  userId: string;
  password: string;
}

export interface ProfileResponse {
  id: number;
  userId: string;
  username: string;
  email: string;
  role: string;
  img: string;
  sessionId: string;
}

const authApi = {
  
  signup: (req: SignUpRequest) =>
    axios.post<string>(`${process.env.NEXT_PUBLIC_AUTH_BASE}/auth/signup`, req),
  
  signin: (req: SignInRequest) =>
    axios.post<string>(`${process.env.NEXT_PUBLIC_AUTH_BASE}/auth/signin`, req),
  
  getSessionProfile: () => {
    const request = createAxiosInstance();
    return request.get<ProfileResponse>(
      `${process.env.NEXT_PUBLIC_AUTH_BASE}/auth/session-profile`
    );
  },
  clearSessionProfile: () => {
    const request = createAxiosInstance();
    return request.delete<string>(
      `${process.env.NEXT_PUBLIC_AUTH_BASE}/auth/session-profile`
    );
  },
};

export default authApi;
