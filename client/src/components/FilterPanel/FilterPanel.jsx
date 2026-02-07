import React, {useState} from 'react';
import {RATING_OPTIONS} from '../../constants';
import styles from './FilterPanel.module.scss';

function FilterPanel({
                       filterOptions,
                       filters,
                       onFilterChange,
                       onReset,
                       hasActiveFilters,
                     }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!filterOptions) return null;

  const {categories, brands, priceRange} = filterOptions;

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <button
          type="button"
          className={styles.mobileToggle}
          onClick={toggleMobile}
          aria-expanded={mobileOpen}
          aria-label="Toggle filters"
        >
          {mobileOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className={`${styles.body} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="filter-category">
            Category
          </label>
          <select
            id="filter-category"
            className={styles.select}
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="filter-brand">
            Brand
          </label>
          <select
            id="filter-brand"
            className={styles.select}
            value={filters.brand}
            onChange={(e) => onFilterChange('brand', e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Price Range</label>
          <div className={styles.priceInputs}>
            <input
              type="number"
              className={styles.input}
              placeholder={`Min ($${priceRange.min})`}
              value={filters.minPrice}
              min={priceRange.min}
              max={priceRange.max}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              aria-label="Minimum price"
            />
            <span className={styles.priceSeparator}>&ndash;</span>
            <input
              type="number"
              className={styles.input}
              placeholder={`Max ($${priceRange.max})`}
              value={filters.maxPrice}
              min={priceRange.min}
              max={priceRange.max}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              aria-label="Maximum price"
            />
          </div>
        </div>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="filter-rating">
            Minimum Rating
          </label>
          <select
            id="filter-rating"
            className={styles.select}
            value={filters.minRating}
            onChange={(e) => onFilterChange('minRating', e.target.value)}
          >
            {RATING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            className={styles.resetButton}
            onClick={onReset}
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  );
}

export default React.memo(FilterPanel);
