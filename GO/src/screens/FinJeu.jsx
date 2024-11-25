import { useParams, useNavigate } from 'react-router-dom';

function FinJeu() {
    const { resultat, joueur } = useParams(); // Récupère les paramètres de l'URL
    const navigate = useNavigate();

    const handleRevanche = () => navigate("/jeu"); // Retour à la partie
    const handleQuitter = () => navigate("/"); // Retour au menu principal

    // Styles dynamiques en fonction du joueur
    const isBlanc = joueur === "blanc";
    const styles = {
        container: {
            backgroundColor: isBlanc ? "#E1E1E1" : "#1E1E1E",
            color: isBlanc ? "#1E1E1E" : "#E1E1E1",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            padding: "1em 2em",
            margin: "1em",
            fontSize: "1.2em",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.container}>
            <h1>
                Joueur {joueur.charAt(0).toUpperCase() + joueur.slice(1)} vous avez {resultat} !
            </h1>
            <button
                style={{
                    ...styles.button,
                    backgroundColor: isBlanc ? "#1E1E1E" : "#E1E1E1",
                    color: isBlanc ? "#E1E1E1" : "#1E1E1E",
                }}
                onClick={handleRevanche}
            >
                {resultat === "perdu" ? "Revanche ?" : "Rejouer"}
            </button>
            <button
                style={{
                    ...styles.button,
                    backgroundColor: isBlanc ? "#1E1E1E" : "#E1E1E1",
                    color: isBlanc ? "#E1E1E1" : "#1E1E1E",
                }}
                onClick={handleQuitter}
            >
                Quitter
            </button>
        </div>
    );
}

export default FinJeu;
