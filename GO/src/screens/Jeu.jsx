import { useState } from "react";
import { useLocation } from "react-router-dom";
import Plateau from "../components/Plateau.jsx";
import HistoriqueCoup from "../components/HistoriqueCoup.jsx";
import TitreNbJoueurs from "../components/TitreNbJoueurs.jsx";
import Curseur from "../components/Curseur.jsx";
import { useNavigate } from "react-router-dom";
import PierresCapturees from "../components/PierresCapturees.jsx";

const Jeu = () => {
    const location = useLocation();
    const taille = (location.state?.tailleSelect || 19);
    const nbJoueurs = location.state?.nbJoueurs || 1;
    const [campJoueurSolo] = useState(location.state?.campJoueurSolo);
    const [couleur, setCouleur] = useState("noir");
    const [historique, setHistorique] = useState([]); // historique des coups joués
    const [pierresCapturees, setPierresCapturees] = useState({ blanc: 0, noir: 0 });

    const handleCoupJoue = ({ coordonnees }) => { // on ajoute le coup dans l'historique
        setHistorique(() => [...historique, coordonnees]);
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

    const navigate = useNavigate();

    const handleClick = () => {
        if (nbJoueurs === 1) {
            navigate("FinJeu", { state : {
                couleur: couleur==='noir'?'noir':'blanc',
                nbJoueur: 1
            }});
        }
        else if (nbJoueurs === 2) {
            navigate("FinJeu", { state : {
                couleur: couleur==='noir'?'blanc':'noir',
                nbJoueur: 2
            }});
        }
    };

    return (
        <div className={`container jeu ${couleur}`}>
            <Curseur
                taille={tailleCurseur}
                couleur={mapCouleur[couleur]}
            />

            <TitreNbJoueurs
                nbJoueurs={nbJoueurs}
                couleur={couleur}
                campJoueurSolo={campJoueurSolo}
            />
            <div className="jeuInfo">
                <Plateau
                    taille={taille}
                    estJouable={true}
                    couleur={couleur}
                    setCouleur={setCouleur}
                    campJoueurSolo={campJoueurSolo}
                    nbJoueurs = {nbJoueurs}
                    setPierresCapturees = {setPierresCapturees}
                    handleCoupJoue={handleCoupJoue}
                />
                <PierresCapturees
                    pierresCapturees={pierresCapturees}
                />
            </div>
            <HistoriqueCoup historique={historique}/>
            <button className="button abandon" onClick={handleClick}>Abandon</button>
            <button className="button pass" >Pass</button>
        </div>
    );
};

export default Jeu;
