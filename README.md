# Projet Tinder pour Animaux 🐾

Une application web inspirée de Tinder, permettant de parcourir et d'interagir avec des fiches d'animaux à adopter.

---

## Technologies utilisées

### Front-end
- **React** : Bibliothèque pour créer l'interface utilisateur.
- **React-Router-Dom** : Gestion de la navigation entre les différentes pages.
- **Framer-Motion** : Ajout d'animations fluides et modernes.
- **Lucide-React** : Icônes pour les actions (like, pass, super like).
- **CSS Modules** : Styles modulaires pour une gestion isolée des styles.

### Back-end
- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **Express.js** : Framework pour gérer les routes et les APIs REST.
- **MongoDB** : Base de données NoSQL pour stocker les données des animaux et des utilisateurs.

---

## Fonctionnalités

### Swipe pour interagir
- **Swipe vers la droite** : Indiquer que vous aimez un animal.
- **Swipe vers la gauche** : Passer à l'animal suivant.
- **Swipe vers le haut** : Super like pour indiquer un intérêt particulier.

### Parcours des animaux
- Récupération et affichage des données des animaux depuis une API.

### Gestion des utilisateurs
- Authentification avec des jetons JWT.
- Déconnexion facile via un bouton dédié.

---

## Installation et lancement

### Prérequis
- Node.js (>= 14.x)
- MongoDB

### Étapes
1. Clonez le dépôt :
   ```bash
   git clone https://gitlab.com/<votre-depot>.git
   cd <votre-depot>

2. Ouvez le fichier server.js dans le répertoire backend :
   changez cette ligne : const uri = 'mongodb+srv://<password>@bdd-tinder.txtkf.mongodb.net/?retryWrites=true&w=majority&appName=bdd-tinder'; afin de le connecter à votre propre base de donnée

3. Une fois l'application lancée, il est conseillé de commencer par s'inscrire en tant qu'organisation, puis d'ajouter quelques animaux afin de peupler la base de données et tester les fonctionnalités de l'application.