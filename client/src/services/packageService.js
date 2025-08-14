import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "@/utils/api";
import { authService } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const packageService = {
  getPackage: async () => {
    // const margedData = { data1, data2 };
    const token = authService.getToken();
    try {
      const response = await api.get(`${API_BASE_URL}/api/package`, {
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
};
