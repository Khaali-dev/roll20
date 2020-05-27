# Système d'initiative

+ Déclaration de passage en mode round. Le système d'initiative est activé.
    + Le turn order est affiché, initialement vide.
    + Le numéro du round est 0.
 + Déclaration d'un nouveau round
    + Le système d'initiative doit être vide.
    + Le numéro du round est incrémenté de 1.
    + Chaque joueur reçoit un moyen d'activer son initiative (bouton, carte ?)
+ Un joueur active son initiative.
    + On tire un jet d'initiative.
    + Le joueur peut dépenser des pépites
    + Le joueur valide le jet. Le nombre de cartes d'initiative est inséré dans le turn order.
    + Le moyen d'activation d'initiative disparait.
    + Si le joueur possède l'atout *Tête froide*, le moyen de l'activer apparait. Si le joueur l'utilise, sa carte la plus basse est remplacé par la nouvelle.
    + Si le joueur possède des points de rage, il peut en dépenser pour obtenir de nouvelles cartes.
+ Le MJ active l'initiative des PNJs.
    + Le MJ sélectionne un token
    + Le MJ reçoit un moyen d'activer l'nitiative du personnage selectionné

! Un seul item à la fois dans le turn order pour cacher l'ordre général

# Système de carte

#### Après la réunion
+ Utilisation d'un menu (avec les cartes ?)
+ Bouton de selection/deselection

#### Les fonctions à utiliser
+ giveCardToPlayer(cardid, playerid)
+ takeCardFromPlayer(playerid, cardid)
+ recallCards(deckid, type(optional))

#### Les évènements
+ on("ready", function() {
+ on("add:graphic", function(obj) {} Si mis sur la table
+ on("destroy:graphic", function(obj) {} Si enlevé de la table
+ on("change:graphic", function(obj) {} ???
+ on("change:player:_online", function(obj){} 

#### Les decks
+ Créer un deck complet pour le GM avec toutes les actions. Possibilité de l'étendre.
+ Une carte peut être joué pendant une phase du round
    + La détermination de l'initiative
    + Après un jet de dés: les pépites, ...
    + Après la résolution de l'intiative (les cartes sont affichées dans le turn order)
    + Au début du tour d'un personnage: c'est la liste des actions possibles. Gestion possible d'un historique comme pour 'Prendre son temps'..
    + Après une action d'un personnage: c'est un modificateur, comme viser une partie spécifique, etc...

#### Utilisation PC:
+ On est à une phase du cycle d'action ou d'initiative.
+ On est sur un playerId, tokenId, characterId
+ On supprime toutes les cartes de la main du joueur.
+ On clone du deck complet les cartes du GM pour constituer le deck du joueur pour cette action.
+ PB: Quand on joue une carte, on ne connait pas quel personnage le joue, on a seulement la cardId
+ --> Ajouter dans la carte les informations:
    + au moment ou elle est joué sur la table (pour un NPC en fonction de la selection).

####Utilisation NPC:
- Quand on selectionne un token en tant que MJ, il faut rafraichir les cartes pour le token.
- PB: Pas d'event remontant la selection.
 --> Passer par une macro de selection qui doit mettre une aura pour afficher le token controlé.

# Les actions

#### Mettre une carte dans sa manche
+ Le joueur joue la carte *Mettre une carte dans la manche*.
+ La carte d'initiative est placé à coté du joueur.
+ On passe au tour suivant.

#### Jouer une carte de sa manche.
+ Le joueur joue la carte *Jouer une carte de sa manche*.
+ Le tour du joueur suivant est interrompu (et de rapidité opposé si attente de qqchose)
+ Le joueur interrompu voit sa phase d'action annulé. Son deck est supprimé.

#### Passer
+ Le joueur joue la carte *Passer son tour*.
+ On passe au tour d'initiative suivant.

### Les déplacements
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

#### Marcher
+ Les tokens des personnages sont verouillés.
+ Le joueur joue la carte d'action.
+ Le token du joueur est déverouillé pour ce joueur.
+ Le joueur bouge le token d'un nombre de mètres maximum à son Allure divisé par le nombre de cartes.
+ Vérouille le token.

#### Courrir
+ Comme pour *Marcher* mais l'Allure est doublé.
+ Un malus de -4 est appliqué sur toutes les actions.

#### Sprinter
+ Comme pour *Sprinter* mais on un bonus de sprint.
+ Le personnage dépense un point de souffle.

### Les tests de volonté

Les effets dépendent du nombre de succès du test de volonté:

+ Enervé (1 succès): La cible à un malus de -4 à sa prochaine action.
+ Distrait (2 succès): La cible est énervé et perd sa plus haute carte d'action.
+ Brisé (3 succès): La cible est distraite. Pioche une pépite.

Contre un groupe, le token choisi doit être celui du leader.

#### Bluff
+ Le personnage joue la carte d'action.
+ Le personnage selectionne le token cible.
+ Un jet opposé de *Bluff* vs *Scruter* est effectué.
+ Les effets éventuels sont appliqués.
 
#### Intimider
+ Le personnage joue la carte d'action.
+ Le personnage selectionne le token cible.
+ Un jet opposé de *Intimider* vs *Tripes* est effectué.
+ Les effets éventuels sont appliqués.

#### Ridiculiser
+ Le personnage joue la carte d'action.
+ Le personnage sélectionne le token cible.
+ Un jet opposé de *Ridiculiser* vs *Ridiculiser* est effectué.
+ Les effets éventuels sont appliqués.

### Les manoeuvres de pistolets

Pour une action donnée, on peut avoir des modificateurs:

+ Viser pour sélectionner une partie du corps.
+ Tirer par dessus la jambe pour augmenter la CDT.
+ Johnny deux flingues
+ Main droite - Main gauche pour échanger ses pistolets de main.

#### Tirer
+ Le personnage joue la carte d'action.
+ Le personnage sélectionne le token cible.

#### Le retourné-tiré
+ Le personnage joue la carte d'action.
+ Le personnage selectionne le token cible qui est au contact.
+ Jet d'Adresse TN7
+ Si plante, lache son arme

#### Ventiler
On ne peut pas viser sauf sur la premiere cible et la prendre son temps.

+ Le personnage joue la carte d'action.
+ Le personnage sélectionne le token cible.
+ Effectue le jet pour savoir combien de balles touchent. (Tirer à -2)
+ La première touche la cible
+ Pour chacune des autres, le joueur peut sélectionner autre cible a moins de 2 mètres ou la meme.

#### Prendre son temps

+ Le personnage selectionne une cible
+ Obtient un bonus de +2 (max +6) sur cette cible

#### Recharger

#### Earp spécial

#### Désarmer
