import { customerService } from "@/services/customerService";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
export const useCustomer = () => {
  const [customer, setCustomer] = useState([]);

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

  const fetchCustomer = useCallback(
    //not yet ####################################3
    async (overrideParams = {}) => {
      try {
        setIsLoading(true);
        setError(null);
        const finalParams = { ...params, ...overrideParams };
        const apiParams = {
          ...finalParams,
        };
        // const response = await CustomerService.getCustomer(apiParams);

        const data = formatproductData(response.data);

        setCustomer(data);
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
        console.error("Error fetching Customer:", err);

        setError(err.message);
        setCustomer([]);

        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [params, formatproductData],
  );

  const fetchCustomerDataById = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await customerService.getCustomerDataById(id);

        setCustomer(response);
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
        console.error("Error fetching Customer:", err);

        setError(err.message);
        setCustomer([]);

        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [params],
  );

  const createCustomer = useCallback(async (id, data) => {
    let toastId;
    try {
      setIsSubmitting(true);
      setError(null);
      toastId = toast.loading("Creating new Customer...");

      const response = await customerService.createCustomer(id, data);
      toast.success("Customer added successfully!", { id: toastId });

      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error creating Customer:", err);
      toast.error(err.message || "Failed to create Customer", { id: toastId });
      setError(err.message);

      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const updateCustomer = useCallback(async (id, data) => {
    if (!id) return;
    let toastId;
    try {
      setIsSubmitting(true);
      setError(null);
      toastId = toast.loading("Updating Customer details...");
      const response = await customerService.updateCustomer(id, data);
      toast.success("Customer updated successfully", { id: toastId });

      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error updating Customer:", err);
      toast.error(err.message || "Failed to update approval", {
        id: toastId,
      });
      setError(err.message);

      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  //   const deleteCustomer = useCallback(async (id) => {
  //     if (!id) return;

  //     try {
  //       setIsSubmitting(true);
  //       setError(null);

  //       await CustomerService.deleteById(id);
  //       toast.success("Customer deleted successfully");

  //       setCustomer((prev) => prev.filter((item) => item.customerid !== id));

  //       return { success: true };
  //     } catch (err) {
  //       console.error("Error deleting Customer:", err);
  //       toast.error(err.message);
  //       setError(err.message);

  //       return { success: false, error: err.message };
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, []);

  const onSearch = useCallback(
    async (searchTerm) => {
      const newParams = { ...params, searchTerm };
      setParams(newParams);

      return await fetchCustomer({ searchTerm, page: 1 });
    },
    [fetchCustomer, setParams, params],
  );

  const onPageChange = useCallback(
    async (page) => {
      const newParams = { ...params, page };

      setParams(newParams);
      return await fetchCustomer({ page });
    },
    [params, fetchCustomer],
  );

  const onPageSizeChange = useCallback(
    async (pageSize) => {
      const newParams = { ...params, pageSize, page: 1 };
      setParams(newParams);
      return await fetchCustomer({ pageSize, page: 1 });
    },
    [params, fetchCustomer],
  );

  const onFilterChange = useCallback(
    async (filters) => {
      const newParams = {
        ...params,
        subject: filters.subject || null,

        page: 1,
      };
      setParams(newParams);
      return await fetchCustomer({
        subject: filters.subject || null,
        page: 1,
      });
    },
    [params, fetchCustomer],
  );

  return {
    fetchCustomer,
    fetchCustomerDataById,
    updateCustomer,
    onPageChange,
    onPageSizeChange,
    createCustomer,

    onSearch,
    onFilterChange,
    isSubmitting,
    customer,
    isLoading,
    error,
    pagination,
    params,
    setParams,
  };
};
