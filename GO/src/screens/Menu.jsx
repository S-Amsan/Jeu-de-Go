import "../css/style.css";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div className="container menu">
            <h1 className="title">JEU DE GO</h1>
            <Link className="button" to="NbJoueurs">Jouer</Link>
            <Link className="button" to="Regles">Règles</Link>
            <p className="credit">Jeu codé en React par Amsan, Rayan, Oskar, et Ethan <br/> Moteur de jeu gnugo-3.8</p>
        </div>
    )
}

export default Menu;