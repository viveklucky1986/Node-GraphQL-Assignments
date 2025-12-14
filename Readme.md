# Employee Dashboard – Full-Stack GraphQL Application

A full-stack **Employee Management Dashboard** built using **Node.js, GraphQL, and React (Vite)**.
The project demonstrates pagination, role-based access control (RBAC), CRUD operations, and dynamic UI interactions.

This repository is intended as a **GraphQL + React assignment / reference implementation**.

---

## 📦 Tech Stack

### Backend

* Node.js
* GraphQL (Apollo Server)
* File-based data store (`employees.js`)
* Role-based access enforcement

### Frontend

* React + TypeScript
* Vite
* Apollo Client
* Custom CSS (no UI framework)

### Tooling

* Git
* npm
* PowerShell (Windows-friendly)

---

## 📁 Project Structure

```
employee-dashboard/
│
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   ├── employees.js
│   │   │   └── employeeStore.js
│   │   ├── graphql/
│   │   │   ├── schema.js
│   │   │   └── resolvers.js
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── graphql/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   └── package.json
│
└── README.md
```

---

## ✨ Features

* 📋 Employee listing with **pagination**
* ➕ Add employee
* ✏️ Edit employee
* ❌ Delete employee
* 🧩 Multi-select **Subjects** (derived dynamically)
* 🔐 **Role-Based Access Control**

  * Admin can add/edit/delete
  * Non-admin users have read-only access
* 🍔 Hamburger menu navigation
* 🪟 Modal-based forms
* ⚡ Real-time UI updates after mutations

---

## 🔐 Roles

Supported roles include:

* `ADMIN`
* `MANAGER`
* `EMPLOYEE`
* `TEAM_LEAD`
* Additional roles defined in data

RBAC is enforced at:

* UI level (buttons/menus hidden)
* Backend level (mutation checks)

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/viveklucky1986/Node-GraphQL-Assignments.git
cd Node-GraphQL-Assignments
```

---

### 2️⃣ Checkout Assignment Branch

```bash
git checkout employee-dashboard
```

---

## 🛠 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:4000/graphql
```

---

## 🖥 Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔁 Running Both Together

Both servers must run simultaneously:

| Service  | Command     | Port |
| -------- | ----------- | ---- |
| Backend  | npm run dev | 4000 |
| Frontend | npm run dev | 5173 |

---

## 🧪 Sample GraphQL Query

```graphql
query {
  employees(page: 1, limit: 20) {
    data {
      id
      name
      className
      subjects
      role
    }
    total
  }
}
```

---

## 🧪 Sample Mutation

```graphql
mutation {
  updateEmployee(
    id: "3"
    name: "Updated Name"
    age: 30
    className: "Accounting"
    subjects: ["Accounting", "Agile"]
    attendance: 90
    role: EMPLOYEE
  ) {
    id
    name
    subjects
  }
}
```

---

## 🧠 Data Persistence

* Data is stored in:

  ```
  backend/src/data/employees.js
  ```
* File updates automatically on add/edit/delete
* Subjects list is derived dynamically from employee data

---

## ⚠️ Notes & Limitations

* File-based storage (no database)
* Designed for assignments / demos
* No authentication (roles are simulated)
* Not production-ready

---

## 🧹 Git Ignore Rules

Ignored files include:

* `node_modules/`
* `.env`
* `.vite/`
* `*.ps1`

---

## 📜 License

Provided for educational and assignment use only.

---

## 👤 Author

**Vivek Shah**
GitHub: [https://github.com/viveklucky1986](https://github.com/viveklucky1986)
