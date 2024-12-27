# Projet R3.04 : Développement d'une GUI pour le jeu de Go

### Membres de l'équipe
- Duquenne 207
- Meri 207
- Sutharsan 207
- Jakubczyk 208
  
### Objectif
Ce projet a pour but de développer une interface graphique (**GUI**) pour le jeu de ***Go***.

--- 
### Fonctionnalités implémentées
- Menu de jeu
- Choix du nombre de joueurs humains souhaitant jouer une partie
- Si un seul joueur, choix de la couleur des pierres
- Choix de la taille du plateau de jeu
- Fonctionnalité permettant de poser les pierres sur le plateau et donc de jouer une partie
- Intégration du moteur de jeu **GNUGO**, permettant de jouer contre une IA et de calculer le résultat d'une partie
  
### Fonctionnalités non implémentées
- Nous pensons avoir implémenté toutes les fonctionnalités nécessaires à la GUI.

### Diagrammes

>  [Diagramme d'architecture](./docs/diagramme_architecture.pdf)

### Tests unitaires
Pas de tests unitaires, car réaliser des tests pour une interface utilisateur est une tâche difficile. Cependant, le code est optimisé et sans erreurs (des tests ont été réalisés manuellement).
  
### Bilan du projet
Nous avons décidé de réaliser ce projet en utilisant la bibliothèque **React** de JavaScript, car nous avons estimé que, pour ce projet en particulier, cette bibliothèque simplifie le code et la gestion des fichiers (notamment grâce au JSX). De plus, réaliser ce projet avec cette bibliothèque nous permet d’ajouter le React à nos CV. Après avoir familiarisé tous les membres du groupe avec les fonctionnalités de React, la plus grande difficulté a été d’intégrer le moteur du jeu au projet, car nous n’avions jamais eu l’occasion de le faire auparavant. Nous y avons consacré beaucoup de temps avant de réussir.
Néanmoins, nous avons réussi à terminer cette interface utilisateur en implémentant toutes les fonctionnalités nécessaires pour permettre de jouer une vraie partie de Go. Même si nous avons fait de notre mieux, nous pensons pouvoir encore améliorer l’organisation de notre code afin de le rendre plus facile à comprendre.
