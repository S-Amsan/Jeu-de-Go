import { useState } from "react";
import { Link } from "react-router-dom";

const ChoixTaillePlateau = () => {
    const [tailleSelect, setTailleSelect] = useState(19);

    const tailles = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    return (
        <div className="container choixTaillePlateau">
            <h2>Définissez la taille du plateau</h2>
            <p>Taille sélectionnée : {tailleSelect}</p>
            <div className="bar-container">
                {tailles.map((taille, index) => (
                    <button
                        key={index}
                        className={`tailleValeur ${tailleSelect === taille ? " select" : ""}`}
                        onClick={() => setTailleSelect(taille)}
                    >
                    </button>
                ))}
            </div>
            <Link className="button" to="Jeu">Confirmer</Link>
        </div>
    );
};

export default ChoixTaillePlateau;
