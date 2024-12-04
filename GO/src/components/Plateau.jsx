import {useEffect, useState} from "react";
import * as commande from "../services/gnugoGTP.jsx";

const Plateau = ({ taille, estJouable, couleur, setCouleur, campJoueurSolo, nbJoueurs, setPierresCapturees, handleCoupJoue }) => {
    taille += 1;
    //tableau de pion (les classes)
    const [pions, setPions] = useState(
        Array.from({ length: (taille - 1) * (taille - 1) }, () => "pion")
    );
    // tableau des coordonées des pion de format (A1, A3, etc...)
    const [coordonnees] = useState(
        Array.from({ length: (taille - 1) * (taille - 1) }).map((_, index) => {
            const x = taille - (Math.floor(index / (taille - 1)) + 1);
            const y = (index % (taille - 1)) + 1;
            return  String.fromCharCode(64 + (y > 8 ? y + 1 : y)) + x.toString();
        })
    );
    const verifCoup = async (couleurEN, coordonnees) => {
        const coup = await commande.isLegal(couleurEN, coordonnees);
        return coup.includes("1");
    };
    const [historique, setHistorique] = useState([]);

    useEffect(() => { // Intervale qui permet à Gnugo de joué
        if (nbJoueurs === 1 && campJoueurSolo !== couleur) {
            const intervalId = setInterval(() => {
                getGnuGoCoup();
            }, 3000); // Il joue toutes les 3 secondes
            return () => clearInterval(intervalId);
        }
    }, [nbJoueurs, campJoueurSolo, couleur]);


    const getGnuGoCoup = async () => {
        const couleurEN = (couleur === "noir" ? "black" : "white"); // traduction en anglais pour gnugo
        const coup = (await commande.genMove(couleurEN)).split("").filter(x => x !== " " && x !== "=").join("");
        const index = coordonnees.indexOf(coup);
        handleClick(index, false);
    }



    const handleClick = async (index, joueurACliquer) => {
        const pionClique = pions[index];
        const coupJoue = coordonnees[index].toString();
        const couleurEN = (couleur === "noir" ? "black" : "white"); // traduction en anglais pour gnugo
        let coup;
        let quiAJoue = "Le Joueur ";
        let quelleCouleurAJoue ="";

        if (pionClique.includes("pose") || (joueurACliquer && (nbJoueurs === 1 && campJoueurSolo !== couleur))) {
            return;
        }
        let isLegal;
        if (joueurACliquer){
            isLegal = await verifCoup(couleurEN, coupJoue);
        }else{
            isLegal = true; // car Gnugo ne se trompe pas
        }

        if(isLegal){
            // On actualise les pierres capturées :
            let blancACapture;
            let noirACapture;
            setTimeout(async () => {
                blancACapture = (await commande.captures("white")).split("").filter(x => x !== " " && x !== "=").join("");
                noirACapture = (await commande.captures("black")).split("").filter(x => x !== " " && x !== "=").join("");
                setPierresCapturees((prevPierresCapturees) => ({...prevPierresCapturees, blanc: blancACapture, noir: noirACapture}));
            }, 500);

            // Modification de la classe du pion (On pose le pion):
            setTimeout(() => {
                if(joueurACliquer) {
                    commande.playMove(couleurEN, coupJoue);
                }
            }, 500);
            setPions((prevPions) =>
                prevPions.map((classPion, i) =>
                    i === index ? `pion pose ${couleur}` : classPion
                )
            );
            setCouleur(prochainTour({ Couleur: couleur }));
            // Ajout des coordonées dans l'historique
            // text selon qui a joué :
            if (nbJoueurs === 1 && campJoueurSolo !== couleur) {
                quiAJoue = "GnuGo ";
            }else if (nbJoueurs === 2) {
                quelleCouleurAJoue = (couleur === "noir" ? "Noir" : "Blanc");
            }else{
                quelleCouleurAJoue = (couleur === "noir" ? "Noir" : "Blanc");
                quelleCouleurAJoue = "("+quelleCouleurAJoue+")";
            }

            coup = quiAJoue + quelleCouleurAJoue + " a joué " + coupJoue;
        }else{
            coup = "Coup illégal !"
        }
        setHistorique(() => [...historique, coordonnees]); //ajoute dans l'historique
        handleCoupJoue({ coordonnees: coup });
    };
    const prochainTour = ({ Couleur }) => {
        return Couleur === "noir" ? "blanc" : "noir";
    };
    return (
        <div className="plateau-container">
            <svg className="quadrillage" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Fond du plateau */}
                <rect x="10" y="10" width="80" height="80" fill="#E5C8A3"/>
                {/* Contour du plateau */}
                <rect
                    className="contour"
                    x="10"
                    y="10"
                    width="80"
                    height="80"
                    strokeWidth="0.5"
                    fill="none"
                    rx="0.25"
                    ry="0.25"
                />
                <rect
                    x={10 + (80 / taille)}
                    y={10 + (80 / taille)}
                    width={100 - ((10 + (80 / taille)) * 2)}
                    height={100 - ((10 + (80 / taille)) * 2)}
                    strokeWidth="0.25"
                    stroke="#1E1E1E"
                    fill="none"
                />
                {/* Petits contours des lignes */}
                <rect
                    x="10.3"
                    y="10.3"
                    width="79.4"
                    height="79.4"
                    strokeWidth="0.25"
                    stroke="#1E1E1E"
                    fill="none"
                />
                {/* Placement des hoshi */}
                {taille % 2 === 0 && ( // hoshi au centre si la taille est impaire
                    <circle
                        cx={10 + (80 / taille) * (taille / 2)}
                        cy={10 + (80 / taille) * (taille / 2)}
                        r="0.5"
                        fill="#1E1E1E"
                    />
                )}
                {Array.from({ length: (taille - 1) * (taille - 1) }).map((_, index) => {
                    const x = 10 + (80 / taille) * ((index % (taille - 1)) + 1);
                    const y = 10 + (80 / taille) * (Math.floor(index / (taille - 1)) + 1);
                    const posX = ((index % (taille - 1)) + 1);
                    const posY = (Math.floor(index / (taille - 1)) + 1);
                    const posHoshiRef = taille-1 >= 12 ? 4:3;
                    let condition; //condition de placement des hoshi
                    if (posHoshiRef === 4 && taille % 2 === 0){
                        condition = ((posX === posHoshiRef || posX === taille-posHoshiRef || posX === (taille / 2)) && (posY === posHoshiRef || posY === taille-posHoshiRef || posY === (taille / 2)))
                    }else{
                        condition = ((posX === posHoshiRef || posX === taille-posHoshiRef) && (posY === posHoshiRef || posY === taille-posHoshiRef))
                    }
                    return (
                        condition && (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="0.5"
                                fill="#1E1E1E"
                            />
                        )
                    );
                })}
                {Array.from({length: taille}).map((_, index) => (
                    index !== 0 && (
                        <g key={`rowCol-${index}`}>
                            {/* Lignes */}
                            <text
                                className="numerotation posLigne"
                                x={10 + (80 / taille) * index}
                                y="7"
                                fontSize="2"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {String.fromCharCode(64 + (index > 8 ? index + 1 : index))} {/* Condition pour ne pas afficher le I (car souvent confondu par le 1) */}
                            </text>
                            <line
                                x1={10 + (80 / taille)}
                                y1={10 + (80 / taille) * index}
                                x2={90 - (80 / taille)}
                                y2={10 + (80 / taille) * index}
                                stroke="#1E1E1E"
                                strokeWidth="0.25"
                            />
                            {/* Colonnes */}
                            <text
                                className="numerotation posColonne"
                                x="7"
                                y={10 + (80 / taille) * index}
                                fontSize="2"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {taille - index}
                            </text>
                            <line
                                x1={10 + (80 / taille) * index}
                                y1={10 + (80 / taille)}
                                x2={10 + (80 / taille) * index}
                                y2={90 - (80 / taille)}
                                stroke="#1E1E1E"
                                strokeWidth="0.25"
                            />
                        </g>
                    )
                ))}
                {estJouable && (
                    <g>
                        {Array.from({length: (taille - 1) * (taille - 1)}).map((_, index) => {
                            const x = 10 + (80 / taille) * ((index % (taille - 1)) + 1);
                            const y = 10 + (80 / taille) * (Math.floor(index / (taille - 1)) + 1);
                            return (
                                <circle
                                    key={coordonnees[index]}
                                    className={pions[index]}
                                    cx={x}
                                    cy={y}
                                    r={(100 / taille) / 3}
                                    onClick={() => handleClick(index, true)}
                                    style={{cursor: "pointer"}}
                                />
                            );
                        })}
                    </g>
                )}
            </svg>
        </div>
    );
};
export default Plateau;