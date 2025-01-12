import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../../styles/organizations/home.module.css";
import { useNavigate } from "react-router-dom";

// Page d'accueil des organisations liste de tous les animaux qu'ils possedent
const Home = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    // Récupérer les animaux depuis l'API
    const fetchAnimals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/organizations/animals/organizationAnimal', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setAnimals(response.data);
      } catch (error) {
        if (error.response) {
          setMessage(`Erreur : ${error.response.data.message}`);
        } else {
          setMessage('Erreur lors de la connexion.');
        }
      }
    };
    fetchAnimals();
  }, []);  // Se lance une seule fois au chargement du composant

  const handleLogout = () => {
    localStorage.removeItem("token"); // Suppression du jeton JWT
    navigate("/"); // Redirection vers la page de connexion
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Déconnexion
        </button>
        <h1>Petfy</h1>
        <div className={styles.account}>
          <h2>Spa de Rouen</h2>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.animalsSection}>
          <h2>Mes animaux</h2>
          <div className={styles.animalsGrid}>
            {animals.length > 0 ? (
              animals.map((animal) => (
                <div key={animal._id} className={styles.animalCard}>
                  <img
                    src={animal.imageUrl} // URL de l'image de l'animal
                    alt={animal.name}
                    className={styles.animalImg}
                  />
                  <p>{animal.name}</p>
                </div>
              ))
            ) : (
              <p>Aucun animal trouvé.</p>
            )}
            <button className={styles.addAnimalBtn} onClick={() => navigate('/organizationAddAnimal')}>Ajouter un animal</button>
          </div>
        </section>

        <section className={styles.messagesSection}>
          <h2>Quel message veux-tu faire apparaître lors d’un match ?</h2>
          {animals.length > 0 ? (
            animals.map((animal) => (
              <div key={animal._id} className={styles.messageCard}>
                <p>{animal.description}</p>
              </div>
            ))
          ) : (
            <p>Aucun animal trouvé.</p>
          )}

        </section>
      </main>

      <nav className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={() => navigate("/organizationHome")}
        >
          Home
        </button>
        <button className={styles.navButton}>Discussion</button>
      </nav>
    </div>
  );
};

export default Home;
