import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/users/registerPage.module.css';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [siret, setSiret] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/organizations/auth/register', {
                email, password, name, address, phone, ville, codePostal, siret
            });
            localStorage.setItem('token', res.data.token);
            setMessage('Inscription réussie !');
            navigate('/organizationHome');
        } catch (error) {
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
                <label htmlFor="siret" className={styles.label}>Numéro de siret</label>
                <input
                    className={styles.threeInput}
                    type="text"
                    placeholder="numéro de siret"
                    value={siret}
                    onChange={(e) => setSiret(e.target.value)}
                    required
                />

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

                <label htmlFor="phone" className={styles.label}>Numéro de téléphone</label>
                <input
                    className={styles.threeInput}
                    type="tel"
                    placeholder="Numéro de téléphone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <label htmlFor="address" className={styles.label}>Adresse</label>
                <input
                    className={styles.threeInput}
                    type="text"
                    placeholder="Adresse"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />

                <label htmlFor="ville" className={styles.label}>Ville</label>
                <input
                    className={styles.threeInput}
                    type="text"
                    placeholder="ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    required
                />

                <label htmlFor="codePostal" className={styles.label}>Code postal</label>
                <input
                    className={styles.threeInput}
                    type="text"
                    placeholder="Code postal"
                    value={codePostal}
                    onChange={(e) => setCodePostal(e.target.value)}
                    required
                />

                <button className={`${styles.btn} ${styles.createAccount}`} type="submit">
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default Register;
