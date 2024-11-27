const HistoriqueCoup = ({ historique }) => {
    return (
        <div className="historique">
            {/*On affiche que les 5 dernier coup !*/}
            {historique.slice((historique.length-5 < 0 ? 0 :historique.length-5),historique.length).map((coup, index) => (
                <p key={index}>{coup}</p>
            ))}
        </div>
    );
};
export default HistoriqueCoup;
