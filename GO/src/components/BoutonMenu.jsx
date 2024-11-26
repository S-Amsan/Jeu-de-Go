import {Link} from 'react-router-dom';
import maisonBlanche from '../images/maison blanche.png';
import maisonNoire from '../images/maison noire.png';

const BoutonMaison = ({couleur}) => {
    const getImage = () => {
        if(couleur === "blanc"){
            return maisonNoire;
        }
        return maisonBlanche;
    };
    const image = getImage();
    return (
        <Link to="/" className="maison-bouton">
            <img
                src={image}
                alt="Retour Menu"
                className="maison-image"
            />
        </Link>
    );
};

export default BoutonMaison;
