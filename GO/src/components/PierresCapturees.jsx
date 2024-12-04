const PierresCapturees = ({ pierresCapturees }) => {
    return (
        <div className="pierresCapturees">
            <p>Blanc a capturé: {pierresCapturees.blanc} pierres</p>
            <p>Noir a capturé: {pierresCapturees.noir} pierres</p>
        </div>
    );
};

export default PierresCapturees;
