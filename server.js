import axios from "axios";

const server = axios.create({
  baseURL: "https://crest-sever.onrender.com",
});

export default server;
