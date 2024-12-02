import { useRef, useEffect } from "react";

const HistoriqueCoup = ({ historique }) => {
    const historiqueRef = useRef(null);

    useEffect(() => { // La bar de scroll descend en meme temps que les coups
        if (historiqueRef.current) {
            historiqueRef.current.scrollTop = historiqueRef.current.scrollHeight;
        }
    }, [historique]);

    return (
        <div className="historique" ref={historiqueRef}>
            {historique.map((coup, index) => (
                <p className ={index === [...historique].length-1 ? "dernierCoup" : null} key={index}>{coup}</p>
            ))}
        </div>
    );
};

export default HistoriqueCoup;
