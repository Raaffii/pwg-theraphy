import { productsService } from "@/services/productsService";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
export const useProduct = () => {
  const [product, setProduct] = useState([]);

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
      id: item.productId,
    }));
  }, []);

  const fetchProduct = useCallback(
    async (overrideParams = {}) => {
      try {
        setIsLoading(true);
        setError(null);
        const finalParams = { ...params, ...overrideParams };
        const apiParams = {
          ...finalParams,
        };
        const response = await productsService.getProducts(apiParams);

        const data = formatproductData(response.data);

        setProduct(data);
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
        console.error("Error fetching product:", err);

        setError(err.message);
        setProduct([]);

        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [params, formatproductData],
  );

  const createProduct = useCallback(async (data) => {
    let toastId;
    try {
      setIsSubmitting(true);
      setError(null);
      toastId = toast.loading("Creating new product...");

      const response = await productsService.insertProducts(data);
      toast.success("Product added successfully!", { id: toastId });

      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error(err.message || "Failed to create product", { id: toastId });
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
      toastId = toast.loading("Updating product details...");
      const response = await productsService.editProduct(id, data);
      toast.success("product updated successfully", { id: toastId });

      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error(err.message || "Failed to update approval", {
        id: toastId,
      });
      setError(err.message);

      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await productsService.deleteProduct(id);

      console.log("ceceecce", result);
      toast.success("Product deleted successfully");

      setProduct((prev) => prev.filter((item) => item.productid !== id));

      return { success: true };
    } catch (err) {
      console.error("Error deleting product:", err);

      const errorMessage =
        err.response?.data?.message || "Failed to delete product";

      toast.error(errorMessage);
      setError(errorMessage);

      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const onSearch = useCallback(
    async (searchTerm) => {
      const newParams = { ...params, searchTerm };
      setParams(newParams);

      return await fetchProduct({ searchTerm, page: 1 });
    },
    [fetchProduct, setParams, params],
  );

  const onPageChange = useCallback(
    async (page) => {
      const newParams = { ...params, page };

      setParams(newParams);
      return await fetchProduct({ page });
    },
    [params, fetchProduct],
  );

  const onPageSizeChange = useCallback(
    async (pageSize) => {
      console.log("pagesize", pageSize);
      const newParams = { ...params, pageSize, page: 1 };
      setParams(newParams);
      return await fetchProduct({ pageSize, page: 1 });
    },
    [params, fetchProduct],
  );

  const onFilterChange = useCallback(
    async (filters) => {
      const newParams = {
        ...params,
        subject: filters.subject || null,

        page: 1,
      };
      setParams(newParams);
      return await fetchProduct({
        subject: filters.subject || null,
        page: 1,
      });
    },
    [params, fetchProduct],
  );

  return {
    fetchProduct,
    editProduct,
    onPageChange,
    onPageSizeChange,
    createProduct,
    deleteProduct,
    onSearch,
    onFilterChange,
    isSubmitting,
    product,
    isLoading,
    error,
    pagination,
    params,
    setParams,
  };
};
