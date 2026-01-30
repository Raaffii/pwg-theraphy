import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "@/utils/api";
import { authService } from "./authService";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const productsService = {
  getProducts: async () => {
    // const margedData = { data1, data2 };
    const token = authService.getToken();
    try {
      const response = await api.get(`${API_BASE_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error registation", error);
      return error;
    }
  },

  insertProducts: async (data) => {
    // const margedData = { data1, data2 };
    const token = authService.getToken();
    try {
      const response = await api.post(`${API_BASE_URL}/api/products`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error registation", error);
      return error;
    }
  },
  deleteProduct: async (id) => {
    // const margedData = { data1, data2 };
    const token = authService.getToken();

    try {
      const response = await api.delete(`${API_BASE_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error registation", error);
      return error;
    }
  },

  editProduct: async (id, data) => {
    // const margedData = { data1, data2 };
    const token = authService.getToken();

    try {
      const response = await api.put(
        `${API_BASE_URL}/api/products/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error registation", error);
      return error;
    }
  },
};
