# cook-book
# 📦 Installation d'une application React + Node.js + MongoDB

## ✅ Prérequis

- Node.js
- Git
- MongoDB (local ou MongoDB Atlas)
- Un terminal (Git Bash, PowerShell, etc.)

---

## 1. Cloner le dépôt GitHub

git clone git@github.com:utilisateur/nom-du-repo.git
cd nom-du-repo

# ou en HTTPS :
# git clone https://github.com/utilisateur/nom-du-repo.git

## Configuration des variables d'environnement

cd server
cp .env.example .env

# Modifier le fichier .env avec les valeurs nécessaires :

PORT=3000
MONGO_URL=mongodb://localhost:27017/cook-book
SALT=mettre_un_salt_secure
SECRET_KEY=mettre_une_cle_secrete
NODE_ENV=development
CLIENT_URL=http://localhost:5173
PER_PAGE=
ARTICLES_PER_PAGE=

---

## Installation des dépendances

### Backend

cd backend
npm install

### Frontend

cd frontend
npm install

---

## Lancer l'application

### Backend (port 3000)

cd backend
npm run dev

### Frontend (port 5173 avec Vite)

cd frontend
npm run dev

---

## Accès à l'application

- Frontend : http://localhost:5173
- Backend API : http://localhost:3000/ROUTES_DEFINIES
---

## 🛠 Astuces

- Vérifie que MongoDB tourne (service local ou cluster Atlas)
- Utilise `concurrently` si tu veux lancer frontend + backend avec une seule commande
- Si Erreur de MongoDB : 
                        findstr mongod
                        C:\Windows\System32>net start MongoDB
                        Le service MongoDB Server (MongoDB) démarre.
                        Le service MongoDB Server (MongoDB) a démarré.

---