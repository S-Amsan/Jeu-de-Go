import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Plateau from "../components/Plateau.jsx";
import HistoriqueCoup from "../components/HistoriqueCoup.jsx";

const Jeu = () => {
    const location = useLocation();
    const taille = (location.state?.tailleSelect || 19);
    const [couleur, setCouleur] = useState("blanc");
    const [historique, setHistorique] = useState([]); // historique des coups joués
    const handleCoupJoue = ({ coordonnees }) => { // ob ajoute le coup dans l'historique
        setHistorique(() => [...historique, coordonnees]);
    };
    return (
        <div className={`container jeu ${couleur}`}>
            <h1 className="title">Tour du Joueur {couleur === "noir" ? "Noir" : "Blanc"}</h1>
            <Plateau
                taille={taille}
                estJouable={true}
                couleur={couleur}
                setCouleur={setCouleur}
                handleCoupJoue={handleCoupJoue}
            />
            <HistoriqueCoup historique={historique} />
            <Link className="button" to="/">Abandon</Link>
        </div>
    );
};

export default Jeu;
