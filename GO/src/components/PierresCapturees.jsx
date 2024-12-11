const PierresCapturees = ({ pierresCapturees }) => {
    return (
        <div className="pierresCapturees">
            <p>Blanc a capturé: {pierresCapturees.blanc} pierre{pierresCapturees.blanc > 1 ? "s" : ""}</p>
            <p>Noir a capturé: {pierresCapturees.noir} pierre{pierresCapturees.noir > 1 ? "s" : ""}</p>
        </div>
    );
};
export default PierresCapturees;
