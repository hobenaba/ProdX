import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  isLoading: true,
  createProduct: async (product) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Created The Product Successffully." };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    if (data.success) set({ products: data.data, isLoading: false });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? data.data : product
      ),
    }));
    return { success: true, message: "Updated The Product Successffully." };
  },
}));
