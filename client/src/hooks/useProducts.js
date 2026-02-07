import {useCallback, useEffect, useState} from 'react';
import {fetchProducts} from '../services/api';
import {INITIAL_FILTERS, PRODUCTS_PER_PAGE} from '../constants';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const params = {
          page,
          limit: PRODUCTS_PER_PAGE,
          ...filters,
        };

        const result = await fetchProducts(params);

        if (!cancelled) {
          setProducts(result.data);
          setPagination(result.pagination);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setProducts([]);
          setPagination(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [filters, page]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({...prev, [key]: value}));
    setPage(1); // Reset to first page when filters change
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  }, []);

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return {
    products,
    pagination,
    filters,
    page,
    loading,
    error,
    updateFilter,
    resetFilters,
    goToPage,
    hasActiveFilters,
  };
}
