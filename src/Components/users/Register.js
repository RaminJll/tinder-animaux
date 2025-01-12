import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/users/registerPage.module.css';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [recherche, setRecherche] = useState('');
    const [ageAnimal, setAgeAnimal] = useState('');
    const [euthanasie, setEuthanasie] = useState('');
    const [genderAnimal, setGenderAnimal] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/users/auth/register', {
                email, password, name, recherche, ageAnimal, euthanasie, genderAnimal
            });
            localStorage.setItem('token', res.data.token); // Sauvegarder le jeton JWT
            setMessage('Inscription réussie !');
            navigate('/userHome');
        } catch (error) {
            // Affichez le message exact de l'erreur
            if (error.response) {
                setMessage(`Erreur : ${error.response.data.message}`);
            } else {
                setMessage('Erreur lors de l’inscription.');
            }
        }
    };


    return (
        <div className={styles.container}>
            <h2 className={styles.logo}>Inscription</h2>
            {message && <p className={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="name" className={styles.label}>Nom</label>
                <input
                    className={styles.threeInput}
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                    className={styles.threeInput}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password" className={styles.label}>Mot de passe</label>
                <input
                    className={styles.threeInput}
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="recherche" className={styles.label}>Quels races d'animal souhaitez-vous adopter ?</label>
                <select
                    className={styles.input}
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez une catégorie</option>
                    <optgroup label="Mammifères">
                        <option value="chien">Chien</option>
                        <option value="chat">Chat</option>
                        <option value="hamster">Hamster</option>
                        <option value="lapin">Lapin</option>
                    </optgroup>
                    <optgroup label="Poissons">
                        <option value="guppy">Guppy</option>
                        <option value="discus">Discus</option>
                        <option value="ramirezi">Ramirezi</option>
                        <option value="platy">Platy</option>
                    </optgroup>
                    <optgroup label="Oiseaux">
                        <option value="psittaciformes">Psittaciformes</option>
                        <option value="conures">Conures</option>
                        <option value="amazone">Amazone</option>
                        <option value="lori">Lori</option>
                    </optgroup>
                </select>

                <label htmlFor="ageAnimal" className={styles.label}>Âge de l'animal à adopter</label>
                <select
                    className={styles.input}
                    value={ageAnimal}
                    onChange={(e) => setAgeAnimal(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez un âge</option>
                    <option value="jeune">Jeune</option>
                    <option value="adulte">Adulte</option>
                    <option value="senior">Senior</option>
                </select>

                <label htmlFor="euthanasie" className={styles.label}>En urgence euthanasie ?</label>
                <select
                    className={styles.input}
                    value={euthanasie}
                    onChange={(e) => setEuthanasie(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez une option</option>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                </select>

                <label htmlFor="genderAnimal" className={styles.label}>J'aimerais adopter :</label>
                <select
                    className={styles.input}
                    value={genderAnimal}
                    onChange={(e) => setGenderAnimal(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez un genre</option>
                    <option value="male">Un mâle</option>
                    <option value="female">Une femelle</option>
                </select>

                <button className={`${styles.btn} ${styles.createAccount}`} type="submit">
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default Register;
