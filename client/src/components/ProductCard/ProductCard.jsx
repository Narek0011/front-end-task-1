import React from 'react';
import styles from './ProductCard.module.scss';

function ProductCard({product}) {
  const {name, category, brand, price, rating, imageUrl} = product;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={`${imageUrl}?random=${product.id}`}
          alt={name}
          className={styles.image}
          loading="lazy"
        />
        <span className={styles.category}>{category}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.brand}>{brand}</p>

        <div className={styles.footer}>
          <span className={styles.price}>${price.toFixed(2)}</span>
          <span className={styles.rating}>
            <span className={styles.star}>&#9733;</span>
            {rating}
          </span>
        </div>
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
