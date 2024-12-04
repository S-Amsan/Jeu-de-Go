const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Lancer le processus GNU Go en mode GTP
const gnugoProcess = spawn('../gnugo-3.8/gnugo.exe', ['--mode', 'gtp']);

// Variables pour gérer les réponses et les commandes
let commandQueue = [];
let currentOutput = '';
let isProcessing = false; // Indique si une commande est en cours de traitement
let compteur = 1;

// Loguer toute la sortie de GNU Go
gnugoProcess.stdout.on('data', (data) => {
    currentOutput += data.toString(); // Accumuler les données dans le tampon

    // Vérifier si la réponse est complète (GNU Go finit chaque réponse par une ligne vide ou "\n")
    if (currentOutput.includes('\n\n') || currentOutput.endsWith('\n\n')) {
        if (commandQueue.length > 0) {
            const { resolve } = commandQueue.shift();
            resolve(currentOutput.trim());
            currentOutput = ''; // Réinitialiser le tampon pour la prochaine commande
            isProcessing = false; // Terminer le traitement de la commande actuelle
            processNextCommand(); // Passer à la commande suivante
        }
    }
});

// Gérer les erreurs
gnugoProcess.stderr.on('data', (data) => {
    console.error(`GnuGo stderr: ${data.toString()}`);
});

// Fonction pour traiter la commande suivante dans la file
function processNextCommand() {
    if (isProcessing || commandQueue.length === 0) return; // Si déjà en cours ou file vide, on ne fait rien
    isProcessing = true; // Marquer comme en cours de traitement
    const { command, resolve, reject } = commandQueue[0];
    console.log(`Commande envoyée à GnuGo : ${command}`);
    gnugoProcess.stdin.write(`${command}\n`);
}

// Fonction pour envoyer une commande à GNU Go (en file d'attente)
function sendGnuGoCommand(command) {
    return new Promise((resolve, reject) => {
        commandQueue.push({ command, resolve, reject });
        processNextCommand(); // Vérifie si on peut traiter une commande immédiatement
    });
}

// Recevoir les commandes depuis le frontend
app.post('/gnugo', async (req, res) => {
    const { command } = req.body;
    console.log(`Commande n°${compteur++}:`);
    console.log(`Commande reçue du frontend: ${command}`);
    try {
        const response = await sendGnuGoCommand(command);
        console.log(`Réponse reçue de GnuGo et envoyée au frontend: ${response}`);
        res.send({ response }); // Renvoie la réponse de GnuGo
    } catch (error) {
        console.error('Erreur lors de la communication avec GnuGo:', error);
        res.status(500).send('Erreur lors de la communication avec GnuGo'); // Renvoie une erreur en cas de problème
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur backend lancé sur http://localhost:${port}`);
});
