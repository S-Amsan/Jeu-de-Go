import {Link, useLocation} from "react-router-dom";

const FinJeu = () => {

    const location = useLocation();
    const {couleur} = location.state; // la couleur du vainqueur
    const {nbJoueur} = location.state; // Le nombre de vrai joueur
    const {campJoueurSolo} = location.state; // Couleur du joueur (si il est solo)

    const MessageVictoire = () => {
        if (nbJoueur === 2) {
            // Si 2 joueurs
            return (
                <h1 className="title">
                    Joueur {couleur.toUpperCase()},<br/>vous avez gagné !
                </h1>
            );
        } else if (nbJoueur === 1) {
            // Si 1 joueur
            if (couleur === campJoueurSolo) {
                return (
                    <h1 className="title">
                        Félicitations ! Joueur {couleur.toUpperCase()},<br/>vous avez gagné !
                    </h1>
                );
            } else {
                return (
                    <h1 className="title">
                        Joueur {campJoueurSolo.toUpperCase()},<br/>vous avez perdu.
                    </h1>
                );
            }
        }
    };

    return (
        <div className={`container fin-jeu ${nbJoueur === 2 ? couleur : campJoueurSolo}`}>
            <MessageVictoire/>
            <Link className="button" to="/NbJoueurs">Rejouer</Link>
            <Link className="button" to="/">Quitter</Link>
        </div>
    )
}

export default FinJeu;
