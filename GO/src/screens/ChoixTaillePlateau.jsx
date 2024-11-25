import { useState } from "react";
import { Link } from "react-router-dom";
import BarreTaille from "../components/BarreTaille.jsx";

const ChoixTaillePlateau = () => {
    const [tailleSelect, setTailleSelect] = useState(19);

    return (
        <div className="container choixTaillePlateau">
            <h2>Définissez la taille du plateau</h2>
            <p>Taille sélectionnée : {tailleSelect}</p>
            <div className="bar-container">
                <BarreTaille tailleSelect={tailleSelect} setTailleSelect={setTailleSelect} />
            </div>
            <Link className="button" to="Jeu" state={{ tailleSelect }}>Confirmer</Link>
        </div>
    );
};

export default ChoixTaillePlateau;
