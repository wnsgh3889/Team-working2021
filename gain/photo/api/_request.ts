import axios, { AxiosInstance } from "axios";
import { getSessionId, removeSessionId } from "../lib/cookie";

const createAxiosInstance = () => {
  
  if (typeof document == "undefined") {
    return axios;
  }

  let instance: AxiosInstance;

  if (!getSessionId()) {
    instance = axios.create();
  } else {
    instance = axios.create({
      headers: { APP_SESSION_ID: `${getSessionId()}` },
    });
  }

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
  
    (error) => {
      
      if ([401, 403].indexOf(error.response.status) > -1) {
        console.log("401/403");
        window.location.replace("/signin");
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export { createAxiosInstance };
