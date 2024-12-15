import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Plateau from "../components/Plateau.jsx";
import HistoriqueCoup from "../components/HistoriqueCoup.jsx";
import TitreNbJoueurs from "../components/TitreNbJoueurs.jsx";
import Curseur from "../components/Curseur.jsx";
import PierresCapturees from "../components/PierresCapturees.jsx";
import BoutonEnJeu from "../components/BoutonEnJeu.jsx";
import * as commande from "../services/gnugoGTP.jsx";

const Jeu = () => {
    const location = useLocation();
    const taille = (location.state?.tailleSelect || 19); // Taille du plateau
    const nbJoueurs = location.state?.nbJoueurs || 1; // Le nombre de vrai joueur ( 1 ou 2 )
    const [campJoueurSolo] = useState(location.state?.campJoueurSolo);// la couleur choisie ,si il n'y a qu'un seul vrai joueur
    const [jeuTermine, setJeuTermine] = useState(false);
    // On récupere les données (si l'utilisateur actualise la page)
    const [couleur, setCouleur] = useState(() => {
        const sauvegardeCouleur = localStorage.getItem("couleur");
        return sauvegardeCouleur ? sauvegardeCouleur : "noir";
    });
    const [historique, setHistorique] = useState(() => {
        const sauvegardeHistorique = localStorage.getItem("historique");
        return sauvegardeHistorique ? JSON.parse(sauvegardeHistorique) : [];
    });
    const [pierresCapturees, setPierresCapturees] = useState(() => {
        const sauvegardePierres = localStorage.getItem("pierresCapturees");
        return sauvegardePierres ? JSON.parse(sauvegardePierres) : {blanc: 0, noir: 0};
    });
    const [nbPass, setNbPass] = useState(() => {
        const sauvegardeNbPass = localStorage.getItem("nbPass");
        return sauvegardeNbPass ? parseInt(sauvegardeNbPass, 10) : 0;
    });
    const [jeuEnCours, SetJeuEnCours] = useState(() => {
        // Récupère la valeur de jeuEnCours depuis localStorage ou utilise true par défaut
        const sauvegardeJeuEnCours = localStorage.getItem('jeuEnCours');
        return sauvegardeJeuEnCours ? JSON.parse(sauvegardeJeuEnCours) : true;
    });

    const navigate = useNavigate();

    // Sauvegarde pour éviter de perdre toutes les données si l'utilisateur actualise la page
    useEffect(() => {
        localStorage.setItem("couleur", couleur);
        localStorage.setItem("historique", JSON.stringify(historique));
        localStorage.setItem("pierresCapturees", JSON.stringify(pierresCapturees));
        localStorage.setItem("nbPass", nbPass);
        localStorage.setItem('jeuEnCours', JSON.stringify(jeuEnCours));
    }, [couleur, historique, pierresCapturees, nbPass]);


    const handleCoupJoue = (coup) => { // On ajoute le coup dans l'historique et on regarde si les joueurs pass
        setHistorique((prevHistorique) => [...prevHistorique, coup]);
        const coupString = coup.toString();
        if (coupString.includes("Pass")) {
            const newNbPass = nbPass + 1;
            setNbPass(newNbPass);
            if (newNbPass === 2) { // Le jeu se termine si les 2 joueur pass consécutivement leur tour
                finDeJeu();
            }
        } else {
            setNbPass(0); // remet le compteur à 0
        }
    };
    const finDeJeu = async () => {
        SetJeuEnCours(false);
        setHistorique((prevHistorique) => [...prevHistorique, "La partie est terminée"]);
        setJeuTermine(true);
        console.log("calcul");
        const getVainqueur = await commande.finalScore();
        console.log("calcul terminée");
        console.log(getVainqueur);
        const vainqueur = getVainqueur.includes("B") ? "noir" : "blanc";
        const score = getVainqueur.slice(2); // A afficher sur l'ecran de fin!!!!!!!!!!!!!
        handleFinJeu(vainqueur);
    };

    const handleFinJeu = (vainqueur) => {
        if (vainqueur) {
            console.log(vainqueur);
        } else {
            console.log("Calcul du vainqueur...");
        }
        // Mettre un chargement pour laisser à Gnugo le temp de calculer le gagnant
        navigate("/FinJeu", {
            state: {
                couleur: vainqueur,
                nbJoueur: 2
            }
        });
    }
    return (
        <div className={`container jeu ${couleur}`}>
            <Curseur
                taille={taille}
                couleur={couleur}
                campJoueurSolo={campJoueurSolo}
                jeuEnCours={jeuEnCours}
            />

            <TitreNbJoueurs
                nbJoueurs={nbJoueurs}
                couleur={couleur}
                campJoueurSolo={campJoueurSolo}
                jeuTermine={jeuTermine}
            />
            <div className="jeuInfo">
                <Plateau
                    taille={taille}
                    estJouable={true}
                    couleur={couleur}
                    setCouleur={setCouleur}
                    campJoueurSolo={campJoueurSolo}
                    nbJoueurs={nbJoueurs}
                    setPierresCapturees={setPierresCapturees}
                    handleCoupJoue={handleCoupJoue}
                    historique={historique}
                    jeuEnCours={jeuEnCours}
                    SetJeuEnCours={SetJeuEnCours}
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
                jeuEnCours={jeuEnCours}
            />
            <HistoriqueCoup historique={historique}/>

        </div>
    );
};

export default Jeu;
