Seafile est un logiciel de cloud qui permet de sauvegarder et de partager des données. Celles-ci sont stockées sur les serveurs de l’école. Seafile intègre également un gestionnaire de versions, ce qui vous sera utile dans vos projets.

## Installation du client

Télécharger le client sur [seafile.com](https://www.seafile.com/en/download/), le lancer et ajouter un compte avec les paramètres suivants (identifiants école) :

![Ajout d’un compte dans le client Seafile](/img/wiki/seafile0.png)

Une fois connecté, vous pouvez :

- créer un dossier sur votre disque, qui sera synchronisé avec votre Seafile ;
- ou sélectionner un dossier existant sur votre disque : les données présentes seront ensuite envoyées sur le serveur.

Si des dossiers sont partagés avec vous sur Seafile, vous pouvez cliquer dessus pour les synchroniser. Vous aurez à nouveau le choix entre créer un dossier (conseillé) ou synchroniser avec un dossier existant.

![Choix du dossier à synchroniser dans le client Seafile](/img/wiki/synchro.png)

## Utilisation de l’interface web

### Partager une bibliothèque

1. Aller sur l’interface web, [seafile.emse.fr](https://seafile.emse.fr/), et ouvrir la bibliothèque à partager.
2. Cliquer sur « Partager ». Plusieurs options sont proposées :
   - **Lien de téléchargement** : donne accès au dossier à n’importe qui disposant du lien (un client de PI par exemple) ;
   - **Lien d’envoi** : permet à toute personne possédant le lien d’envoyer du contenu dans le dossier ;
   - **Partager avec un utilisateur** : saisir l’utilisateur avec qui partager le dossier. Attention, cet utilisateur doit s’être déjà connecté une fois à l’interface web de Seafile (ce qui crée son compte).

**NB** : lorsque tu cliques sur « Partager », tu partages le dossier dans lequel tu te trouves. Il est donc possible de ne partager qu’un sous-dossier de la bibliothèque.

### Créer un groupe d’utilisateurs

Utile pour partager des données lors d’un projet à plusieurs ou dans le cadre associatif.

1. Aller sur [seafile.emse.fr/#groups/](https://seafile.emse.fr/#groups/).
2. Cliquer sur « Nouveau groupe » et le nommer.
3. Cliquer sur le nom du groupe créé (ici « test »).

   ![Liste des groupes Seafile avec le groupe « test »](/img/wiki/groupes.png)

4. Cliquer sur « Nouvelle bibliothèque ». Celle-ci contiendra les fichiers partagés avec le groupe ; vous pouvez la protéger par un mot de passe.
5. Cliquer sur « Paramètres » puis « Gestion des membres » pour ajouter des membres au groupe.

   ![Gestion des membres d’un groupe Seafile](/img/wiki/membres.png)

6. Écrire le nom et le prénom de la personne dans le champ de recherche et l’ajouter. Attention, cette personne doit s’être connectée auparavant sur [seafile-ens-gcp.emse.fr](https://seafile-ens-gcp.emse.fr), sinon ça ne fonctionnera pas.

### Utiliser l’historique

Comme dit plus haut, il est possible de consulter l’historique d’un fichier en cliquant sur « Historique ».

![Historique des versions d’un fichier dans Seafile](/img/wiki/historique.png)

Pour restaurer une version, rien de plus simple : il suffit de cliquer sur « Restaurer ».

![Bouton Restaurer d’une ancienne version](/img/wiki/restaurer.png)
