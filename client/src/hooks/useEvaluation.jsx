import { consentService } from "@/services/consentService";
import { useState, useCallback } from "react";
import { evaluationService } from "@/services/evaluationService";
import toast from "react-hot-toast";
export const useEvaluation = () => {
  const [evaluation, setEvaluation] = useState([]);

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

        setEvaluation(data);
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
        console.error("Error fetching evaluation:", err);

        setError(err.message);
        setEvaluation([]);

        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [params, formatproductData],
  );

  const fetchEvaluationById = useCallback(
    async (overrideParams = {}) => {
      try {
        setIsLoading(true);
        setError(null);

        const finalParams = { ...params, ...overrideParams };
        const apiParams = {
          ...finalParams,
        };

        const response = await evaluationService.getEvaluationData(apiParams);

        const data = formatproductData(response.data);

        setEvaluation(data);
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
        console.error("Error fetching evaluation:", err);

        setError(err.message);
        setEvaluation([]);

        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [params, formatproductData],
  );

  const addEvaluation = useCallback(async (id, data) => {
    let toastId;
    try {
      setIsSubmitting(true);
      setError(null);
      toastId = toast.loading("Creating new evaluation...");

      const response = await evaluationService.addEvaluation(id, data);
      toast.success("evaluation added successfully!", { id: toastId });

      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error creating evaluation:", err);
      toast.error("Failed to create evaluation", {
        id: toastId,
      });
      setError(err.message);

      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const updateEvaluation = useCallback(async (evaluationId, data) => {
    if (!evaluationId) return;
    let toastId;
    try {
      setIsSubmitting(true);
      setError(null);
      toastId = toast.loading("Updating evaluation details...");

      console.log("evaluation id", evaluationId, data);

      const response = await evaluationService.updateEvaluation(
        evaluationId,
        data,
      );
      toast.success("evaluation updated successfully", { id: toastId });

      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error updating evaluation:", err);
      toast.error(err.message || "Failed to update approval", {
        id: toastId,
      });
      setError(err.message);

      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const deleteEvaluation = useCallback(async (id) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      setError(null);

      await evaluationService.deleteEvaluationData(id);
      toast.success("evaluation deleted successfully");

      setEvaluation((prev) => prev.filter((item) => item.evaluation_id !== id));

      return { success: true };
    } catch (err) {
      console.error("Error deleting evaluation:", err);
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
      return await fetchEvaluationById({ page });
    },
    [params, fetchEvaluationById],
  );

  const onPageSizeChange = useCallback(
    async (pageSize) => {
      const newParams = { ...params, pageSize, page: 1 };
      setParams(newParams);
      return await fetchEvaluationById({ pageSize, page: 1 });
    },
    [params, fetchEvaluationById],
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
    fetchEvaluationById,
    onPageChange,
    onPageSizeChange,
    onSearch,
    onFilterChange,
    isSubmitting,
    evaluation,
    isLoading,
    error,
    pagination,
    params,
    setParams,
    deleteEvaluation,
    addEvaluation,
    updateEvaluation,
  };
};
