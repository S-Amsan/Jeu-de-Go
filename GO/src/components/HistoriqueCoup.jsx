import {useRef, useEffect} from "react";

const HistoriqueCoup = ({historique, nbJoueurs, campJoueurSolo}) => {
    const historiqueRef = useRef(null);

    useEffect(() => { // La bar de scroll descend en meme temps que les coups
        if (historiqueRef.current) {
            historiqueRef.current.scrollTop = historiqueRef.current.scrollHeight;
        }
    }, [historique]);

    const getDetail = (coup) => { //Permet d'afficher une phrase
        if (coup.includes("illégal")){
            return coup.replace(/(blanc|noir)$/, "");
        }
        const ESPACE = " ";
        let auxiliaire = "a";
        let action = "joué";
        let quelCouleur = coup.includes("blanc") ? "Blanc" : "Noir";
        let quiJoue = "Le Joueur";
        if (nbJoueurs === 1 && coup.includes(campJoueurSolo)) {
            quiJoue = "Vous";
            quelCouleur = "(" + quelCouleur + ")";
            auxiliaire = "avez";
        } else if (nbJoueurs === 1) {
            quiJoue = "GnuGo";
            quelCouleur = "(" + quelCouleur + ")";
        }
        if(coup.includes("terminée")){ // Si le jeu est fini
            return <>{coup.includes("Pass")?"Les deux joueurs ont passé consécutivement leur tour!" : quiJoue+ ESPACE + quelCouleur + ESPACE + "n'"+auxiliaire+" plus de coup légal"}<br/> {coup.replace(/(blanc|noir)$/, "").replace(/(Pass)$/, "")} &#128483;!</>
        }

        if (coup.includes("Pass")) {
            auxiliaire = "";
            action = "Pass";
            coup = "";
        } else {
            coup = coup.replace(/(blanc|noir)$/, "");
        }

        return quiJoue + ESPACE + quelCouleur + ESPACE + auxiliaire + ESPACE + action + ESPACE + coup
    }

    return (<div className="historique" ref={historiqueRef}>
        {historique.map((coup, index) => {
            let classCoup = (index === [...historique].length - 1 ? "dernierCoup" : null)
            classCoup = coup.includes("illégal") ? (classCoup + " illegal") : classCoup;
            return (<p
                className={classCoup}
                key={index}>{getDetail(coup)}
            </p>)
        })}
    </div>);
};

export default HistoriqueCoup;
