import axios from "axios";

// Fonction pour envoyer une commande au backend (GnuGo)
const sendCommand = async (command) => {
    try {
        const res = await axios.post("http://localhost:3001/gnugo", { command });
        return (res.data.response.slice(2) || " "); // Retourner la réponse de GnuGo
    } catch (erreur) {
        console.error("Erreur lors de l'envoi de la commande :", erreur);
        return "Erreur de communication avec le serveur"; // Retourner l'erreur
    }
};

// Commandes
export const showBoard = async () => {
    return await sendCommand("showboard");
};
export const clearBoard = async () => {
    return await sendCommand("clear_board");
};
export const genMove = async (couleur) => {
    if (couleur) {
        return await sendCommand(`genmove ${couleur}`);
    } else {
        return "Veuillez entrer une couleur.";
    }
};
export const captures = async (couleur) => {
    if (couleur) {
        return await sendCommand(`captures ${couleur}`);
    } else {
        return "Veuillez entrer une couleur.";
    }
};
export const playMove = async (couleur, coordonnees) => {
    if (coordonnees && couleur) {
        return await sendCommand(`play ${couleur} ${coordonnees}`);
    } else {
        return "Veuillez entrer une coordonnée et une couleur.";
    }
};
export const setBoardSize = async (size) => {
    if (size) {
        return await sendCommand(`boardsize ${size}`);
    } else {
        return "Veuillez entrer une taille de plateau.";
    }
};
export const allLegal = async (couleur) => {
    if (couleur) {
        return await sendCommand(`all_legal ${couleur}`);
    } else {
        return "Veuillez entrer une couleur.";
    }
};
export const isLegal = async (couleur, coordonnees) => {
    if (coordonnees && couleur) {
        return await sendCommand(`is_legal ${couleur} ${coordonnees}`);
    } else {
        return "Veuillez entrer une coordonnée et une couleur.";
    }
};
