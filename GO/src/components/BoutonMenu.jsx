import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import maisonBlanche from '../images/maison blanche.png';
import maisonNoire from '../images/maison noire.png';
import '../css/style.css';

const BoutonMaison = () => {
    const location = useLocation();

    const getImage = () => {
        switch (location.pathname) {
            case '/NbJoueurs/ChoixCamp/ChoixTaillePlateau':
                return maisonBlanche;
            default:
                return maisonNoire;
        }
    };

    const image = getImage();

    return (
        <Link to="/" className="maison-bouton">
            <img
                src={image}
                alt="Retour Menu"
                className="maison-image"
            />
        </Link>
    );
};

export default BoutonMaison;
