import React from 'react';
import styles from './Pagination.module.scss';

function getPageNumbers(currentPage, totalPages) {
  const pages = [];
  const delta = 1;

  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);
  pages.push(1);

  if (rangeStart > 2) {
    pages.push('...');
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (rangeEnd < totalPages - 1) {
    pages.push('...');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

function Pagination({pagination, currentPage, onPageChange}) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const {totalPages, total} = pagination;
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Product pagination">
      <span className={styles.info}>
        {total} product{total !== 1 ? 's' : ''} found
      </span>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          &#8249;
        </button>

        {pages.map((p, idx) =>
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
              &hellip;
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={`${styles.pageButton} ${
                p === currentPage ? styles.active : ''
              }`}
              onClick={() => onPageChange(p)}
              aria-current={p === currentPage ? 'page' : undefined}
              aria-label={`Page ${p}`}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          className={styles.arrow}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          &#8250;
        </button>
      </div>
    </nav>
  );
}

export default React.memo(Pagination);
