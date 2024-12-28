import {Link} from "react-router-dom";
import BoutonMaison from "../components/BoutonMenu.jsx";

const ChoixJoueurs = () => {
    return (
        <div className="container choixJoueurs">
            <BoutonMaison couleur={"blanc"}/>
            <h1 className="title">JEU DE GO</h1>
            <h2 className="question">Combien êtes-vous?<br/>
                <span className="description">Joueur(s) Humain(s) &#129485;!</span></h2>
            <div className="button-container">
                <Link className="button" to="/ChoixCamp" state={{nbJoueurs: 1}}>1 Joueur
                    <span className="info-choix">Choisissez pour jouer contre GnuGo&#129302;</span>
                </Link>
                <Link className="button" to="/ChoixTaillePlateau" state={{nbJoueurs: 2}}>2 Joueurs
                    <span className="info-choix">Choisissez pour jouer à deux&#129308;&#128165;&#129307;</span>
                </Link>
            </div>
        </div>
    )
}

export default ChoixJoueurs;