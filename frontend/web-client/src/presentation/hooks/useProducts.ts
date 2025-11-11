import { useCallback, useEffect, useState } from "react";
import { productService } from "../../services/productService";
import type { EnrichedInventoryItem } from "../../types/Inventory";
import type { CreateProductPayload } from "../../types/product";

export function useProducts() {
  const [items, setItems] = useState<EnrichedInventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getEnrichedInventories();
      setItems(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const createProduct = useCallback(
    async (payload: CreateProductPayload) => {
      setLoading(true);
      setError(null);
      try {
        const res = await productService.createProduct(payload);
        // refresh list after successful creation
        await fetch();
        return res;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetch]
  );

  return {
    items,
    loading,
    error,
    refresh: fetch,
    createProduct,
  } as const;
}
