const TitreNbJoueurs = ({ nbJoueurs, couleur, campJoueurSolo }) => {
    const getTitre = () => {
        if (nbJoueurs === 1) {
            if (campJoueurSolo === couleur) {
                return couleur === "noir" ? "Tour du Joueur Noir" : "Tour du Joueur Blanc";
            }
            else {
                return "Tour de GnuGo";
            }
        }
        else if (nbJoueurs === 2) {
            return couleur === "blanc" ? "Tour du Joueur Blanc" : "Tour du Joueur Noir";
        }
    };

    const titre = getTitre();
    return <h1 className="title">{titre}</h1>;
};

export default TitreNbJoueurs;
