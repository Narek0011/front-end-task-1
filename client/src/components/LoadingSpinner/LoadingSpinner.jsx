import React from 'react';
import styles from './LoadingSpinner.module.scss';

function LoadingSpinner() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading">
      <div className={styles.spinner}/>
      <p className={styles.text}>Loading products...</p>
    </div>
  );
}

export default React.memo(LoadingSpinner);
