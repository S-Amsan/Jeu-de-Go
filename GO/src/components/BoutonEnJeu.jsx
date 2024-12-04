import {useNavigate} from "react-router-dom";

const BoutonEnJeu = ({nbJoueurs, couleur, setCouleur, campJoueurSolo, handleCoupJoue}) => {
    const navigate = useNavigate();
    const handleAbandon = () => {
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
    const handlePass = () => {
        let couleurJoueur = couleur==='noir'?'Noir':'Blanc';
        if (nbJoueurs === 1) {
            couleurJoueur = "("+couleurJoueur+")";
        }
        const coup = "Le Joueur "+ couleurJoueur + " Pass";
        handleCoupJoue(coup)
        setCouleur(couleur === "noir" ? "blanc" : "noir");
    }

    if (nbJoueurs === 2 || (nbJoueurs === 1 && couleur === campJoueurSolo)){ // On affiche pas les boutons quand c'est GnuGO qui joue
        return (
            <>
                <button className="button abandon" onClick={handleAbandon}>Abandon</button>
                <button className="button pass" onClick={handlePass}>Pass</button>
            </>
        )
    }
}

export default BoutonEnJeu