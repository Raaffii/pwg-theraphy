import { consentService } from "@/services/consentService";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
export const useConsent = () => {
  const [consent, setConsent] = useState([]);

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

  const fetchConsent = useCallback(
    async (overrideParams = {}) => {
      try {
        setIsLoading(true);
        setError(null);
        const finalParams = { ...params, ...overrideParams };
        const apiParams = {
          ...finalParams,
        };
        const response = await consentService.getConsent(apiParams);

        const data = formatproductData(response.data);

        setConsent(data);
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
        console.error("Error fetching consent:", err);

        setError(err.message);
        setConsent([]);

        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [params, formatproductData],
  );

  const fetchConsentById = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await consentService.getConsentByid(id);

        setConsent(response);
        setPagination(
          response.pagination || {
            currentPage: 1,
            pageSize: 10,
            totalPages: 1,
            totalItems: 0,
          },
        );

        return { success: true, data: response };
      } catch (err) {
        console.error("Error fetching consent:", err);

        setError(err.message);
        setConsent([]);

        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [params],
  );

  const createProduct = useCallback(async (data) => {
    let toastId;
    try {
      setIsSubmitting(true);
      setError(null);
      toastId = toast.loading("Creating new consent...");

      const response = await consentService.insertProducts(data);
      toast.success("consent added successfully!", { id: toastId });

      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error creating consent:", err);
      toast.error(err.message || "Failed to create consent", { id: toastId });
      setError(err.message);

      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const editProduct = useCallback(async (id, data) => {
    if (!id) return;
    let toastId;
    try {
      setIsSubmitting(true);
      setError(null);
      toastId = toast.loading("Updating consent details...");
      const response = await consentService.editProduct(id, data);
      toast.success("consent updated successfully", { id: toastId });

      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error updating consent:", err);
      toast.error(err.message || "Failed to update approval", {
        id: toastId,
      });
      setError(err.message);

      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const deleteConsent = useCallback(async (id) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      setError(null);

      await consentService.deleteById(id);
      toast.success("consent deleted successfully");

      setConsent((prev) => prev.filter((item) => item.customerid !== id));

      return { success: true };
    } catch (err) {
      console.error("Error deleting consent:", err);
      toast.error(err.message);
      setError(err.message);

      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onSearch = useCallback(
    async (searchTerm) => {
      const newParams = { ...params, searchTerm };
      setParams(newParams);

      return await fetchConsent({ searchTerm, page: 1 });
    },
    [fetchConsent, setParams, params],
  );

  const onPageChange = useCallback(
    async (page) => {
      const newParams = { ...params, page };

      setParams(newParams);
      return await fetchConsent({ page });
    },
    [params, fetchConsent],
  );

  const onPageSizeChange = useCallback(
    async (pageSize) => {
      const newParams = { ...params, pageSize, page: 1 };
      setParams(newParams);
      return await fetchConsent({ pageSize, page: 1 });
    },
    [params, fetchConsent],
  );

  const onFilterChange = useCallback(
    async (filters) => {
      const newParams = {
        ...params,
        subject: filters.subject || null,

        page: 1,
      };
      setParams(newParams);
      return await fetchConsent({
        subject: filters.subject || null,
        page: 1,
      });
    },
    [params, fetchConsent],
  );

  return {
    fetchConsent,
    fetchConsentById,
    editProduct,
    onPageChange,
    onPageSizeChange,
    createProduct,
    deleteConsent,
    onSearch,
    onFilterChange,
    isSubmitting,
    consent,
    isLoading,
    error,
    pagination,
    params,
    setParams,
  };
};
