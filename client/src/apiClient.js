import axios from "axios";
import { io } from "socket.io-client";

// const baseURL = "http://localhost:4000/api";
// const baseURL = "http://192.168.0.102:4000/api";
const baseURL = "https://connect-messenger-c89d40ea4488.herokuapp.com/api";

const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const get = (url) => {
  return client.get(url);
};

const post = (url, data) => {
  return client.post(url, data, { withCredentials: true });
};

const put = (url, data) => {
  return client.put(url, data, { withCredentials: true });
};

export const socket = io(baseURL.replace("/api", ""));

export { get, post, put };
//
