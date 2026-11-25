Les mails de l’école ne sont sans doute pas vos seuls mails, et devoir passer par une interface web peut être frustrant. L’idéal est d’utiliser un client mail installé sur ta machine, comme Thunderbird (gratuit) ou Microsoft Outlook (gratuit pendant tes années à l’EMSE), ou l’application mail de ton téléphone.

Cette page ne donne que les paramètres serveur à rentrer dans le client mail pour que ça fonctionne.

## Prérequis

- Savoir ajouter un compte mail sur son client mail.
- Savoir passer en réglage manuel lors de l’ajout du compte.
- Connaître son mot de passe école (merci Captain Obvious).

## Paramètres

- **Email** : ton adresse mail école
- **Mot de passe** : ton mot de passe école
- **Serveur entrant** : IMAP ou POP3, selon ta préférence (IMAP recommandé)

  ```
  Nom d'hôte : partage.emse.fr
  Port : 993
  Sécurité : SSL/TLS
  Méthode d'authentification : mot de passe normal
  Identifiant : prenom.nom@etu.emse.fr
  ```

- **Serveur sortant** :

  ```
  Nom d'hôte : partage.emse.fr
  Port : 465
  Sécurité : SSL/TLS
  Méthode d'authentification : mot de passe normal
  Identifiant : prenom.nom@etu.emse.fr
  ```

## Problèmes de synchronisation

Lorsque le serveur reçoit beaucoup de requêtes, il est possible que Thunderbird et d’autres logiciels n’arrivent pas à se synchroniser. Dans ce cas, une solution possible est d’augmenter le délai de connexion.

Sous Thunderbird :

1. Aller dans **Préférences > Éditeur de configuration**.
2. Accepter les risques.
3. Rechercher `mailnews.tcptimeout`.
4. Double-cliquer et augmenter la valeur de 100 à 200.
