import apiClient from "./axios";

export interface Category {
  name: string;
  type: "income" | "expense";
  icon: string;
  color: string;
  description: string;
}

export interface CategoryUpdate {
    name?: string;
    type?: "income" | "expense";
    description?: string;
    icon?: string;
    color?: string;
}

export interface createCategoryBody {
    name: string;
    type: "income" | "expense";
    icon: string;
    color: string;
    description?: string;
}

const getCategories = async () => {
    const response = await apiClient.get("/categories");
    return response.data.data || response.data;
}

const getCategoryById = async (id: number) => {
    const response = await apiClient.get(`/categories/${id}`)
    return response.data.data || response.data;
}

const createCategory = async (category: createCategoryBody) => {
  const response = await apiClient.post("/categories", category);
  return response.data;
};

const updateCategoryById = async (id: number , categoryUpdate : CategoryUpdate) => {
    const response = await apiClient.put(`/categories/${id}`, categoryUpdate);
    return response.data.data || response.data;
}

const deleteCategory = async (id: number) => {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
}



export { getCategories,getCategoryById, createCategory, updateCategoryById, deleteCategory };