import { useNavigate } from 'react-router-dom';
import Plateau from "../components/Plateau.jsx";

function Jeu() {
    const navigate = useNavigate();
    const taille = (location.state?.tailleSelect || 19)+1;
    const handleAbandon = () => {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir abandonner ?");
        if (confirmation) {
            // Exemple de logique pour déterminer le joueur perdant
            const joueurActuel = "blanc"; // Remplace par la logique pour savoir quel joueur joue
            const resultat = "perdu";
            navigate(`/fin-jeu/${resultat}/${joueurActuel}`); // Redirige dynamiquement
        }
    };

    return (
        <div className="container jeu blanc">
            <h1 className="title">Tour du Joueur Blanc</h1>
            <div className="plateau-container">
                <Plateau taille={taille} />
            </div>
            <div className="historique">
                <p>Le joueur Blanc a joué A4</p>
                <p>Le joueur Noir a joué A5</p>
                <p>Le joueur Blanc a joué A6</p>
                <p>Le joueur Noir a joué A7</p>
                <p>Le joueur Blanc a joué A10</p>
            </div>
            <button className="button" onClick={handleAbandon}>
                Abandonner
            </button>
        </div>
    );
}

export default Jeu;
