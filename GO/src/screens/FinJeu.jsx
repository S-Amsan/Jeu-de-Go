import {Link, useLocation} from "react-router-dom";

const FinJeu = () => {

    const location = useLocation();
    const {couleur} = location.state;
    const {nbJoueur} = location.state;

    const MessageVictoire = () => {
        if (nbJoueur === 1) {
            return (
                <h1 className="title"><strong>Joueur {couleur.toUpperCase()} <br/> vous avez perdu</strong></h1>
            )
        }
        return (
            <h1 className="title"><strong>Joueur {couleur.toUpperCase()} <br/> vous avez gagné</strong></h1>
        )
    }

    return (
        <div className={`container fin-jeu ${couleur}`}>
            <MessageVictoire/>
            <div className="button-container">
                <Link className="button" to="/NbJoueurs">Rejouer</Link>
                <Link className="button" to="/">Quitter</Link>
            </div>
        </div>
    )
}

export default FinJeu;