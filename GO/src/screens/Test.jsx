import { useState } from "react";
import * as commande from "../services/gnugoGTP.jsx";

const Test = () => {
    const [valeur, setValeur] = useState(""); // Commande à envoyer
    const [reponse, setReponse] = useState("="); // Réponse de gnugo

    const handleCommande = async (callback) => {
        const resultat = await callback();
        setReponse(resultat);
    };

    return (
        <div className="container test">
            <h1 className="title">GnuGo GTP Test</h1>
            <div className="commandes">
                <p>Cliquer sur les boutons pour envoyer une commande</p>
                <div className="commande">
                    <button className="button" onClick={() => handleCommande(commande.showBoard)}>
                        Show Board
                    </button>
                    <button className="button" onClick={() => handleCommande(commande.clearBoard)}>
                        Clear Board
                    </button>
                    <button className="button" onClick={() => handleCommande(() => commande.genMove("white"))}>
                        Gen Move White
                    </button>
                    <button className="button" onClick={() => handleCommande(() => commande.genMove("black"))}>
                        Gen Move Black
                    </button>
                    <button className="button" onClick={() => handleCommande(() => commande.captures("white"))}>
                        Captures White
                    </button>
                    <button className="button" onClick={() => handleCommande(() => commande.captures("black"))}>
                        Captures Black
                    </button>
                    <button className="button" onClick={() => handleCommande(() => commande.allLegal("white"))}>
                        All Legal White
                    </button>
                    <button className="button" onClick={() => handleCommande(() => commande.allLegal("black"))}>
                        All Legal Black
                    </button>
                </div>
                <p>Entrez une valeur avant de cliquer sur les boutons ci-dessous,</p>
                <p>(Format : A4, B3, 12)</p>
                <input
                    type="text"
                    value={valeur}
                    onChange={(e) => setValeur(e.target.value)}
                    placeholder="  Entrez une valeur (coordonnées ou taille)"
                />
                <div className="commande">
                    <button className="button" onClick={() => handleCommande(() => commande.setBoardSize(valeur))}>
                        Set Board Size
                    </button>
                    <button className="button" onClick={() => handleCommande(() => commande.playMove("black", valeur))}>
                        Play Black
                    </button>
                    <button className="button" onClick={() => handleCommande(() => commande.playMove("white", valeur))}>
                        Play White
                    </button>
                    <button className="button" onClick={() => handleCommande(() => commande.isLegal("black", valeur))}>
                        Is Legal Black
                    </button>
                    <button className="button" onClick={() => handleCommande(() => commande.isLegal("white", valeur))}>
                        Is Legal White
                    </button>
                </div>
            </div>
            <div className="console">
                {reponse && (
                    <div className="reponse">
                        <p>Terminal Gnugo :</p>
                        <pre>{reponse}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Test;