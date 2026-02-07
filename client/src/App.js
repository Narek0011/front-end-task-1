import React from 'react';
import {useProducts} from './hooks/useProducts';
import {useFilters} from './hooks/useFilters';
import FilterPanel from './components/FilterPanel/FilterPanel';
import ProductList from './components/ProductList/ProductList';
import Pagination from './components/Pagination/Pagination';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import styles from './App.module.scss';

function App() {
  const {
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
  } = useProducts();

  const {
    filterOptions,
    loading: filtersLoading,
    error: filtersError,
  } = useFilters();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>ProductStore</h1>
          <p className={styles.tagline}>
            Browse our collection of quality products
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          <div className={styles.sidebar}>
            {filtersLoading ? (
              <div className={styles.filterLoading}>Loading filters...</div>
            ) : filtersError ? (
              <ErrorMessage message={filtersError} onRetry={handleRetry}/>
            ) : (
              <FilterPanel
                filterOptions={filterOptions}
                filters={filters}
                onFilterChange={updateFilter}
                onReset={resetFilters}
                hasActiveFilters={hasActiveFilters}
              />
            )}
          </div>

          <div className={styles.content}>
            {loading ? (
              <LoadingSpinner/>
            ) : error ? (
              <ErrorMessage message={error} onRetry={handleRetry}/>
            ) : (
              <>
                <ProductList products={products}/>
                <Pagination
                  pagination={pagination}
                  currentPage={page}
                  onPageChange={goToPage}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
