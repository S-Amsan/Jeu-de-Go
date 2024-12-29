import { useState } from "react";

const BoutonEnJeu = ({ nbJoueurs, couleur, setCouleur, campJoueurSolo, handleCoupJoue, handleFinJeu, jeuEnCours }) => {
    const [popUpVisible, setPopUpVisible] = useState(false);

    const handleAbandon = () => {
        handleFinJeu(couleur === 'noir' ? 'blanc' : 'noir');
        setPopUpVisible(false);
    };

    const handlePass = () => {
        handleCoupJoue("Pass");
        setCouleur(couleur === "noir" ? "blanc" : "noir");
    };

    if ((nbJoueurs === 2 || (nbJoueurs === 1 && couleur === campJoueurSolo)) && jeuEnCours) { // On affiche pas les boutons quand c'est GnuGO qui joue
        return (
            <>
                {popUpVisible && (
                    <>
                        <div className="overlay" onClick={(e) => e.stopPropagation()}></div> {/*Oblige le joueur à faire un choix, il ne peut que annuler ou abandonner*/}
                        <div className="popUpConfirmation">
                            <div className="contenu">
                                <p>Êtes-vous sûr de vouloir abandonner ?</p>
                            </div>
                            <div className="actions">
                                <button id="annuler" onClick={() => setPopUpVisible(false)}>Annuler</button>
                                <button id="confirmer" onClick={handleAbandon}>Confirmer</button>
                            </div>
                        </div>
                    </>
                )}
                <button className="button abandon" onClick={() => setPopUpVisible(true)}>Abandon</button>
                <button className="button pass" onClick={handlePass}>Pass</button>
            </>
        );
    } else {
        return (
            <>
                <button className="button abandon desactive">Abandon</button>
                <button className="button pass desactive">Pass</button>
            </>
        );
    }
};

export default BoutonEnJeu;
