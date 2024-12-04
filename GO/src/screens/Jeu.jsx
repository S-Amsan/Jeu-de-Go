import { useState } from "react";
import { useLocation } from "react-router-dom";
import Plateau from "../components/Plateau.jsx";
import HistoriqueCoup from "../components/HistoriqueCoup.jsx";
import TitreNbJoueurs from "../components/TitreNbJoueurs.jsx";
import Curseur from "../components/Curseur.jsx";
import PierresCapturees from "../components/PierresCapturees.jsx";
import BoutonEnJeu from "../components/BoutonEnJeu.jsx";

const Jeu = () => {
    const location = useLocation();
    const taille = (location.state?.tailleSelect || 19);
    const nbJoueurs = location.state?.nbJoueurs || 1;
    const [campJoueurSolo] = useState(location.state?.campJoueurSolo);
    const [couleur, setCouleur] = useState("noir");
    const [historique, setHistorique] = useState([]); // historique des coups joués
    const [pierresCapturees, setPierresCapturees] = useState({ blanc: 0, noir: 0 });

    const handleCoupJoue = (coup) => { // on ajoute le coup dans l'historique
        setHistorique(() => [...historique, coup]);
    };


    return (
        <div className={`container jeu ${couleur}`}>
            <Curseur
                taille={taille}
                couleur={couleur}
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
            <BoutonEnJeu
                nbJoueurs={nbJoueurs}
                couleur={couleur}
                setCouleur={setCouleur}
                campJoueurSolo={campJoueurSolo}
                handleCoupJoue={handleCoupJoue}
            />
            <HistoriqueCoup historique={historique}/>

        </div>
    );
};

export default Jeu;
