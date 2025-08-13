import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "@/utils/api";
import { authService } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const posService = {
  poslineInsert: async (data) => {
    const token = authService.getToken();
    try {
      const response = await api.post(`${API_BASE_URL}/api/pos/posline`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error registation", error);
    }
  },

  poshdInsert: async (data) => {
    const token = authService.getToken();
    try {
      const response = await api.post(`${API_BASE_URL}/api/pos/poshd`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error registation", error);
    }
  },
};
