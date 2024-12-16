const TitreNbJoueurs = ({nbJoueurs, couleur, campJoueurSolo, jeuEnCours}) => {
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
    if (jeuEnCours) return <h1 className="title">{titre}</h1>;
    return <div data-aos="flip-left">
        <h1 className="title">La partie est terminé !</h1>
        <h2 className="animation-chargement">Calcul du résultat en cours</h2>
    </div>;
};

export default TitreNbJoueurs;
