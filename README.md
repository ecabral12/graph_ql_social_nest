## Projet graphql avec Next.js / Apollo Server

### Prérequis

- Créer un fichier `.env` à la racine du projet `backend` et y ajouter les variables d'environnement comme indiqué dans le fichier `.env.example` du dossier `backend`.

- Initialiser la base de données avec les commandes suivantes :

```bash
cd backend
```

```bash
npx prisma db push
```

### Lancer le backend

#### Installation des dépendances

```bash
cd backend
```

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

#### Lancer le serveur (soit en mode développement, soit en mode production)

```bash
npm run compile && npm run start
# ou
yarn compile && yarn start
# ou
pnpm compile && pnpm start
```

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### Lancer le frontend

#### Installation des dépendances

```bash
cd front
```

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

#### Lancer le serveur (soit en mode développement, soit en mode production)

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

```bash
npm run build && npm run start
# ou
yarn build && yarn start
# ou
pnpm build && pnpm start
```

## Projet graphql avec Next.js / Apollo Server
