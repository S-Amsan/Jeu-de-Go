import { useEffect, useState } from "react";

const Curseur = ({ taille, couleur, campJoueurSolo }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const calculerTailleCurseur = (taille) => {
        const tailleMax = 50;
        const tailleMin = 20;
        const difference = tailleMax - tailleMin
        const taillePlateau = tailleMax - (taille - 7) / (19 - 7) * difference;
        return Math.max(tailleMin, taillePlateau);
    };

    const tailleCurseur = calculerTailleCurseur(taille);


    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const mapCouleur = {
        noir: "#1E1E1E",
        blanc: "#E1E1E1",
    };


    const getContour = () => {
        if (couleur === "blanc")
            return "#1E1E1E"
        else if (couleur === "noir")
            return "#E1E1E1"
    }

    const contour = getContour()

    if(!campJoueurSolo || campJoueurSolo === couleur) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: `${position.y - tailleCurseur / 2}px`,
                    left: `${position.x - tailleCurseur / 2}px`,
                    width: `${tailleCurseur}px`,
                    height: `${tailleCurseur}px`,
                    borderRadius: "50%",
                    backgroundColor: mapCouleur[couleur],
                    border: `1px solid ${contour}`,
                    pointerEvents: "none",
                    zIndex: 99999,
                }}
            />
        );
    }else{
        return;
    }
};

export default Curseur;
