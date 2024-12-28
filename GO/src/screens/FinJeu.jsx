import {Link, useLocation} from "react-router-dom";

const FinJeu = () => {

    const location = useLocation();
    const {couleur} = location.state; // la couleur du vainqueur
    const {nbJoueurs} = location.state; // Le nombre de vrai joueur
    const {campJoueurSolo} = location.state; // Couleur du joueur (si il est solo)
    const {score} = location.state;

    const MessageVictoire = () => {
        if (nbJoueurs === 2) {
            // Si 2 joueurs
            return (
                <h1 className="title">
                    Joueur {couleur.toUpperCase()},<br/>vous avez gagné !
                </h1>
            );
        } else if (nbJoueurs === 1) {
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
    const Score = () => {
        if (score){
            return <h2>Score : {score.includes("B") ? score.replace("B", "Noir") : score.replace("W", "Blanc")}</h2>
        }else if(nbJoueurs === 2 || couleur === campJoueurSolo) {
            return <h2>Victoire par abandon</h2>
        }else{
            return <h2>Vous avez abandonné</h2>
        }
    }

    return (
        <div className={`container fin-jeu ${nbJoueurs === 2 ? couleur : campJoueurSolo}`}>
            <MessageVictoire/>
            <Score/>
            <Link className="button" to="/NbJoueurs">Rejouer</Link>
            <Link className="button" to="/">Quitter</Link>
        </div>
    )
}

export default FinJeu;
