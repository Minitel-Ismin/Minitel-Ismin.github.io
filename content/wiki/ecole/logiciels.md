Voici une petite liste de logiciels que nous vous recommandons, pour le travail comme pour vous. Si vous avez des suggestions, n’hésitez pas à nous les soumettre !

{{< tabs >}}

{{< tab "Windows" >}}

### Suites bureautiques

- Microsoft Office : licence gratuite avec l’école !
- [LibreOffice](https://fr.libreoffice.org/) : open source <3
- [MiKTeX](https://miktex.org/) : une des suites pour LaTeX, difficile à maîtriser mais très puissant pour écrire un rapport.

### Compléments bureautiques

- [Adobe Acrobat Reader](https://get.adobe.com/fr/reader/) : gratuit et efficace.
- [Foxit Reader](https://www.foxit.com/fr/pdf-reader/) : gratuit et léger !
- [PDFCreator](https://www.pdfforge.org/pdfcreator) : utilitaire d’impression et de fusion de PDF.

### Multimédia

- [PhotoFiltre 7](http://www.photofiltre-studio.com/pf7-en.htm) : Paint, mais en mieux.
- [VLC](https://www.videolan.org/vlc/) : lecteur multimédia.

### Internet, messagerie et réseau

- [Mozilla Firefox](https://www.mozilla.org/fr/firefox/) : avec un bloqueur de pubs !
- [Mozilla Thunderbird](https://www.thunderbird.net/) : supporte au moins 35 comptes de messagerie ! Voir les [paramètres pour les mails de l’école](/wiki/ecole/mail/).
- [FileZilla](https://filezilla-project.org/) : *le* client FTP.
- [Google Chrome](https://www.google.fr/chrome/) : navigateur alternatif.
- [PuTTY](https://www.putty.org/) : *le* client SSH sous Windows.
- [OpenVPN](https://openvpn.net/community-downloads/) : client de connexion VPN. Voir aussi la page sur le [VPN de l’école](/wiki/autres/vpn-ecole/).

### Programmation

- [Code::Blocks](https://www.codeblocks.org/downloads/) : C et C++.
- [Notepad++](https://notepad-plus-plus.org/) : éditeur de texte, couteau suisse, ouvre-boîte, décapsuleur…
- [SmartGit](https://www.syntevo.com/smartgit/) : gratuit pour les étudiants, permet de gérer vos dépôts git simplement.
- [GitKraken](https://www.gitkraken.com/) : comme SmartGit.

### VoIP

- [Mumble](https://www.mumble.info/) : open source, léger.
- [TeamSpeak](https://www.teamspeak.com/downloads) : complet, simple à utiliser.

### Utilitaires système et antivirus

- [Avast Antivirus Free](https://www.avast.com/) : gratuit.
- Et surtout : mettre à jour son système avec Windows Update !

### Divers mais très utile

- [KeePass](https://keepass.info/) : gestionnaire de mots de passe, open source.
- [7-Zip](https://www.7-zip.org/) : compression et décompression de fichiers.

{{< /tab >}}

{{< tab "Linux" >}}

### Linux et les gestionnaires de paquets

Vous utilisez une distribution Linux et avez un gestionnaire de paquets tout fait pour vous… Est-il nécessaire de vous donner les liens des logiciels ci-dessous ? Non ! Sous Ubuntu, Debian ou dérivés, faites :

```
sudo apt install [nom du programme]
```

Vous ne le trouvez pas ?

```
apt search [nom du programme]
```

Et pour les autres distributions ? Vous savez déjà probablement comment ça marche…

### Bureautique

- [LibreOffice](https://fr.libreoffice.org) : la version open source de Microsoft Office.
- [TeX Live](https://tug.org/texlive/) : la suite d’édition LaTeX de référence.
- [Okular](https://okular.kde.org) : lecteur de PDF de KDE.
- [MuPDF](https://mupdf.com) : lecteur de PDF ultra léger (sert de base à d’autres lecteurs).

### Multimédia

- [GIMP](https://www.gimp.org) : Paint mais en mieux, fait pour l’édition d’images matricielles.
- [Krita](https://krita.org/fr/) : logiciel libre pour le dessin, l’édition d’images et plus encore. En développement constant. L’interface plaira aux nostalgiques de Photoshop.
- [mpv](https://mpv.io) : lecteur vidéo, audio et images, avec support de plugins variés et de filtres vidéo haute qualité (de Lanczos au deep learning), la majorité de ses options étant dans un fichier de configuration. Se lance principalement en ligne de commande et se contrôle au clavier en plus de l’overlay (touches modifiables, bien évidemment). Submergé par le nombre d’options ? Ajoutez `profile=gpu-hq` dans le fichier, et vous êtes prêt.

### Internet, messagerie et réseau

- [Mozilla Firefox](https://www.mozilla.org/fr/firefox/)
- [ungoogled-chromium](https://github.com/ungoogled-software/ungoogled-chromium) : Chromium, sans Google, avec des paramètres pour la vie privée en bonus.
- [Mozilla Thunderbird](https://www.thunderbird.net)
- [FileZilla](https://filezilla-project.org) : **le** client graphique FTP si vous n’aimez pas la commande `ftp`.

### Programmation

- [VSCodium](https://vscodium.com/) : l’éditeur VS Code, open source, sans que Microsoft y mette du sien. Extensible pour tous les langages du monde et les logiciels de versioning, avec des plugins téléchargeables directement depuis son interface.
- [Vim](https://www.vim.org/) / [Neovim](https://neovim.io/) : le classique, l’indéfaitable, le top des éditeurs en ligne de commande. Extensible avec des plugins. Meilleur qu’Emacs.
- [GNU Emacs](https://www.gnu.org/software/emacs/) : le classique, l’indéfaitable, le top des éditeurs en ligne de commande. Extensible avec des plugins. Meilleur que Vim.

### VoIP

- [Mumble](https://www.mumble.info/) : open source, léger, et généralement le premier à utiliser les nouveaux formats et technos audio.

### Autres

- [KeePassXC](https://keepassxc.org) : gestionnaire de mots de passe (compatible KeePass), libre et avec un design léché.

### Antivirus

Anti-quoi ? Pas de ça. Ici, on met à jour. Sous Ubuntu, Debian et dérivés :

```
sudo apt update && sudo apt upgrade
```

### Ressources

Vous en voulez plus ? Pas de souci, la bibliothèque de logiciels disponibles sous Linux est déjà bien fournie et ne cesse de grandir. Voilà des listes de confiance si vous avez un type d’application en tête mais n’arrivez pas à le trouver (ou si vous cherchez des alternatives à une application Windows !) :

- [Awesome Linux Software](https://github.com/luong-komorebi/Awesome-Linux-Software)
- [AlternativeTo](https://alternativeto.net/platform/linux/)
- [Arch Wiki : List of applications](https://wiki.archlinux.org/title/List_of_applications) : liste de taille monstrueuse. La section [See also](https://wiki.archlinux.org/title/List_of_applications#See_also) est également très utile.

{{< /tab >}}

{{< tab "macOS" >}}

### Suites bureautiques

- Microsoft Office : licence gratuite avec l’école !

### Multimédia

- [GIMP](https://www.gimp.org) : Paint, mais genre en vachement mieux.
- [VLC](https://www.videolan.org/vlc/) : lecteur multimédia.

### Internet, messagerie et réseau

- Safari
- Mail

### Programmation

- Xcode

### VoIP

- [Mumble](https://www.mumble.info/) : open source, léger.

### Utilitaires système et antivirus

- Mettre à jour son système !

{{< /tab >}}

{{< /tabs >}}
