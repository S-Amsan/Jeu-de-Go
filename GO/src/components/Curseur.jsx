import { useEffect, useState } from "react";

const Curseur = ({ taille, couleur }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);


    //console.log("Position curseur :", position);
    //console.log("Couleur du curseur :", couleur);

    const getContour = () => {
        if (couleur === "#E1E1E1")
            return "#1E1E1E"
        else if (couleur === "#1E1E1E")
            return "#E1E1E1"
    }

    const contour = getContour()

    return (
        <div
            style={{
                position: "fixed",
                top: `${position.y - taille / 2}px`,
                left: `${position.x - taille / 2}px`,
                width: `${taille}px`,
                height: `${taille}px`,
                borderRadius: "50%",
                backgroundColor: couleur,
                border: `1px solid ${contour}`,
                pointerEvents: "none",
                zIndex: 99999,
            }}
        />
    );
};

export default Curseur;
