import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

function ProductList({products}) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>&#128269;</span>
        <h3>No products found</h3>
        <p>Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  );
}

export default React.memo(ProductList);
