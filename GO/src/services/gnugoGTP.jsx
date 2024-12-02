import axios from "axios";
// setReponse et setErreur ne sont pas obligatoire
// mais c'est mieux car ça nous permet de vérifier que tous va bien (Dans la page Test)
// Fonction pour envoyer une commande au backend
const sendCommand = async (command, setReponse, setErreur) => {
    try {
        const res = await axios.post("http://localhost:3001/gnugo", { command });
        setReponse(res.data.response);
        setErreur("");
    } catch (erreur) {
        console.error("Erreur lors de l'envoi de la commande :", erreur);
        setErreur("Erreur de communication avec le serveur");
        setReponse("");
    }
};


// Les commandes (Il en reste encore ! Mais je ne sais pas si c'est nécésaire de les ajouter)
export const showBoard = (setReponse, setErreur) => sendCommand("showboard", setReponse, setErreur);
export const clearBoard = (setReponse, setErreur) => sendCommand("clear_board", setReponse, setErreur);
export const genMove = (couleur, setReponse, setErreur) => {
    if (couleur) {
        sendCommand(`genmove ${couleur}`, setReponse, setErreur);
    }else{
        setErreur("Veuillez entrer une couleur.");
    }
}
export const playMove = (couleur, coordonnees, setReponse, setErreur) => {
    if (coordonnees && couleur) {
        sendCommand(`play ${couleur} ${coordonnees}`, setReponse, setErreur);
    } else {
        setErreur("Veuillez entrer une coordonnees et une couleur.");
    }
};
export const setBoardSize = (size, setReponse, setErreur) => {
    if (size) {
        sendCommand(`boardsize ${size}`, setReponse, setErreur);
    } else {
        setErreur("Veuillez entrer une taille de plateau.");
    }
};
export const allLegal = (couleur,setReponse, setErreur) => {
    if (couleur) {
        sendCommand(`all_legal ${couleur}`, setReponse, setErreur);
    } else {
        setErreur("Veuillez entrer une couleur");
    }
};
