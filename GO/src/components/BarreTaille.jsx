const BarreTaille = ({tailleSelect, setTailleSelect}) => {
    const tailles = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    return (
        <>
            {tailles.map((taille, index) => (
                <button
                    key={index}
                    className={`tailleValeur ${tailleSelect === taille ? " select" : ""}`}
                    onClick={() => setTailleSelect(taille)}
                >
                </button>
            ))}
        </>
    )
}

export default BarreTaille;