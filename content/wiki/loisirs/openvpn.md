Un VPN (Virtual Private Network) permet de « relier » deux ordinateurs distants. Il permet entre autres de gérer des parcs informatiques distants comme s’ils étaient à côté. Le VPN met deux ordinateurs distants sur le même réseau local, grâce à l’établissement d’un tunnel entre les deux machines.

## Prérequis

- Un ordinateur sous n’importe quel OS.
- Un serveur sous Debian Jessie ou équivalent.
- De la patience.

Les commandes côté serveur sont à lancer en tant que root.

## Installation (serveur)

### Un peu de ménage

On commence par installer OpenVPN sur le serveur :

```
apt-get update && apt-get upgrade && apt-get install openvpn
```

On récupère ensuite les scripts easy-rsa, qui permettront de générer les certificats. Ils sont en général placés dans `/usr/share/easy-rsa` (sous certaines versions de Debian, dans `/usr/share/openvpn/doc/easy-rsa/2.0`) :

```
cp -a /usr/share/easy-rsa /etc/openvpn/
cd /etc/openvpn/easy-rsa
```

On initialise les variables des certificats et on purge les anciennes clés :

```
source vars
./clean-all
```

### Nos premiers certificats

On crée le certificat de l’autorité de certification :

```
./build-ca
```

Vous devriez avoir dans le dossier `/etc/openvpn/easy-rsa/keys` les fichiers `ca.crt` et `ca.key`.

Afin de fluidifier les échanges entre le serveur et le client tout en maximisant la sécurité, on génère la clé Diffie-Hellman :

```
./build-dh
```

On génère ensuite les certificats du serveur :

```
./build-key-server nom_serveur
```

### Notre configuration serveur

On copie le modèle de configuration serveur d’OpenVPN dans le dossier `/etc/openvpn/` :

```
gunzip -c /usr/share/doc/openvpn/examples/sample-config-files/server.conf.gz > /etc/openvpn/server.conf
```

On l’édite de façon à ce que les lignes suivantes soient décommentées :

```
user nobody
group nogroup
comp-lzo
ca /etc/openvpn/easy-rsa/keys/ca.crt
cert /etc/openvpn/easy-rsa/keys/nom_serveur.crt
key /etc/openvpn/easy-rsa/keys/nom_serveur.key # This file should be kept secret
dh /etc/openvpn/easy-rsa/keys/dh2048.pem
push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS 8.8.8.8"
push "dhcp-option DNS 8.8.4.4"
```

Ici, on a utilisé les DNS de Google ; rien ne vous empêche d’en utiliser d’autres.

On teste la configuration :

```
cd /etc/openvpn/
systemctl start openvpn@server
```

On préfère `systemctl` à `service` car il permet d’indiquer explicitement la configuration à utiliser : on peut ainsi lancer plusieurs VPN sur le même serveur.

```
ifconfig tun0
```

Si rien ne sort de cette commande, recommencez le tuto ; sinon, vous pouvez passer à la suite.

### Un peu de réseau

Afin de permettre la translation des paquets de l’interface `tun0` vers l’interface réseau principale du serveur, il faut « natter » certains paquets :

```
echo "net.ipv4.ip_forward=1" > /etc/sysctl.d/NAT.conf
sysctl -p /etc/sysctl.d/NAT.conf
iptables -t filter -P FORWARD ACCEPT
iptables -t filter -A INPUT -p udp --dport 1194 -j ACCEPT
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

On rend ces règles persistantes :

```
iptables-save > /etc/iptables.rules
```

## Notre configuration client

On se place dans le dossier easy-rsa d’OpenVPN :

```
cd /etc/openvpn/easy-rsa/
```

On génère la clé et le certificat du client :

```
./build-key nom_client
```

On récupère un modèle de configuration client :

```
cp /usr/share/doc/openvpn/examples/sample-config-files/client.conf /etc/openvpn/
```

On copie ensuite les fichiers `ca.crt`, `nom_client.crt` et `nom_client.key` sur le PC du client, sans oublier le modèle de configuration client.

Dans la configuration client, maintenant sur le PC du client, on remplace l’adresse du serveur par son IP et on modifie les chemins d’accès aux fichiers `ca.crt`, `nom_client.crt` et `nom_client.key`.

Si vous ne voulez pas avoir plusieurs fichiers, il est tout à fait possible de tout mettre dans le fichier de configuration client : il suffit de copier le contenu des fichiers ci-dessus à la fin du fichier, respectivement entre les balises `<ca>…</ca>`, `<cert>…</cert>` et `<key>…</key>`.

On ajoute enfin cette ligne à la fin du fichier :

```
redirect-gateway def1
```

Sous Windows, renommez ce fichier en `config.ovpn` et placez-le dans le dossier `config` d’OpenVPN.

## Source

[debian-facile.org](https://debian-facile.org/doc:reseau:vpn:openvpn)
