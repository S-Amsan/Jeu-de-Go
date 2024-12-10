import {Link} from "react-router-dom";
import BoutonMaison from "../components/BoutonMenu.jsx";

const ChoixJoueurs = () => {
    return (
        <div className="container choixJoueurs">
            <BoutonMaison couleur={"blanc"}/>
            <h1 className="title">JEU DE GO</h1>
            <h2 className="question">Combien êtes-vous?</h2>
            <div className="button-container">
                <Link className="button" to="/ChoixCamp" state={{ nbJoueurs: 1 }}>1 Joueur</Link>
                <Link className="button" to="/ChoixTaillePlateau" state={{ nbJoueurs: 2 }}>2 Joueurs</Link>
            </div>
        </div>
    )
}

export default ChoixJoueurs;