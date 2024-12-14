const BoutonEnJeu = ({nbJoueurs, couleur, setCouleur, campJoueurSolo, handleCoupJoue, handleFinJeu, jeuEnCours}) => {

    const handleAbandon = () => {
        handleFinJeu(couleur === 'noir' ? 'blanc' : 'noir')
    };
    const handlePass = () => {
        let couleurJoueur = couleur === 'noir' ? 'Noir' : 'Blanc';
        if (nbJoueurs === 1) {
            couleurJoueur = "(" + couleurJoueur + ")";
        }
        const coup = "Le Joueur " + couleurJoueur + " Pass";
        handleCoupJoue(coup)
        setCouleur(couleur === "noir" ? "blanc" : "noir");
    }

    if ((nbJoueurs === 2 || (nbJoueurs === 1 && couleur === campJoueurSolo)) && jeuEnCours) { // On affiche pas les boutons quand c'est GnuGO qui joue
        return (
            <>
                <button className="button abandon" onClick={handleAbandon}>Abandon</button>
                <button className="button pass" onClick={handlePass}>Pass</button>
            </>
        )
    }
}

export default BoutonEnJeu