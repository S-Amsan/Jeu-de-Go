import {useEffect, useState} from "react";
import * as commande from "../services/gnugoGTP.jsx";

const Plateau = ({
                     taille,
                     estJouable,
                     couleur,
                     setCouleur,
                     campJoueurSolo,
                     nbJoueurs,
                     setPierresCapturees,
                     handleCoupJoue,
                     historique,
                     jeuEnCours,
                     finDeJeu
                 }) => {
    //tableau de pierres (les classes)
    const [pierres, setPierres] = useState(
        Array.from({length: taille * taille}, () => "pierre")
    );
    // tableau des coordonées des pierre de format (A1, A3, etc...)
    const [coordonnees] = useState(
        Array.from({length: taille * taille}).map((_, index) => {
            const x = taille - (Math.floor(index / taille));
            const y = (index % taille) + 1;
            return String.fromCharCode(64 + (y > 8 ? y + 1 : y)) + x.toString();
        })
    );

    // On gere les tours :
    let gnugoGTPJoue = false;
    useEffect(() => { // à chaque fois que la couleur change
        if (estJouable) {
            //console.log("tour du joueur : "+ couleur);
            actualiserPlateau();
            if (!jeuEnCours) {
                return;
            }
            verifPeutJouer().then(peutJouer => {
                if (!peutJouer) { // On arrete le jeu si il ne peut pas jouer, car ça veut dire qu'il peut jouer que des coup illégaux
                    finDeJeu();
                }
            })
            if (nbJoueurs === 1 && campJoueurSolo !== couleur) { // Si c'est le tour de gnugo
                const intervalId = setInterval(() => {
                    getGnuGoCoup();
                }, 2000); // Il joue toutes les 2 secondes
                return () => clearInterval(intervalId);
            }
        }
    }, [couleur]);
    const getGnuGoCoup = async () => {
        if (gnugoGTPJoue)
            return true;
        gnugoGTPJoue = true;
        const couleurEN = (couleur === "noir" ? "black" : "white"); // traduction en anglais pour gnugo
        const coup = (await commande.genMove(couleurEN));
        if (coup === "PASS") { // Si Gnugo Pass (pass son tour)
            handleCoupJoue("GnuGo Pass");
            setCouleur(couleur === "noir" ? "blanc" : "noir");
            gnugoGTPJoue = false
            return;
        } else if (coup === "resign") {
            handleCoupJoue("GnuGo resign");
            setCouleur(couleur === "noir" ? "blanc" : "noir");
            gnugoGTPJoue = false
            return;
        }
        const index = coordonnees.indexOf(coup.toString());
        handleClick(index, false);
        gnugoGTPJoue = false;
    }
    // Gestion de pierres et du plateau
    const poserPierre = (index, couleurPierre) => {
        setPierres((prevPierres) =>
            prevPierres.map((etatPierre, i) =>
                i === index ? `pierre pose ${couleurPierre}` : etatPierre
            )
        );
    }
    const retirerPierre = (index) => {
        setPierres((prevPierres) =>
            prevPierres.map((etatPierre, i) =>
                i === index ? `pierre` : etatPierre
            )
        );
    }
    const actualiserPlateau = async () => {
        const pierresNoir = (await commande.listStones("black")).split(" ");
        const pierresBlanc = (await commande.listStones("white")).split(" ");
        const pierresPoseIndex = [];
        for (const pierre of pierresNoir) {
            const index = coordonnees.indexOf(pierre);
            poserPierre(index, "noir");
            pierresPoseIndex.push(index);
        }
        for (const pierre of pierresBlanc) {
            const index = coordonnees.indexOf(pierre);
            poserPierre(index, "blanc");
            pierresPoseIndex.push(index);
        }
        for (let i = 0; i < taille * taille; ++i) {
            if (pierresPoseIndex.indexOf(i) === -1)
                retirerPierre(i);
        }
    }
    // On vérifie si le joueur actuel peut jouer :
    const verifPeutJouer = async () => {
        const couleurEN = (couleur === "noir" ? "black" : "white"); // traduction en anglais pour gnugo
        return (await commande.allLegal(couleurEN) !== " ");
    }
    // On vérifie si le coup joué est légal
    const verifCoupEstLegal = async (couleurEN, coordonnees) => {
        const coup = await commande.isLegal(couleurEN, coordonnees);
        return coup.includes("1"); //GnuGo GTP renvoie 1 si c'est légal
    };
    // Poser une pierre / joue un coup
    const handleClick = async (index, joueurACliquer) => {
        if (!jeuEnCours) {
            return;
        }
        const pierreClique = pierres[index];
        const coupJoue = coordonnees[index].toString();
        const couleurEN = (couleur === "noir" ? "black" : "white"); // traduction en anglais pour gnugo
        let coup;

        if (pierreClique.includes("pose") || (joueurACliquer && (nbJoueurs === 1 && campJoueurSolo !== couleur))) { // Ne peut pas jouer sur une pierre pose ou quand c'est le tour de Gnugo
            return;
        }
        let isLegal;
        if (joueurACliquer) {
            isLegal = await verifCoupEstLegal(couleurEN, coupJoue);
        } else {
            isLegal = true; // car Gnugo ne se trompe pas
        }

        if (isLegal) {
            if (joueurACliquer) {
                await commande.playMove(couleurEN, coupJoue); // On envoie le coup à GnuGo
            }
            // On actualise les pierres capturées:
            const blancACapture = (await commande.captures("white"));
            const noirACapture = (await commande.captures("black"));
            setPierresCapturees((prevPierresCapturees) => ({
                ...prevPierresCapturees,
                blanc: blancACapture,
                noir: noirACapture
            }));
            // On pose la pierre
            poserPierre(index, couleur);
            // On change le tour
            setCouleur(couleur === "noir" ? "blanc" : "noir");
            // text selon qui a joué (Pour l'historique des coups):
            let quiAJoue = "Le Joueur ";
            let quelleCouleurAJoue = "";
            if (nbJoueurs === 1 && campJoueurSolo !== couleur) {
                quiAJoue = "GnuGo ";
            } else if (nbJoueurs === 2) {
                quelleCouleurAJoue = (couleur === "noir" ? "Noir" : "Blanc");
            } else {
                quelleCouleurAJoue = (couleur === "noir" ? "Noir" : "Blanc");
                quelleCouleurAJoue = "(" + quelleCouleurAJoue + ")";
            }
            coup = quiAJoue + quelleCouleurAJoue + " a joué " + coupJoue;
            //On actualise la ligne et la colonne (des numérotations)
            let colonneIndex = Number(coupJoue.charAt(0).charCodeAt(0) - 64);
            let ligneIndex = (taille + 1) - Number(coupJoue.slice(1));
            setIndexCoupColonne(colonneIndex > 8 ? colonneIndex - 1 : colonneIndex);
            setIndexCoupLigne(ligneIndex);
        } else {
            coup = "Coup illégal !"
        }

        handleCoupJoue(coup);
    };
    // Pour que les afficher les numéro (numérotation) en gras
    const [indexCoupColonne, setIndexCoupColonne] = useState();
    const [indexCoupLigne, setIndexCoupLigne] = useState();
    const getClassNumColonne = (index) => {
        if (!dernierCoupEstJoue()) {
            return "";
        }
        return index === indexCoupColonne ? "actuel" : "";
    };
    const getClassNumLigne = (index) => {
        if (!dernierCoupEstJoue()) {
            return "";
        }
        return index === indexCoupLigne ? "actuel" : "";
    };
    const dernierCoupEstJoue = () => {
        if (historique && historique.length !== 0) {
            return !(historique[historique.length - 1].includes("Pass") || historique[historique.length - 1].includes("illégal"));
        }
        return false
    }
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
                    x={10 + (80 / (taille + 1))}
                    y={10 + (80 / (taille + 1))}
                    width={100 - ((10 + (80 / (taille + 1))) * 2)}
                    height={100 - ((10 + (80 / (taille + 1))) * 2)}
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
                {(taille + 1) % 2 === 0 && ( // hoshi au centre si la taille est impaire
                    <circle
                        cx={10 + (80 / (taille + 1)) * ((taille + 1) / 2)}
                        cy={10 + (80 / (taille + 1)) * ((taille + 1) / 2)}
                        r="0.5"
                        fill="#1E1E1E"
                    />
                )}
                {Array.from({length: taille * taille}).map((_, index) => {
                    const x = 10 + (80 / (taille + 1)) * ((index % taille) + 1);
                    const y = 10 + (80 / (taille + 1)) * (Math.floor(index / taille) + 1);
                    const posX = ((index % taille) + 1);
                    const posY = (Math.floor(index / taille) + 1);
                    const posHoshiRef = (taille >= 12) ? 4 : ((taille >= 6) ? 3 : 2);
                    let condition; //condition de placement des hoshi
                    if (posHoshiRef === 4 && (taille + 1) % 2 === 0) {
                        condition = ((posX === posHoshiRef || posX === (taille + 1) - posHoshiRef || posX === ((taille + 1) / 2)) && (posY === posHoshiRef || posY === (taille + 1) - posHoshiRef || posY === ((taille + 1) / 2)))
                    } else {
                        condition = ((posX === posHoshiRef || posX === (taille + 1) - posHoshiRef) && (posY === posHoshiRef || posY === (taille + 1) - posHoshiRef))
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
                {Array.from({length: (taille + 1)}).map((_, index) => (
                    index !== 0 && (
                        <g key={`${index}`}>
                            {/* Lignes */}
                            <text
                                className={`numerotation posColonne ${getClassNumColonne(index)}`}
                                x={10 + (80 / (taille + 1)) * index}
                                y="7"
                                fontSize="2"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {String.fromCharCode(64 + (index > 8 ? index + 1 : index))} {/* Condition pour ne pas afficher le I (car souvent confondu par le 1) */}
                            </text>
                            <line
                                x1={10 + (80 / (taille + 1))}
                                y1={10 + (80 / (taille + 1)) * index}
                                x2={90 - (80 / (taille + 1))}
                                y2={10 + (80 / (taille + 1)) * index}
                                stroke="#1E1E1E"
                                strokeWidth="0.25"
                            />
                            {/* Colonnes */}
                            <text
                                className={`numerotation posLigne ${getClassNumLigne(index)}`}
                                x="7"
                                y={10 + (80 / (taille + 1)) * index}
                                fontSize="2"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {(taille + 1) - index}
                            </text>
                            <line
                                x1={10 + (80 / (taille + 1)) * index}
                                y1={10 + (80 / (taille + 1))}
                                x2={10 + (80 / (taille + 1)) * index}
                                y2={90 - (80 / (taille + 1))}
                                stroke="#1E1E1E"
                                strokeWidth="0.25"
                            />
                        </g>
                    )
                ))}
                {estJouable && (
                    <g>
                        {Array.from({length: taille * taille}).map((_, index) => {
                            const x = 10 + (80 / (taille + 1)) * ((index % taille) + 1);
                            const y = 10 + (80 / (taille + 1)) * (Math.floor(index / taille) + 1);
                            return (
                                <circle
                                    key={coordonnees[index]}
                                    className={pierres[index]}
                                    cx={x}
                                    cy={y}
                                    r={(100 / (taille + 1)) / 3}
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