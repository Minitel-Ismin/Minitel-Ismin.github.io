Si vous avez besoin des serveurs de licences (`kinshasa.emse.fr`) ou des [lecteurs réseau](/wiki/materiel/lecteurs-reseau/) (`gcp-ens.emse.fr`, pour télécharger les logiciels d’enseignement) et que vous n’êtes pas à l’école, vous pouvez vous connecter au VPN de l’école pour accéder quand même à ces services.

Si vous avez déjà utilisé OpenVPN, ce sera un jeu d’enfant.

## Récupérer la configuration VPN

1. Se connecter au [portail captif](https://fw-cgcp.emse.fr/auth) (oui, oui, on peut le faire depuis un autre réseau que celui de l’école).
2. Une fois connecté, cet écran devrait s’afficher :

   ![Page d’accueil du portail captif de l’école](/img/wiki/portail.png)

3. Cliquer sur le 3ᵉ lien, « Profil VPN SSL pour clients OpenVPN ».

Il reste ensuite à placer les fichiers de configuration dans le dossier du client OpenVPN, à se connecter à `openvpn_client` et à entrer ses identifiants EMSE.

## Utiliser le client OpenVPN

{{< tabs >}}

{{< tab "Windows" >}}

1. Télécharger l’installateur sur [openvpn.net](https://openvpn.net/community-downloads/).
2. Dézipper le dossier `openvpn_client.zip`.
3. Copier ce dossier dans `C:\Program Files\OpenVPN\config`.
4. Lancer OpenVPN GUI (il se lance au démarrage depuis la version 2.4).
5. Dans la barre des tâches, sélectionner `openvpn_client`, puis entrer ses identifiants école.

![Icône OpenVPN dans la barre des tâches, profil openvpn_client](/img/wiki/barre-tache.png)

![Fenêtre de connexion d’OpenVPN GUI](/img/wiki/openvpn-gui.png)

{{< /tab >}}

{{< tab "Linux" >}}

1. Dézipper le dossier `openvpn_client.zip` dans un dossier.
2. Installer le paquet `network-manager-openvpn-gnome` :

   ```
   sudo apt install network-manager-openvpn-gnome
   ```

   ![Import d’une configuration VPN dans NetworkManager](/img/wiki/linux1.png)

3. Naviguer vers le dossier `openvpn_client` dézippé et sélectionner le fichier `openvpn_client.ovpn`.
4. Entrer ses identifiants école.
5. **Important** : dans cette fenêtre de configuration, dans « Paramètres IPv4 », aller dans « Routes » (en bas) et cocher « Utiliser cette connexion uniquement pour les ressources de son réseau », afin de bénéficier du split tunneling.
6. Une nouvelle connexion devrait apparaître (elle devrait s’appeler `openvpn_client`).

   ![Nouvelle connexion VPN openvpn_client dans NetworkManager](/img/wiki/linux2.png)

7. Si tout fonctionne, vous devriez voir le message suivant :

   ![Notification de connexion VPN établie](/img/wiki/linux3.png)

{{< /tab >}}

{{< /tabs >}}

## En cas de problème

Si cela ne semble pas fonctionner, vérifiez que les résolutions DNS de `quebec.emse.fr` et `kinshasa.emse.fr` fonctionnent. Pour cela, ouvrez une console et tapez :

```
ping quebec.emse.fr
```

Si l’adresse IP s’affiche, c’est que tu es bien connecté au VPN. S’il ne répond pas, c’est normal : le ping est bloqué par le pare-feu.

Tu peux également taper la commande `netstat -nr` et vérifier que les routes de l’école ont bien été ajoutées, ou vérifier que ton adresse IP est de la forme `10.60.77.XX`.

Toujours bloqué ? [Contacte MINITEL](/contact/).
