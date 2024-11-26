import {Link, useLocation} from "react-router-dom";
import Plateau from "../components/Plateau.jsx";
import BoutonMaison from "../components/BoutonMenu.jsx";


const Jeu = () => {
    const location = useLocation();
    const taille = (location.state?.tailleSelect || 19)+1;
    let couleur = "noir";
    return (
        <div className={`container jeu ${couleur}`}>
                <h1 className="title">Tour du Joueur Blanc</h1>
            <Plateau taille={taille}/>
            <div className="historique">
                <p>Le joueur Blanc a joué A4</p>
                <p>Le joueur Noir a joué A5</p>
                <p>Le joueur Blanc a joué A6</p>
                <p>Le joueur Noir a joué A7</p>
                <p>Le joueur Blanc a joué A10</p>
            </div>
            <Link className="button" to="/">Abandon</Link>
        </div>
    )
}

export default Jeu;