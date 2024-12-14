import {useRef, useEffect} from "react";

const HistoriqueCoup = ({historique}) => {
    const historiqueRef = useRef(null);

    useEffect(() => { // La bar de scroll descend en meme temps que les coups
        if (historiqueRef.current) {
            historiqueRef.current.scrollTop = historiqueRef.current.scrollHeight;
        }
    }, [historique]);
    return (
        <div className="historique" ref={historiqueRef}>
            {historique.map((coup, index) => {
                let classCoup = (index === [...historique].length - 1 ? "dernierCoup" : null)
                classCoup = coup.includes("illégal") ? (classCoup + " illegal") : classCoup;
                return (
                    <p
                        className={classCoup}
                        key={index}>{coup}
                    </p>)
            })}
        </div>
    );
};

export default HistoriqueCoup;
