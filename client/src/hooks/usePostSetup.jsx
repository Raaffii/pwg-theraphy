import { consentService } from "@/services/consentService";
import { useState, useCallback } from "react";
import { posSetupService } from "@/services/posSetupService";
import toast from "react-hot-toast";
export const usePosSetup = () => {
  const [posSetup, setPosSetup] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 1,
    totalItem: 0,
  });
  const [params, setParams] = useState({ page: 1, pageSize: 10 });

  const formatproductData = useCallback((rawproduct) => {
    return rawproduct.map((item) => ({
      ...item,
      id: item.customerid,
    }));
  }, []);

  const fetchPossSetup = useCallback(
    async (overrideParams = {}) => {
      try {
        setIsLoading(true);
        setError(null);
        const finalParams = { ...params, ...overrideParams };
        const apiParams = {
          ...finalParams,
        };

        const response = await posSetupService.getPostSetup(apiParams);

        setPosSetup(response.data);

        return { success: true, data: response.data };
      } catch (err) {
        console.error("Error fetching posSetup:", err);

        setError(err.message);
        setPosSetup([]);

        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [params, formatproductData],
  );

  return {
    fetchPossSetup,
    isSubmitting,
    posSetup,
    isLoading,
    error,
    pagination,
    params,
    setParams,
  };
};
