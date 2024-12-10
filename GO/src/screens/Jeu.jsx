import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Plateau from "../components/Plateau.jsx";
import HistoriqueCoup from "../components/HistoriqueCoup.jsx";
import TitreNbJoueurs from "../components/TitreNbJoueurs.jsx";
import Curseur from "../components/Curseur.jsx";
import PierresCapturees from "../components/PierresCapturees.jsx";
import BoutonEnJeu from "../components/BoutonEnJeu.jsx";

const Jeu = () => {
    const location = useLocation();
    const taille = (location.state?.tailleSelect || 19); // Taille du plateau
    const nbJoueurs = location.state?.nbJoueurs || 1; // Le nombre de vrai joueur ( 1 ou 2 )
    const [campJoueurSolo] = useState(location.state?.campJoueurSolo); // la couleur choisie ,si il n'y a qu'un seul vrai joueur
    const [couleur, setCouleur] = useState("noir"); // Couleur de la page/ du joueur
    const [historique, setHistorique] = useState([]); // historique des coups joués
    const [pierresCapturees, setPierresCapturees] = useState({ blanc: 0, noir: 0 }); // Compteur des pierres capturé
    const [nbPass,setNbPass] = useState(0); // Compteur des tours passé (Pass)
    const navigate = useNavigate();

    const handleCoupJoue = (coup) => { // On ajoute le coup dans l'historique et on regarde si les joueurs pass
        setHistorique((prevHistorique) => [...prevHistorique, coup]);
        const coupString = coup.toString();
        if(coupString.includes("Pass")){
            const newNbPass = nbPass + 1;
            setNbPass(newNbPass);
            if(newNbPass === 2){ // Le jeu se termine si les 2 joueur pass consécutivement leur tour
                handleFinJeu();
            }
        } else {
            setNbPass(0); // remet le compteur à 0
        }
    };

    const handleFinJeu = (vainqueur) => {
        if(vainqueur){
            console.log(vainqueur);
        }else{
            console.log("Calcul du vainqueur...");
        }
        // Mettre un chargement pour laisser à Gnugo le temp de calculer le gagnant
        navigate("/FinJeu", { state : {
                couleur: vainqueur,
                nbJoueur: 2
            }});
    }
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
                    historique={historique}
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
                handleFinJeu={handleFinJeu}
            />
            <HistoriqueCoup historique={historique}/>

        </div>
    );
};

export default Jeu;
