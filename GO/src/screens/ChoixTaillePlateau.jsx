import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import BarreTaille from "../components/BarreTaille.jsx";
import Plateau from "../components/Plateau.jsx";
import BoutonMaison from "../components/BoutonMenu.jsx";
import * as commande from "../services/gnugoGTP.jsx";

const ChoixTaillePlateau = () => {
    const location = useLocation();
    const [tailleSelect, setTailleSelect] = useState(() => {
        const sauvegardeTailleSelect = localStorage.getItem("tailleSelect");
        return sauvegardeTailleSelect ? Number(sauvegardeTailleSelect) : 19;
    });
    const [couleur] = useState(location.state?.campJoueurSolo || "noir");
    const [nbJoueurs] = useState(location.state?.nbJoueurs || 1);
    const [campJoueurSolo] = useState(location.state?.campJoueurSolo);
    // Sauvegarde pour garder le choix précedent
    useEffect(() => {
        localStorage.setItem("tailleSelect", tailleSelect);
    }, [tailleSelect]);
    const lancerNouvellePartie = () => {
        commande.setBoardSize(tailleSelect);
        commande.clearBoard();
        localStorage.clear(); // On réinitialise toutes les données qu'on a sauvegarder car c'est une nouvelle partie
        localStorage.setItem("tailleSelect", tailleSelect);
    }
    return (
        <div className={`container choixTaillePlateau ${couleur}`}>
            <BoutonMaison couleur={couleur}/>
            <h2>Définissez la taille du plateau</h2>
            <Plateau taille={tailleSelect}/>
            <p>Taille sélectionnée : {tailleSelect}</p>
            <BarreTaille tailleSelect={tailleSelect} setTailleSelect={setTailleSelect}/>
            <Link className="button" to="/Jeu" state={{tailleSelect, nbJoueurs, couleur, campJoueurSolo}}
                  onClick={() => lancerNouvellePartie()}>Confirmer</Link>
        </div>
    );
};

export default ChoixTaillePlateau;
