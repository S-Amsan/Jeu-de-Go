import {Link} from "react-router-dom";

const Regles = () => {
    return (
        <div className="container regles">
            <Link className="boutonRetourMenu" to="/">Retour Menu</Link>
            <h1 className="title-outside">Comment jouer ?</h1>
            <section className="container commentJouer">
                <ol>
                    <li>
                        <strong>But du jeu :</strong> Contrôler le plus grand territoire sur le plateau en entourant des
                        intersections avec vos pierres
                    </li>
                    <li>
                        <strong>Déroulement :</strong> Les joueurs placent à tour de rôle une pierre (noire ou blanche)
                        sur une intersection libre
                    </li>
                    <li>
                        <strong>Captures :</strong> Un groupe de pierres adverses est capturé si toutes ses libertés
                        (intersections adjacentes vides) sont entourées
                    </li>
                    <li>
                        <strong>Ko :</strong> Il est interdit de rejouer un coup qui recrée une situation identique sur
                        le plateau
                    </li>
                </ol>
                <p>
                    Pour des règles complètes, cliquez sur ce lien :{' '}
                    <a href="https://jeudego.org/_php/regleGo.php" target="_blank" rel="noopener noreferrer">
                        Règles du Go
                    </a>.
                </p>
            </section>

            <h1 className="title-outside">Présentation Site</h1>
            <section className="container presenteSite">
                <p className = "premierPdePresentation">
                    Notre site est une interface graphique utilisateur (GUI) moderne pour jouer au Go et interagir
                    facilement avec le jeu. Vous pourrez :
                </p>
                <ul>
                    <li><strong>Choisir son camp (Blanc ou Noir)</strong></li>
                    <li><strong>Changer la taille du plateau selon vos préférences (ex. : 7x7, 19x19)</strong></li>
                    <li><strong>Réinitialiser le plateau en un clic pour commencer une nouvelle partie</strong></li>
                    <li><strong>Effectuer des coups en choisissant directement les positions des pierres</strong></li>
                    <li><strong>Afficher l'état actuel du plateau avec une représentation claire des pierres</strong></li>
                </ul>
                <p>
                    Cette interface intuitive est conçue pour refléter les interactions classiques d'une partie de
                    Go, tout en simplifiant les commandes complexes pour une meilleure expérience utilisateur
                </p>
            </section>
        </div>

    );
};
export default Regles;
