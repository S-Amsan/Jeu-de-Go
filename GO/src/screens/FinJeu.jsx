import {useLocation, useNavigate} from "react-router-dom";

const FinJeu = () => {

    const location = useLocation();
    const { couleur } = location.state;
    const { nbJoueur } = location.state;
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(`/${path}`)
    }

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
        <div className="container fin-jeu">
            <MessageVictoire/>
            <div className="button-container">
                <button className="button" onClick={() => handleNavigate('NbJoueurs')} type="button">Rejouer</button>
                <button className="button" onClick={() => handleNavigate('')}>Quitter</button>
            </div>
        </div>
    )
}

export default FinJeu;