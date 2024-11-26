const Plateau = ({taille}) => {
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
                                <>
                                        {/* Ne pas dessiner les lignes et colonnes à index = 0 */}
                                        {index !== 0 && (
                                            <>
                                                    {/* Lignes */}
                                                    {/* numérotation */}
                                                    <text
                                                        className="numerotation posLigne"
                                                        x={10 + (80 / taille) * index}
                                                        y="7"
                                                        fontSize="2"
                                                        textAnchor="middle"
                                                        alignmentBaseline="middle"
                                                    >{String.fromCharCode(64 + index)}
                                                    </text>
                                                    {/* ligne */}
                                                    <line
                                                        key={`line-${index}`}
                                                        x1="10.5"
                                                        y1={10 + (80 / taille) * index}
                                                        x2="89.5"
                                                        y2={10 + (80 / taille) * index}
                                                        stroke="#1E1E1E"
                                                        strokeWidth="0.25"
                                                    />
                                                    {/* Colonnes */}
                                                    {/* numérotation */}
                                                    <text
                                                        className="numerotation posColonne"
                                                        x="7"
                                                        y={10 + (80 / taille) * index}
                                                        fontSize="2"
                                                        textAnchor="middle"
                                                        alignmentBaseline="middle"
                                                    >{index}
                                                    </text>
                                                    {/* ligne */}
                                                    <line
                                                        key={`col-${index}`}
                                                        x1={10 + (80 / taille) * index}
                                                        y1="10.5"
                                                        x2={10 + (80 / taille) * index}
                                                        y2="89.5"
                                                        stroke="#1E1E1E"
                                                        strokeWidth="0.25"
                                                    />
                                            </>
                                        )}
                                </>
                            ))}

                    </svg>
            </div>
                    )
                    }

                    export default Plateau;
