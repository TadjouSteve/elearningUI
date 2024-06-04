import React from 'react';
import './Error404Page.css'; // Importer le fichier CSS pour les styles personnalisés

import { Link } from 'react-router-dom';

const Error404Page = () => {
    return (
        <div className="error-page">
            <h1 className="error-heading">Erreur 404</h1>
            <p className="error-message">Désolé, la page que vous recherchez est introuvable.</p>
            <p className="error-message">Veuillez vérifier l'URL ou revenir à la <Link to="/home">page d'accueil</Link>.</p>
        </div>
    );
};

export default Error404Page;
/* FILEPATH: /f:/workflow/IRI/programedes1000/elearning/src/pages/404ErrorPage/Error404Page.css */

