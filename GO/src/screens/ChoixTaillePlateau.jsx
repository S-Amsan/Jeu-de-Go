import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BarreTaille from "../components/BarreTaille.jsx";
import Plateau from "../components/Plateau.jsx";
import BoutonMaison from "../components/BoutonMenu.jsx";
import * as commande from "../services/gnugoGTP.jsx";

const ChoixTaillePlateau = () => {
    const location = useLocation();
    const [tailleSelect, setTailleSelect] = useState(19);
    const [couleur] = useState(location.state?.campJoueurSolo || "noir");
    const [nbJoueurs] = useState(location.state?.nbJoueurs || 1);
    const [campJoueurSolo] = useState(location.state?.campJoueurSolo);
    return (
        <div className={`container choixTaillePlateau ${couleur}`}>
            <BoutonMaison couleur={couleur} />
            <h2>Définissez la taille du plateau</h2>
            <Plateau taille={tailleSelect}/>
            <p>Taille sélectionnée : {tailleSelect}</p>
            <BarreTaille tailleSelect={tailleSelect} setTailleSelect={setTailleSelect} />
            <Link className="button" to="/Jeu" state={{ tailleSelect, nbJoueurs, couleur, campJoueurSolo  }} onClick = {() => commande.setBoardSize(tailleSelect)}>Confirmer</Link>
        </div>
    );
};

export default ChoixTaillePlateau;
