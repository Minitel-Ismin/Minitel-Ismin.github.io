> En informatique, une machine virtuelle (VM) est une illusion d’un appareil informatique créée par un logiciel d’émulation. Le logiciel d’émulation simule la présence de ressources matérielles et logicielles telles que la mémoire, le processeur, le disque dur, voire le système d’exploitation et les pilotes, permettant d’exécuter des programmes dans les mêmes conditions que celles de la machine simulée.
>
> Un des intérêts des machines virtuelles est de pouvoir s’abstraire des caractéristiques de la machine physique utilisée (matérielles et logicielles — notamment système d’exploitation), permettant une forte portabilité des logiciels et la gestion de systèmes hérités étant parfois conçus pour des machines ou des environnements logiciels anciens et plus disponibles.

Source : [Wikipédia](https://fr.wikipedia.org/wiki/Machine_virtuelle)

## Matériel nécessaire

- Le logiciel [VirtualBox](https://www.virtualbox.org/wiki/Downloads), préalablement installé.
- Le fichier `.ova` de ta machine virtuelle, préalablement téléchargé.

## Installation

1. Lancez VirtualBox et cliquez sur **Fichier > Importer un appareil virtuel**.

   ![Menu Fichier de VirtualBox, entrée « Importer un appareil virtuel »](/img/wiki/fichier.png)

2. Sélectionnez le fichier `.ova` de votre machine virtuelle.

   ![Fenêtre d’import de VirtualBox, choix du fichier .ova](/img/wiki/importer1.png)

   ![Fichier .ova sélectionné dans la fenêtre d’import](/img/wiki/importer1bis.png)

3. Cliquez sur **Importer**.

   ![Récapitulatif de l’appareil virtuel avec le bouton Importer](/img/wiki/importer2.png)

4. Patientez pendant le chargement : ça peut prendre quelques minutes.

   ![Barre de progression de l’import](/img/wiki/chargement.png)

5. Une fois le fichier chargé, cliquez sur **Configuration** :

   - dans l’onglet **Réseau**, passez en NAT ;

     ![Onglet Réseau de la configuration, mode d’accès NAT](/img/wiki/reseau.png)

   - dans l’onglet **USB**, décochez la case « Activer le contrôleur USB ».

     ![Onglet USB de la configuration, contrôleur USB désactivé](/img/wiki/usb.png)

6. Il ne vous reste plus qu’à lancer votre machine virtuelle et à fermer les premiers avertissements.

   ![Bouton Démarrer de VirtualBox](/img/wiki/demarrer.png)

   ![Avertissement affiché au premier démarrage](/img/wiki/warning.png)

## Et voilà, votre machine est prête !

![Bureau Ubuntu de la machine virtuelle démarrée](/img/wiki/ubuntu_final.png)
