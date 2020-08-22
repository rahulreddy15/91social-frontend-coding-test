import axios from "axios";

const baseURL = "https://api.spacexdata.com/v3";
axios.defaults.baseURL = baseURL;
axios.defaults.headers["Content-Type"] = "application/json";

export const io = async ({ url, method, data, params, headers }) => {
  return await axios({
    url,
    method,
    headers,
    params,
    data,
  });
};
