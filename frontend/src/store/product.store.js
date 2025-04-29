import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
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
    set((state) => ({ products: { ...state.products, product } }));
    return { success: true, message: "Created a Product Successffully." };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    if (data.success) set({ products: data.data, isLoading: true });
  },
}));
