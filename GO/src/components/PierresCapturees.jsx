const PierresCapturees = ({pierresCapturees, campJoueurSolo}) => {
    // Si il a plusieurs pierres il faut ajouté un "s"
    const sBlanc = pierresCapturees.blanc > 1 ? "s" : "";
    const sNoir = pierresCapturees.noir > 1 ? "s" : "";

    // Le début de la phrase
    const textBlanc = !campJoueurSolo ? "Blanc a " :
        campJoueurSolo === "blanc" ? "Vous avez " : "GnuGo a ";
    const textNoir = !campJoueurSolo ? "Noir a " :
        campJoueurSolo === "noir" ? "Vous avez " : "GnuGo a ";


    return (
        <div className="pierresCapturees">
            <p>
                {textBlanc} capturé
                <span className="gras"><span className="surbrillance"> {pierresCapturees.blanc}</span> pierre{sBlanc}</span>
            </p>
            <p>
                {textNoir} capturé
                <span className="gras"><span className="surbrillance"> {pierresCapturees.noir}</span> pierre{sNoir}</span>
            </p>
        </div>
    );

};
export default PierresCapturees;
