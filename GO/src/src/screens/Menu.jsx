import "../css/style.css";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div className="container menu">
            <h1 className="title">JEU DE GO</h1>
            <Link className="button" to="NbJoueurs">Jouer</Link>
            <Link className="button" to="Regles">Règles</Link>
        </div>
    )
}

export default Menu;