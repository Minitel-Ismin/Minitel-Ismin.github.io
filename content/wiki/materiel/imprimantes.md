## Installation

{{< tabs >}}

{{< tab "Windows" >}}

1. Ouvrir le lecteur réseau :

   ```
   \\192.168.130.2
   ```

2. Se connecter au lecteur réseau avec ton adresse `prenom.nom@etu.emse.fr`.

   ![Fenêtre de connexion au lecteur réseau](/img/wiki/connexion-lecteur-reseau.png)

3. Double-cliquer sur « imprimantes-gcp ».

4. Voilà ! Tu viens d’installer le pilote de l’imprimante sur ton PC.

   ![Lecteur réseau ouvert, avec le partage imprimantes-gcp](/img/wiki/lecteur-reseau.png)

{{< /tab >}}

{{< tab "Linux" >}}

1. Ajouter une imprimante réseau, de type « Imprimante Windows via SAMBA » :

   ```
   smb://192.168.130.2/imprimantes-gcp
   ```

2. Spécifier le pilote voulu (dans le cas de notre test, [le pilote Ricoh MP C3004](https://www.openprinting.org/download/PPD/Ricoh/PS/Ricoh-MP_C3004_PS.ppd)).

3. Attention, à la première impression il faut s’authentifier sur la file d’impression : clic droit sur votre imprimante, « Voir la file d’attente », puis clic droit sur la file d’attente et « Authentification ».

   ![File d’attente de l’imprimante sous Linux, menu Authentification](/img/wiki/linux.png)

{{< /tab >}}

{{< tab "macOS" >}}

Cette partie n’est pas encore rédigée. Si tu as réussi l’installation sur Mac, [dis-nous comment](/contact/) !

{{< /tab >}}

{{< /tabs >}}

## Récupérer ton code PUK

1. Avec un navigateur, se connecter sur [http://192.168.130.2/watchdoc](http://192.168.130.2/watchdoc).

   ![Page de connexion Watchdoc](/img/wiki/watchdoc.png)

2. Noter le code PUK.

   ![Code PUK affiché dans Watchdoc](/img/wiki/code-puk.png)

   Sur ce site, tu trouveras aussi la liste des documents que tu as imprimés.

3. Lors de la première utilisation du copieur, passer son badge sur le copieur puis suivre les instructions.

   ![Écran du copieur demandant de passer le badge](/img/wiki/copieur1.png)

   ![Écran du copieur demandant le code PUK](/img/wiki/copieur2.png)

   ![Écran du copieur une fois le badge associé](/img/wiki/copieur3.png)

## Scanner vers un dossier

Pour utiliser la fonction « Scan to folder », choisis le répertoire réseau destinataire correspondant à ton entité (ELEVES). Les documents sont ensuite à récupérer à cette adresse :

```
\\sgc.emse.fr\Photocopieur\ELEVES
```

Les documents ne doivent pas être stockés dans ce répertoire, qui est régulièrement nettoyé (tu as les droits pour y supprimer des fichiers).

## Impression

Il ne reste plus qu’à utiliser l’imprimante : sélectionne « imprimantes-gcp sur imprimantes-gcp » au moment d’imprimer depuis Word ou Acrobat Reader. Il faut ensuite badger sur le copieur et sélectionner le document à imprimer.
