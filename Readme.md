# FinClubDemo 
# Monorepo

This repository contains multiple related frontend and backend applications for various tasks. It uses a monorepo structure to organize and manage the projects efficiently.

---

## 📁 Project Structure

FinClubDemo/
├── taskone/
│ ├── frontend/ # Angular app
│ └── backend/ # Node.js API
├── tasktwo/
│ └── loancalc/ # Angular app (no backend)
├── taskthree/
│ └── multilevel/ # Angular app (no backend)
└── package.json # Root-level scripts and settings

---

## 📦 Workspaces

This repo uses **npm workspaces** to manage dependencies across subprojects. The defined workspaces are:

- `taskone/client`

- `taskone/server`

- `tasktwo/loancalc`

- `taskthree/multilevel`

To install all dependencies at once:

```bash

npm run install-all

