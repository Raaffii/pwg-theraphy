import { useState, useCallback } from "react";
import { posService } from "@/services/posService";
export const usePosHd = () => {
  const [posHd, setPosHd] = useState([]);

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

  const formatposHdData = useCallback((rawposHd) => {
    return rawposHd.map((item) => ({
      ...item,
      id: item.posHdId,
    }));
  }, []);

  const fetchPosHd = useCallback(
    async (overrideParams = {}) => {
      try {
        setIsLoading(true);
        setError(null);
        const finalParams = { ...params, ...overrideParams };
        const apiParams = {
          ...finalParams,
        };

        const response = await posService.getCustomerPosHd(apiParams);

        const data = formatposHdData(response.data.data);

        setPosHd(data);
        setPagination(
          response.pagination || {
            currentPage: 1,
            pageSize: 10,
            totalPages: 1,
            totalItems: 0,
          },
        );

        return { success: true, data: data };
      } catch (err) {
        console.error("Error fetching posHd:", err);

        setError(err.message);
        setPosHd([]);

        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [params, formatposHdData],
  );

  const onSearch = useCallback(
    async (searchTerm) => {
      const newParams = { ...params, searchTerm };
      setParams(newParams);

      return await fetchPosHd({ searchTerm, page: 1 });
    },
    [fetchPosHd, setParams, params],
  );

  const onPageChange = useCallback(
    async (page) => {
      const newParams = { ...params, page };
      console.log("new", newParams);
      setParams(newParams);
      return await fetchPosHd(newParams);
    },
    [params, fetchPosHd],
  );

  const onPageSizeChange = useCallback(
    async (pageSize) => {
      console.log("pagesize", pageSize);
      const newParams = { ...params, pageSize, page: 1 };
      setParams(newParams);
      return await fetchPosHd({ pageSize, page: 1 });
    },
    [params, fetchPosHd],
  );

  const onFilterChange = useCallback(
    async (filters) => {
      const newParams = {
        ...params,
        subject: filters.subject || null,

        page: 1,
      };
      setParams(newParams);
      return await fetchPosHd({
        subject: filters.subject || null,
        page: 1,
      });
    },
    [params, fetchPosHd],
  );

  return {
    fetchPosHd,
    onPageChange,
    onPageSizeChange,
    onSearch,
    onFilterChange,
    isSubmitting,
    posHd,
    isLoading,
    error,
    pagination,
    params,
    setParams,
  };
};
