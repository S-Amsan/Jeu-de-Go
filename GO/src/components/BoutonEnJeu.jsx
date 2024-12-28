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
    }else{ // Pas obligé mais important pour l'animation
        return (
            <>
                <button className="button abandon desactive" >Abandon</button>
                <button className="button pass desactive" >Pass</button>
            </>
        )
    }
}

export default BoutonEnJeu