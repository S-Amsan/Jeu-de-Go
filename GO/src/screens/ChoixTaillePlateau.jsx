import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BarreTaille from "../components/BarreTaille.jsx";
import Plateau from "../components/Plateau.jsx";
import BoutonMaison from "../components/BoutonMenu.jsx";

const ChoixTaillePlateau = () => {
    const location = useLocation();
    const [tailleSelect, setTailleSelect] = useState(19);
    const [couleur] = useState(location.state?.couleur || "blanc");

    return (
        <div className={`container choixTaillePlateau ${couleur}`}>
            <BoutonMaison couleur={couleur} />
            <h2>Définissez la taille du plateau</h2>
            <Plateau taille={tailleSelect} estJouable={false}/>
            <p>Taille sélectionnée : {tailleSelect}</p>
            <BarreTaille tailleSelect={tailleSelect} setTailleSelect={setTailleSelect} />
            <Link className="button" to="Jeu" state={{ tailleSelect }}>Confirmer</Link>
        </div>
    );
};

export default ChoixTaillePlateau;
