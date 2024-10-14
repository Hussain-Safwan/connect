import axios from "axios";

const baseURL = "http://localhost:4000/api";

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
  return client.post(url, data);
};

const put = (url, data) => {
  return client.put(url, data);
};

export { get, post, put };
