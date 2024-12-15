const TitreNbJoueurs = ({nbJoueurs, couleur, campJoueurSolo, jeuTermine}) => {
    const getTitre = () => {
        if (nbJoueurs === 1) {
            if (campJoueurSolo === couleur) {
                return couleur === "noir" ? "Tour du Joueur Noir" : "Tour du Joueur Blanc";
            } else {
                return "Tour de GnuGo";
            }
        } else if (nbJoueurs === 2) {
            return couleur === "blanc" ? "Tour du Joueur Blanc" : "Tour du Joueur Noir";
        }
    };

    const titre = getTitre();
    if (!jeuTermine) return <h1 className="title">{titre}</h1>;
    return <div data-aos="flip-left">
        <h1 className="title">La partie est terminé ! <br/><span className="animation-chargement">Calcul du résultat en cours</span></h1>
    </div>;
};

export default TitreNbJoueurs;
