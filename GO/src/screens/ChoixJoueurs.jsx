import {Link} from "react-router-dom";

const NbJoueurs = () => {
    return (
        <>
            <p>Choisissez le nombre de joueurs</p>
            <Link to="ChoixCamp">Confirmez</Link>
        </>
    )
}

export default NbJoueurs;
