import { apiClient } from "@/lib/api/client";
import type { Product, PaginatedResponse, ApiResponse } from "@/types";

interface ProductFilters {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
  isOrganic?: boolean;
}

export const productService = {
  getAll: (filters: ProductFilters = {}) =>
    apiClient.get<PaginatedResponse<Product>>("/products", { params: filters as Record<string, string | number> }),

  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Product>>(`/products/${slug}`),

  getFeatured: () =>
    apiClient.get<ApiResponse<Product[]>>("/products/featured"),
};
