import api from "@/utils/api";
import { authService } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const posSetupService = {
  getPostSetup: async (params) => {
    const token = authService.getToken();

    try {
      const response = await api.get(
        `${API_BASE_URL}/api/pos/possetup`,
        { params },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error registation", error);
    }
  },
};
