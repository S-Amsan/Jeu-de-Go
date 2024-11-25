import {Link, useLocation} from "react-router-dom";
import Plateau from "../components/Plateau.jsx";


const Jeu = () => {
    const location = useLocation();
    const taille = (location.state?.tailleSelect || 19)+1;

    return (
        <div className="container jeu blanc">
                <h1 className="title">Tour du Joueur Blanc</h1>
            <div className="plateau">
                <Plateau taille={taille} />
            </div>
            <div className="historique">
                <p>Le joueur Blanc à joué A4</p>
                <p>Le joueur Noir à joué A5</p>
                <p>Le joueur Blanc à joué A6</p>
                <p>Le joueur Noir à joué A7</p>
                <p>Le joueur Blanc à joué A10</p>
            </div>
            <Link className="button" to="/">Abandon</Link>
        </div>
    )
}

export default Jeu;