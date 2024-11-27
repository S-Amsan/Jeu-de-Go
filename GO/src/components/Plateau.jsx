import { useState } from "react";

const Plateau = ({ taille, estJouable, couleur, setCouleur, handleCoupJoue }) => {
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
            return x.toString() + String.fromCharCode(64 + y);
        })
    );

    const [historique, setHistorique] = useState([]);

    const handleClick = (index) => {
        const pionClique = pions[index];
        const coupJoue = coordonnees[index].toString();
        if (pionClique.includes("pose")) {
            return;
        }

        // Modification de la classe du pion :
        setPions((prevPions) =>
            prevPions.map((classPion, i) =>
                i === index ? `pion pose ${couleur}` : classPion
            )
        );
        setCouleur(prochainTour({ Couleur: couleur }));

        // Ajout des coordonées dans l'historique
        // text selon qui a joué :
        const coup = "Le joueur "+(couleur === "noir" ? "Noir" : "Blanc")+" a joué " + coupJoue;
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
                <rect x="10" y="10" width="80" height="80" fill="#E5C8A3" />
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
                {Array.from({ length: taille }).map((_, index) => (
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
                                {String.fromCharCode(64 + index)}
                            </text>
                            <line
                                x1="10.5"
                                y1={10 + (80 / taille) * index}
                                x2="89.5"
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
                                y1="10.5"
                                x2={10 + (80 / taille) * index}
                                y2="89.5"
                                stroke="#1E1E1E"
                                strokeWidth="0.25"
                            />
                        </g>
                    )
                ))}

                {estJouable && (
                    <g>
                        {Array.from({ length: (taille - 1) * (taille - 1) }).map((_, index) => {
                            const x = 10 + (80 / taille) * ((index % (taille - 1)) + 1);
                            const y = 10 + (80 / taille) * (Math.floor(index / (taille - 1)) + 1);
                            return (
                                <circle
                                    key={coordonnees[index]}
                                    className={pions[index]}
                                    cx={x}
                                    cy={y}
                                    r={(100 / taille) / 3}
                                    onClick={() => handleClick(index)}
                                    style={{ cursor: "pointer" }}
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
