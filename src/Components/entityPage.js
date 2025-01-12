import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/entityPage.module.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.logo}>Petfy</h1>
      </div>
      <div>
        <h2 className={styles.tagline}>
          Prêt à rencontrer ton nouveau compagnon de vie ?
        </h2>
      </div>
      <div>
        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${styles.createAccount}`}
            onClick={() => navigate('/organizationPage')}
          >
            Organisation
          </button>

          <button
            className={`${styles.btn} ${styles.login}`}
            onClick={() => navigate('/userPage')}
          >
            Utilisateur
          </button>
        </div>
        <p className={styles.footerText}>
          En cliquant sur "Organisation" ou "Utilisateur", vous acceptez nos conditions d'utilisation.
          Pour plus d'informations sur le traitement de vos données, consultez notre
          politique de confidentialité et notre politique sur les cookies.
        </p>
      </div>
    </div>
  );
}

export default Home;
