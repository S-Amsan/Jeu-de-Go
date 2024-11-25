const Plateau = ({taille}) => {
        return (
            <svg className="quadrillage" viewBox={`0 0 100 100`} preserveAspectRatio="none">
            {Array.from({length: taille}).map((_, index) => (
                <>
                {/* Ne pas dessiner les lignes et colonnes à index = 0 */}
                {index !== 0 && (
                    <>
                            {/* Création des lignes */}
                            <line
                                key={`line-${index}`}
                                x1="0"
                                y1={(100 / taille) * index}
                                x2="100"
                                y2={(100 / taille) * index}
                                stroke="#1E1E1E"
                                strokeWidth="0.5"
                            />
                            {/* Création des colonnes */}
                            <line
                                key={`col-${index}`}
                                x1={(100 / taille) * index}
                                y1="0"
                                x2={(100 / taille) * index}
                                y2="100"
                                stroke="#1E1E1E"
                                strokeWidth="0.5"
                            />
                    </>
                )}
                </>
            ))}

            </svg>
        )
}

export default Plateau;