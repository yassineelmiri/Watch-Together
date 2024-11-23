## Contexte du projet

![image](https://github.com/user-attachments/assets/8106a2da-cd2a-46df-9bd8-20378c4f1c94)

![image](https://github.com/user-attachments/assets/c223eb35-b440-410b-af10-06608d274b57)


Le projet consiste en une plateforme de gestion et de partage de playlists vidéo dans des "ROOMs" en ligne. Il permet aux utilisateurs de créer, gérer et partager des playlists avec d'autres participants dans des sessions en temps réel. Chaque ROOM offre une expérience de diffusion en direct et synchronisée, permettant aux utilisateurs d'interagir avec les autres membres tout en suivant la diffusion des vidéos.

## Fonctionnalités principales

### 1. Gestion des playlists
- Les utilisateurs peuvent créer une ou plusieurs playlists contenant des vidéos.
- Les playlists peuvent être partagées dans des "ROOMs" pour une période définie.
  
### 2. Gestion des invitations et des "ROOMs"
- Le propriétaire de la playlist a la possibilité d'inviter des participants à rejoindre un "ROOM" en envoyant des invitations par email.
- Le propriétaire peut accepter ou refuser les participants dans la ROOM.

### 3. Gestion des sessions en ROOM
- Les vidéos de la playlist sont diffusées en direct et sont synchronisées pour tous les participants.
- Les participants peuvent voir et interagir avec les autres membres présents dans la ROOM.
- L'identité du propriétaire est mise en évidence dans la ROOM.
- La fonctionnalité Push-to-Talk permet aux participants de s'exprimer ou de commenter pendant la session.

### 4. Fonctionnalités du propriétaire
- Le propriétaire peut arrêter une vidéo ou passer à la suivante, permettant un contrôle total de la session de diffusion.

### 5. Notifications
- Si un participant tente de rejoindre une ROOM avant l’heure prévue, un message d’erreur est affiché.
- Un email est envoyé aux participants invités peu avant le début de la session.
- À la fin de la session, un message notifie la fin de la diffusion.

## Stack technique et bibliothèques
- **Frontend** :
  - React.js avec TypeScript
  - Tailwind CSS pour la mise en page
  - Axios pour la gestion des requêtes HTTP
  - React-Player pour la diffusion des vidéos
  - Redux pour la gestion de l'état
  - Socket.IO pour la gestion de la communication en temps réel

- **Backend** :
  - NestJS pour la structure du serveur et des API
  - nodemailer pour l'envoi des emails
  - class-validator pour la validation des données
  - MongoDB et Mongoose pour la gestion de la base de données

## Liberté d'implémentation

Les développeurs ont la possibilité de combiner plusieurs services ou bases de données pour répondre aux besoins de scalabilité, flexibilité et performance de la plateforme. Cela inclut l'utilisation de microservices ou la possibilité de mettre en place une architecture distribuée pour gérer les demandes à grande échelle.

## Installation

1. **Cloner le repository** :
   ```bash
   git clone <url_du_repository>
   cd <dossier_du_projet>
   ```

2. **Installer les dépendances** :
   - Frontend (React) :
     ```bash
     cd new-play-frontend
     npm install
     ```
   
   - Backend (NestJS) :
     ```bash
     cd new-play-backend
     npm install
     ```

3. **Configurer les variables d'environnement** :
   Assurez-vous de créer les fichiers `.env` dans les répertoires frontend et backend pour configurer les API, l'email, et la base de données.

4. **Lancer les serveurs** :
   - Frontend :
     ```bash
     npm start
     ```
   - Backend :
     ```bash
     npm run start
     ```

5. **Accéder à l'application** :
   - Le frontend sera accessible à `http://localhost:3000`.
   - Le backend sera accessible à `http://localhost:4000`.

## Contribution

1. Fork le projet.
2. Crée une branche (`git checkout -b feature/nouvelle-fonctionnalité`).
3. Fais tes modifications.
4. Commit tes changements (`git commit -am 'Ajoute une nouvelle fonctionnalité'`).
5. Push vers ta branche (`git push origin feature/nouvelle-fonctionnalité`).
6. Crée une Pull Request.

## Auteurs

- **[Yassine Elmiri]** - Développeur principal

![image](https://github.com/user-attachments/assets/dba42da3-be1d-49ce-be9c-99cee13d606d)
