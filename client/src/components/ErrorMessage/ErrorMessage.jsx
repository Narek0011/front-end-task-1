import React from 'react';
import styles from './ErrorMessage.module.scss';

function ErrorMessage({message, onRetry}) {
  return (
    <div className={styles.wrapper} role="alert">
      <span className={styles.icon}>!</span>
      <h3 className={styles.title}>Something went wrong</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default React.memo(ErrorMessage);
