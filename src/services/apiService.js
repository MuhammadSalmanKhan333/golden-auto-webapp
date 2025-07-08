import axios from "axios";
import utils from "../utils/utils";

const api = axios.create({
  baseURL: utils.BASE_URL,
  headers: {
    Authorization: `Bearer ${utils.token}`,
  },
});

/**
 * Generic API GET request
 */
export const fetchData = async (path, config = {}) => {
  try {
    const response = await api.get(path, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API fetch failed");
  }
};

/**
 * Generic API POST request
 */
export const postData = async (path, data = {}, config = {}) => {
  try {
    const response = await api.post(path, data, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API POST failed");
  }
};

/**
 * Generic API DELETE request
 * @param {string} path - The endpoint path (e.g. "favorites/12345").
 * @param {object} [config] - Optional axios config (e.g. headers).
 */
export const deleteData = async (path, config = {}) => {
  try {
    const response = await api.delete(path, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API DELETE failed");
  }
};

/**
 * Generic API PUT request
 */
export const putData = async (path, data, config = {}) => {
  try {
    const response = await api.put(path, data, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API update failed");
  }
};
