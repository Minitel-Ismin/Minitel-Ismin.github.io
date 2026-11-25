Vous souhaitez créer un accès SFTP sur votre machine, sans que cet utilisateur puisse accéder à tous les fichiers ? Le chroot est fait pour vous.

## Prérequis

Installer un serveur OpenSSH sur sa machine :

```
apt-get update && apt-get upgrade && apt-get install openssh-server
```

Les commandes de cette page sont à lancer en tant que root.

## Configuration

### Ajout d’un utilisateur

Sous Linux, on ajoute un utilisateur avec la commande suivante. Il vous sera ensuite demandé le mot de passe associé à ce compte.

```
adduser nom_utilisateur
```

S’il n’existe pas, créer le répertoire de l’utilisateur :

```
mkdir /home/nom_utilisateur
```

### Configuration d’OpenSSH

Dans le fichier `/etc/ssh/sshd_config` :

```
nano /etc/ssh/sshd_config
```

rajouter, décommenter ou modifier les lignes suivantes :

```
port 22
PermitRootLogin no
AllowUsers nom_utilisateur root
[...]
UsePAM yes
[...]
Match user nom_utilisateur
    ChrootDirectory /home/nom_utilisateur/
    ForceCommand internal-sftp
    AllowTCPForwarding no
```

### Explications

- `port 22` : définit le port d’écoute du service SSH.
- `PermitRootLogin no` : il ne sera pas possible de se connecter en tant que root sur le serveur. Il faudra se connecter en tant qu’utilisateur, puis devenir root (`su -`).

**Attention !** Assurez-vous qu’un autre utilisateur est configuré sur le serveur : par la suite, l’utilisateur `nom_utilisateur` n’aura plus accès au shell via SSH. Si ce n’est pas le cas, remplacez `no` par `yes` (déconseillé).

- `AllowUsers` : définit les utilisateurs ayant le droit de se connecter au serveur par SSH. Ici, uniquement `nom_utilisateur` et root.
- `Match user` : les instructions suivantes ne s’appliquent qu’aux utilisateurs indiqués, ici `nom_utilisateur`.
- `ChrootDirectory` : cloisonne la connexion de l’utilisateur dans le dossier indiqué, ici `/home/nom_utilisateur/`.
- `ForceCommand internal-sftp` : l’utilisateur ne peut utiliser que SFTP.
- `AllowTCPForwarding no` : interdit les tunnels SSH.

On redémarre ensuite le service :

```
service ssh restart
```

### Mise en place des droits

Dans un premier temps, on donne le répertoire de l’utilisateur à root :

```
chown root:root /home/nom_utilisateur/
```

À ce stade, `nom_utilisateur` a accès au répertoire `/home/nom_utilisateur/` mais ne peut rien y faire. On lui crée donc un répertoire où il pourra faire ce qu’il veut (avec des droits restreints quand même) :

```
mkdir /home/nom_utilisateur/jail/
chown nom_utilisateur:nom_utilisateur /home/nom_utilisateur/jail/
chmod -R 755 /home/nom_utilisateur/jail/
```

Enfin, comme promis, on coupe l’accès au shell de `nom_utilisateur` :

```
chsh nom_utilisateur -s /bin/true
```

## Source

[debian-facile.org](https://debian-facile.org/doc:reseau:ssh:tp-sftp-via-openssh-server)
