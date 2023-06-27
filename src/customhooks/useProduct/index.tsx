import { useEffect, useState } from "react";

interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

function useProduct(query: string, limit: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const searchProduct = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=${limit}`,
          {
            signal: signal,
          }
        );
        const data = await res.json();
        if (data.limit < data.total) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setProducts(data.products);
        setError(false);
      } catch (e) {
        setError(true);
        return e;
      }
    };
    const getAllProduct = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${limit}`,
          {
            signal: signal,
          }
        );
        const data = await res.json();
        if (data.limit < data.total) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setProducts(data.products);
        setError(false);
      } catch (e) {
        setError(true);
        return e;
      }
    };
    if (query) {
      searchProduct();
    } else {
      getAllProduct();
    }
    return () => {
      controller.abort();
    };
  }, [query, limit]);

  return { products, hasMore, error };
}

export default useProduct;
