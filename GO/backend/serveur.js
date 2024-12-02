const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Lancer le processus GNU Go en mode GTP
const gnugoProcess = spawn('../gnugo-3.8/gnugo.exe', ['--mode', 'gtp']);

// Variables pour gérer les réponses
let commandQueue = [];
let currentOutput = '';
let compteur = 1;

// Loguer toute la sortie de GNU Go
gnugoProcess.stdout.on('data', (data) => {
    currentOutput += data.toString(); // Accumuler les données dans le tampon

    // Vérifier si la réponse est complète (GNU Go finit chaque réponse par une ligne vide ou "\n")
    if (currentOutput.includes('\n\n') || currentOutput.endsWith('\n\n')) {
        if (commandQueue.length > 0) {
            // Récupérer la première commande en attente et envoyer la réponse complète
            const { resolve } = commandQueue.shift();
            resolve(currentOutput.trim());
            currentOutput = ''; // Réinitialiser le tampon pour la prochaine commande
        }
    }
});

//Gérer les erreurs
gnugoProcess.stderr.on('data', (data) => {
    console.error(`GnuGo stderr: ${data.toString()}`);
});

//Fonction pour envoyer une commande à GNU Go
function sendGnuGoCommand(command) {
    return new Promise((resolve, reject) => {
        commandQueue.push({ command, resolve, reject });
        console.log(`Commande envoyée à GnuGo : ${command}`);
        gnugoProcess.stdin.write(`${command}\n`);
    });
}

//Recevoir les commandes depuis le frontend
app.post('/gnugo', async (req, res) => {
    const { command } = req.body;
    console.log(``);
    console.log(`Commande n°${compteur++} :`);
    console.log(`Commande reçue du frontend: ${command}`);
    try {
        const response = await sendGnuGoCommand(command);
        console.log(`Réponse reçu de GnuGo et envoyée au frontend: ${response}`);
        res.send({ response });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la communication avec GnuGo' });
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur backend lancé sur http://localhost:${port}`);
});
