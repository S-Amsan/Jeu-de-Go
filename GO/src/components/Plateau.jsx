import {useState} from "react";

const Plateau = ({taille, estJouable}) => {
        taille += 1;

    const [pions, setPions] = useState(
        Array.from({ length: taille * taille }, () => "pion") // Initialise un tableau de classes "pion"
    );


    const [couleur, setCouleur] = useState("noir");

    const handleClick = (index) => {

        const pionClique = pions[index];

        if (pionClique.includes("pose")) {
            return;
        }

        setPions((pions) =>
            pions.map((classPion, i) =>
                i === index ? `pion pose ${couleur}` : classPion
            )
        );
        prochainTour();
    };

    const prochainTour = () => {
        setCouleur((prevCouleur) => (prevCouleur === "noir" ? "blanc" : "noir"));
    };

        return (
            <div className="plateau-container">
                    <svg className="quadrillage" viewBox={`0 0 100 100`} preserveAspectRatio="none">
                            {/* Fond du plateau */}
                            <rect x="10" y="10" width="80" height="80" fill="#E5C8A3"/>
                            {/* Contour du plateau (stroke se trouve dans le css) */}
                            <rect className="contour" x="10" y="10" width="80" height="80" strokeWidth="0.5" fill="none"
                                  rx="0.25" ry="0.25"/>
                            {/* Petit contour noir qui entour les lignes */}
                            <rect x="10.3" y="10.3" width="79.4" height="79.4" strokeWidth="0.25" stroke="#1E1E1E"
                                  fill="none"/>
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
                                        {index}
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
                                {Array.from({ length: taille * taille }).map((_, index) => {
                                    const x = 10 + (80 / taille) * (index % taille);
                                    const y = 10 + (80 / taille) * Math.floor(index / taille);
                                    return (
                                        <circle
                                            key={index}
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
</div>)
}

export default Plateau;
