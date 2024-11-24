import { useNavigate } from "react-router-dom";

const ChoixCamp = () => {
    const navigate = useNavigate();

    const handleClick = (camp) => {
        console.log(`Camp choisi : ${camp}`);
        navigate("ChoixTaillePlateau");
    };

    return (
        <div className="container choixCamp">
            <h2>Choisissez votre camp</h2>
            <div className="choix-container">
                <div className="choix blanc">
                    <button onClick={() => handleClick("Blanc")}></button>
                    <p>Blanc</p>
                </div>
                <div className="choix noir">
                    <button onClick={() => handleClick("Noir")}></button>
                    <p>Noir</p>
                </div>
            </div>
        </div>
    );
};

export default ChoixCamp;
