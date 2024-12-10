import "../css/style.css";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div className="container menu">
            <h1 className="title">JEU DE GO</h1>
            <Link className="button" to="/NbJoueurs">Jouer</Link>
            <Link className="button" to="/Regles">Règles</Link>
            <p className="credit">Jeu codé en React par <a href="https://github.com/S-Amsan">Amsan</a>,
                <a href="https://github.com/Uriklef"> Rayan</a>,
                <a href="https://github.com/Francuz4520"> Oskar</a>,
                et <a href="https://github.com/tanounnet"> Ethan</a>
                <br/> Moteur de jeu <a href="https://www.gnu.org/software/gnugo/gnugo.html">gnugo-3.8</a></p>
        </div>
    )
}

export default Menu;