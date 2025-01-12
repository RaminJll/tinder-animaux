import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/organizations/addAnimal.module.css';

//Page pour ajouter des animaux, accessible que par des organisations
const AddAnimal = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [euthanasie, setEuthanasie] = useState(false);
    const [gender, setGender] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const animalData = {
                name,
                age,
                race,
                euthanasie,
                gender,
                description,
                imageUrl,
            };

            const res = await axios.post(
                'http://localhost:5000/organizations/animals/add',
                animalData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage('Animal ajouté avec succès !');
        } catch (error) {
            if (error.response) {
                setMessage(`Erreur : ${error.response.data.message}`);
            } else {
                setMessage('Erreur lors de l\'ajout de l\'animal.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.logo}>Ajouter un animal</h2>
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

                <label htmlFor="age" className={styles.label}>Âge</label>
                <select
                    className={styles.input}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez un âge</option>
                    <option value="jeune">Jeune</option>
                    <option value="adulte">Adulte</option>
                    <option value="senior">Senior</option>
                </select>

                <label htmlFor="race" className={styles.label}>Race</label>
                <select
                    className={styles.input}
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez une race</option>
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


                <label htmlFor="gender" className={styles.label}>Genre</label>
                <select
                    className={styles.input}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez un genre</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
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

                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea
                    className={styles.threeInput}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="imageUrl" className={styles.label}>URL de l'image</label>
                <input
                    className={styles.threeInput}
                    type="text"
                    placeholder="URL de l'image"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <button className={`${styles.btn} ${styles.createAccount}`} type="submit">
                    Ajouter l'animal
                </button>
            </form>
        </div>
    );
};

export default AddAnimal;
