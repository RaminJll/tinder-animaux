import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/users/loginPage.module.css'; // Assurez-vous d'ajouter ce fichier CSS

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/users/auth/login', { email, password });
            localStorage.setItem('token', res.data.token); // Sauvegarder le jeton JWT
            setMessage('Connexion réussie !');
            navigate('/userHome');
        } catch (error) {
            if (error.response) {
                setMessage(`Erreur : ${error.response.data.message}`);
            } else {
                setMessage('Erreur lors de la connexion.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.logo}>Connexion</h2>
            {message && <p className={styles.message}>{message}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className={`${styles.btn} ${styles.createAccount}`}>
                    Se connecter
                </button>
            </form>
        </div>
    );
};

export default Login;
