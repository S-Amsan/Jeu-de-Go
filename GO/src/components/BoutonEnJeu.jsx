const BoutonEnJeu = ({nbJoueurs, couleur, setCouleur, campJoueurSolo, handleCoupJoue, handleFinJeu, jeuEnCours}) => {

    const handleAbandon = () => {
        handleFinJeu(couleur === 'noir' ? 'blanc' : 'noir')
    };
    const handlePass = () => {
        handleCoupJoue("Pass")
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