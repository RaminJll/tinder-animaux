import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Pour les animations
import { Heart, X, ArrowUp } from 'lucide-react'; // Icônes pour les actions
import axios from 'axios'; // Pour les appels API
import styles from '../../styles/users/home.module.css';
import { useNavigate } from "react-router-dom"; // Pour la navigation

const AnimalSwipeCard = () => {
  const navigate = useNavigate(); // Gestion de la navigation

  // États pour gérer les animaux, l'index actuel, la direction du swipe, le chargement, et les erreurs
  const [animals, setAnimals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Chargement des données des animaux depuis l'API
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/animals/all');
        setAnimals(response.data); // Mise à jour de la liste des animaux
        setLoading(false); // Fin du chargement
      } catch (error) {
        setError('Erreur lors du chargement des animaux'); // Gestion des erreurs
        setLoading(false);
      }
    };

    fetchAnimals(); // Appel initial
  }, []);

  // Fonction pour déconnecter l'utilisateur et rediriger vers la page de connexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Gestion du swipe (droite : like, gauche : pass, haut : super like)
  const onDragEnd = (event, info) => {
    const swipeThreshold = 100; // Seuil pour détecter un swipe
    const { x, y } = info.offset;

    if (Math.abs(x) > swipeThreshold) {
      x > 0 ? handleLike() : handlePass(); // Swipe à droite ou gauche
      setDirection(x > 0 ? 'right' : 'left');
    } else if (y < -swipeThreshold) {
      handleSuperLike(); // Swipe vers le haut
      setDirection('up');
    }
  };

  // Actions pour chaque type de swipe
  const handleLike = () => {
    console.log('Liked:', animals[currentIndex]);
    nextAnimal();
  };

  const handlePass = () => {
    console.log('Passed:', animals[currentIndex]);
    nextAnimal();
  };

  const handleSuperLike = () => {
    console.log('Super Liked:', animals[currentIndex]);
    nextAnimal();
  };

  // Passer à l'animal suivant
  const nextAnimal = () => {
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDirection(null); // Réinitialisation de la direction
    }, 200); // Pause pour laisser l'animation se terminer
  };

  // Gestion des états d'affichage (chargement, erreur, ou fin des animaux)
  if (loading) return <div className={styles.container}>Chargement en cours...</div>;
  if (error) return <div className={styles.container}>{error}</div>;
  if (currentIndex >= animals.length) return <div className={styles.container}>Plus d'animaux disponibles!</div>;

  // Récupération de l'animal actuel
  const currentAnimal = animals[currentIndex];

  return (
    <div className={styles.container}>
      {/* Bouton de déconnexion */}
      <button className={styles.logoutButton} onClick={handleLogout}>
        Déconnexion
      </button>

      {/* Carte de l'animal actuel avec animation */}
      <div className={styles.cardContainer}>
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={onDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
              y: direction === 'up' ? -300 : 0,
              opacity: 0,
              scale: 0.5
            }}
            transition={{ duration: 0.2 }}
            className={styles.card}
          >
            <div className={styles.cardInner}>
              <img
                src={currentAnimal.imageUrl || "/api/placeholder/400/400"}
                alt={currentAnimal.name}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{currentAnimal.name}</h2>
                <p className={styles.cardDescription}>{currentAnimal.description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Boutons pour passer, super liker ou liker */}
      <div className={styles.buttonContainer}>
        <button onClick={handlePass} className={`${styles.actionButton} ${styles.passButton}`}>
          <X className={styles.actionIcon} />
        </button>
        <button onClick={handleSuperLike} className={`${styles.actionButton} ${styles.superLikeButton}`}>
          <ArrowUp className={styles.actionIcon} />
        </button>
        <button onClick={handleLike} className={`${styles.actionButton} ${styles.likeButton}`}>
          <Heart className={styles.actionIcon} />
        </button>
      </div>
    </div>
  );
};

export default AnimalSwipeCard;
