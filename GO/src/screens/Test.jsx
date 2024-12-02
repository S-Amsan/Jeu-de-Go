import { useState } from "react";
import * as commande from "../services/gnugoGTP.jsx";


// Page qui sert à voir les réponses et les erreur de GnuGo
// sert aussi à envoyé des commande à GnuGO
const Test = () => {
    const [valeur, setValeur] = useState(""); // Commande à envoyer
    const [reponse, setReponse] = useState(""); // Réponse du backend
    const [erreur, setErreur] = useState(""); // Erreur éventuelle

    return (
        <div className="container test">
            <h1 className="title">GnuGo GTP Test</h1>

            <p>Cliquer sur les boutons pour envoyer une commande</p>
            <div className="commande">
                <button className="button" onClick={() => commande.showBoard(setReponse, setErreur)}>Show Board</button>
                <button className="button" onClick={() => commande.genMove("white", setReponse, setErreur)}>Gen Move
                    White
                </button>
                <button className="button" onClick={() => commande.genMove("black", setReponse, setErreur)}>Gen Move
                    Black
                </button>
                <button className="button" onClick={() => commande.clearBoard(setReponse, setErreur)}>Clear Board
                </button>
                <button className="button"
                        onClick={() => commande.allLegal("white", setReponse, setErreur)}>All Legal White
                </button>
                <button className="button"
                        onClick={() => commande.allLegal("black", setReponse, setErreur)}>All Legal Black
                </button>
            </div>
            <p>Entrez une valeur avant de cliquer sur les boutons ci-dessous,</p>
            <p>(Format : A4, B3, 12)</p>
            <input
                type="text"
                value={valeur}
                onChange={(e) => setValeur(e.target.value)}
                placeholder="  Entrez une valeur (coordonées ou taille)"
            />
            <div className="commande">
                <button className="button"
                        onClick={() => commande.playMove("black", valeur, setReponse, setErreur)}>Play Black
                </button>
                <button className="button"
                        onClick={() => commande.playMove("white", valeur, setReponse, setErreur)}>Play White
                </button>
                <button className="button" onClick={() => commande.setBoardSize(valeur, setReponse, setErreur)}>Set
                    Board Size
                </button>
            </div>
            {reponse && (
                <div className="reponse">
                    <p>Réponse :</p>
                    <pre>{reponse}</pre>
                </div>
            )}
            {erreur && (
                <div className="erreur">
                    <p>Erreur :</p>
                    <pre>{erreur}</pre>
                </div>
            )}
        </div>
    );
};

export default Test;
