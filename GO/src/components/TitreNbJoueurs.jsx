import {useEffect, useState} from "react";

const TitreNbJoueurs = ({nbJoueurs, couleur, campJoueurSolo, jeuEnCours}) => {
    const getTitre = () => {
        const couleurM = couleur.charAt(0).toUpperCase()+couleur.slice(1).toLowerCase()
        if (nbJoueurs === 1) {
            if (campJoueurSolo === couleur) {
                return "C'est votre tour (" + couleurM +")";
            } else {
                return "Tour de GnuGo (" + couleurM + ")";
            }
        } else if (nbJoueurs === 2) {
            return "Tour du Joueur "+couleurM;
        }
    };

    const titre = getTitre()

    if (jeuEnCours) return <h1 className="title">{titre}</h1>;
    return <div data-aos="flip-left">
        <h1 className="title">La partie est terminé !</h1>
        <h2 className="animation-chargement">Calcul du résultat en cours</h2>
    </div>;
};

export default TitreNbJoueurs;
