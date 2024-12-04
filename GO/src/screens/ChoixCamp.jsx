import { useNavigate } from "react-router-dom";

const ChoixCamp = () => {
    const navigate = useNavigate();

    const handleClick = (campChoisi) => {
        navigate("ChoixTaillePlateau", { state: { campJoueurSolo: campChoisi } });
    };

    return (
        <div className="container choixCamp">
            <h2>Choisissez votre camp</h2>
            <div className="choix-container">
                <div className="choix blanc">
                    <button onClick={() => handleClick("blanc")}></button>
                    <p>Blanc</p>
                </div>
                <div className="choix noir">
                    <button onClick={() => handleClick("noir")}></button>
                    <p>Noir</p>
                </div>
            </div>
        </div>
    );
};

export default ChoixCamp;
