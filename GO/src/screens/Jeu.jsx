import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Plateau from "../components/Plateau.jsx";
import HistoriqueCoup from "../components/HistoriqueCoup.jsx";
import TitreNbJoueurs from "../components/TitreNbJoueurs.jsx";
import Curseur from "../components/Curseur.jsx";

const Jeu = () => {
    const location = useLocation();
    const taille = (location.state?.tailleSelect || 19);
    const nbJoueur = location.state?.nbJoueurs || 1;
    const [estTourDuJoueur, setEstTourDuJoueur] = useState(location.state?.couleur === "noir");
    const [couleur, setCouleur] = useState("noir");
    const [historique, setHistorique] = useState([]); // historique des coups joués
    const handleCoupJoue = ({ coordonnees }) => { // on ajoute le coup dans l'historique
        setHistorique(() => [...historique, coordonnees]);
        setEstTourDuJoueur((prev) => !prev); //ça passe de true a false ici
    };

    const calculerTailleCurseur = (taille) => {
        const tailleMax = 50;
        const tailleMin = 20;
        const difference = tailleMax - tailleMin
        const taillePlateau = tailleMax - (taille - 7) / (19 - 7) * difference;
        return Math.max(tailleMin, taillePlateau);
    };

    const tailleCurseur = calculerTailleCurseur(taille);

    const mapCouleur = {
        noir: "#1E1E1E",
        blanc: "#E1E1E1",
    };

    return (
        <div className={`container jeu ${couleur}`}>
            <Curseur
                taille={tailleCurseur}
                couleur={mapCouleur[couleur]}
            />

            <TitreNbJoueurs
                nbJoueurs={nbJoueur}
                couleur={couleur}
                estTourDuJoueur={estTourDuJoueur}
            />

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
