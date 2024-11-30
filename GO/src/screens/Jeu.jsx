import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Plateau from "../components/Plateau.jsx";
import HistoriqueCoup from "../components/HistoriqueCoup.jsx";
import TitreNbJoueurs from "../components/TitreNbJoueurs.jsx";

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
    console.log("location.state:", location.state);
    console.log("nbJoueur:", nbJoueur);

    console.log("estTourDuJoueur:", estTourDuJoueur);
    console.log("couleur:", couleur);

    return (
        <div className={`container jeu ${couleur}`}>
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
