# Tutoriel de configuration et lancement du projet

Cette interface graphique (GUI) a été conçue pour fonctionner avec le moteur **GnuGo**. Vous avez la liberté de remplacer ce moteur dans le fichier `serveur.js`, mais le moteur de remplacement doit être compatible avec le protocole **GTP** et respecter le format des commandes envoyées, les réponses envoyées par le moteur devant impérativement commencer par `"= "`.

## Prérequis
0. **Avoir Node.js installé :**  
   Si vous n'avez pas Node.js installé, vous pouvez le télécharger à partir du [site officiel de Node.js](https://nodejs.org/).

1. **Télécharger GnuGo :**  
   Rendez-vous sur [https://gnugo.baduk.org/](https://gnugo.baduk.org/) et téléchargez **GNU Go 3.8**.

2. **Ajoutez "gnugo-3.8" dans le projet:**  
   Placez le dossier "gnugo-3.8" dans le dossier `GO` du projet

3. **Ouvrir 2 Terminaux :**  
   Sur Windows, appuyez sur `Windows + R` pour ouvrir l'outil Exécuter, puis tapez `cmd` pour ouvrir l'invite de commandes.

4. **Se déplacer dans les répertoires :**  
   - Dans le 1er Terminal, allez à la racine du projet :  
   `1er Terminal : D:\Bureau\Jeu-de-Go-main\GO>`

   - Dans le 2ème Terminal, allez dans le dossier `backend`:  
   `2ème Terminal : D:\Bureau\Jeu-de-Go-main\GO\backend>`

5. **Installer les dépendances :**  
   Dans les 2 Terminaux, tapez la commande suivante pour installer les dépendances du projet :  
```
npm install
```

7. **Installer axios :**  
   Dans le 2ème Terminal, installez `axios` avec la commande :  
```
npm install axios
```

## Lancer le jeu

8. **Démarrer le serveur backend :**  
   Dans le 2ème Terminal, tapez la commande suivante pour démarrer le serveur :  
```
node serveur.js
```
Si aucune erreur, vous verrez :  
```
Serveur backend lancé sur http://localhost:3001
```

9. **Démarrer le frontend :**  
   Dans le 1er terminal, tapez la commande suivante pour démarrer le frontend :  
```
npm run dev
```

10. **Accéder au jeu de GO :**

Si aucune erreur, et que le serveur à démarré, vous verrez :
```
VITE v5.4.11 prêt en 189 ms
➜ Local: http://localhost:5173/
➜ Réseau : utilisez --host pour exposer
➜ Appuyez sur h + entrée pour afficher l'aide
```
   Prenez l'URL `http://localhost:5173/` et ouvrez-la dans votre navigateur pour commencer à jouer.

## Page de Test

11. **Accéder à la page de test :**

    Pour accéder à la page de test, ajoutez `/Test` à l'URL :  
    ```
    http://localhost:5173/Test
    ```

Cette page n'est accessible que via ce chemin spécifique. <br> Elle sert uniquement à vérifier que la communication entre GnuGo et le frontend fonctionne correctement. En tant que joueur·se, vous n'aurez pas besoin d'y accéder.
