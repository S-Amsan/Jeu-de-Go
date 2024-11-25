import {Link} from "react-router-dom";

const ChoixJoueurs = () => {
    return (
        <div className="container choixJoueurs">
            <Link className="boutonRetourMenu" to="/">Retour Menu</Link>
            <h1 className="title">JEU DE GO</h1>
            <h2 className="question">Combien êtes-vous?</h2>
            <div className="button-container">
                <Link className="button" to="ChoixCamp">1 Joueur</Link>
                <Link className="button" to="ChoixTaillePlateau">2 Joueurs</Link>
            </div>
        </div>
    )
}

export default ChoixJoueurs;