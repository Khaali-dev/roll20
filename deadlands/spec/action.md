# Système d'initiative

+ Declaration d'un nouveau round: Le turn order est vidé. Creation d'une macro MJ *New round*.
+ Chaque personnage lance son initiative avec possibilité de dépenser des pépites via une macro. Cette derniere ne doit etre active que pendant la resolution du nouveau round.. 
+ Chaque personnage recoit 0+ tours dans le turn order.
+ Chaque personnage pioche de son deck un nombre de carte égal au nombre de tours obtenu
+ Resolution du jocker noir: perte de la plus haute carte et remet le joker.
+ Resolution du jocker rouge qui est ecarté du turn order pour pouvoir en le jouant interrompre un tour
+ Resolution de l'aout Tete Froide pour changer de carte.
+ Resolution de triche pour gagner des cartes d'action supplementaires.

La résolution de l'initiative dans 2 paquets differents n'est directement géré par roll20. Il faut implementer ces deux paquets (PJ & PNJ).

# Liste des actions

## Mettre une carte dans sa manche
+ Le joueur joue la carte *Mettre une carte dans la manche*.
+ La carte d'initiative est placé à coté du joueur.
+ On passe au tour suivant.

## Jouer une carte de sa manche.
+ Le joueur joue la carte *Jouer une carte de sa manche*.
+ Le tour du joueur suivant est interrompu (et de rapidité opposé si attente de qqchose)

## Passer
+ Le joueur joue la carte *Passer son tour*.
+ On passe au tour d'initiative suivant.

## Les déplacements
Le nombre de mètres dont un personnage peut se déplacer par round est appelé *Allure*. On divise l'Allure par le nombre de cartes pour calculer le nombre de mètres par action.

|  Action  | Allure  |Bonus de sprint|Souffle|Max|
| -------- | ------- |-------------- | ----- |---|
|Marcher |Agilité|d4|1|na|
|Grimper|2+Grimper|d2|1|8|
|Nager|Nager|d2|1|5|
|Chevaucher|Variable|d10|1|na|

L'Allure est modifiée par la charge:

| Charges | Poids | Allure |
| ------- | ----- | ------ |
|Légères|3xForce|x3/4|
|Moyenne|6xForce|x1/2|
|Lourde|10xForce|x1/4|

L'atout *Boiteux* réduit l'Allure du personnage.

Utilisation du champ *controlledby*: https://app.roll20.net/forum/post/1033747/slug%7D>.

Le joueur peut jouer une autre carte d'action en plus de la carte de déplacement.

### Marcher
+ Les tokens des personnages sont verouillés.
+ Le joueur joue la carte *Marche*.
+ Le token du joueur est déverouillé pour ce joueur.
+ Le joueur bouge le token d'un nombre de mètres maximum à son Allure divisé par le nombre de cartes.
+ Vérouille le token.

### Courrir
+ Comme pour *Marcher* mais l'Allure est doublé.
+ Un malus de -4 est appliqué sur toutes les actions.

### Sprinter
+ Comme pour *Sprinter* mais on un bonus de sprint.
+ Le personnage dépense un point de souffle.

## Les tests de volonté

Les effets dépendent du nombre de succès du test de volonté:

+ Enervé (1 succès): La cible à un malus de -4 à sa prochaine action.
+ Distrait (2 succès): La cible est énervé et perd sa plus haute carte d'action.
+ Brisé (3 succès): La cible est distraite. Pioche une pépite.

Contre un groupe, le token choisi doit être celui du leader.

### Bluff
+ Le personnage joue la carte *Bluffer*.
+ Le personnage selectionne le token cible.
+ Un jet opposé de *Bluff* vs *Scruter* est effectué.
+ Les effets éventuels sont appliqués.
 
### Intimider
+ Le personnage joue la carte *Intimider*.
+ Le personnage selectionne le token cible.
+ Un jet opposé de *Intimider* vs *Tripes* est effectué.
+ Les effets éventuels sont appliqués.

### Ridiculiser
+ Le personnage joue la carte *Ridiculiser*.
+ Le personnage selectionne le token cible.
+ Un jet opposé de *Ridiculiser* vs *Ridiculiser* est effectué.
+ Les effets éventuels sont appliqués.

## Les manoeuvres de pistolets

Pour une action donnée, on peut avoir des cartes de modificateurs:

+ Viser pour selectionner une partie du corps

### Tirer

### Tirer par dessus la jambe
Pour reduire le CDT


###Johnny deux flingues

### Le retourné-tiré
+ Le personnage joue la carte *Retourné-tiré*.
+ Le personnage selectionne le token cible qui est au contact.
+ Jet d'Adresse TN7
+ Si plante, lache son arme

### Ventiler
On ne peut pas viser sauf sur la premiere cible et la prendre son temps.

+ Le personnage joue la carte *Ventiler*.
+ Le personnage selectionne le token cible.
+ Effectue le jet pour savoir combien de balles touchent. (Tirer à -2)
+ La premiere touche la cible
+ Pour chacune des autres, le joueur peut selectionner autre cible a moins de 2 mètres ou la meme.


### Prendre son temps
+ Le personnage selectionne une cible
+ Obtient un bonus de +2 (max +6) sur cette cible

### Recharger


### Main droite, main gauche

### Earp spécial


### Désarmer

