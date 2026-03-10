# 📱 Payoo Mobile Banking Web App

Payoo is a **frontend-only mobile banking simulation** built with **HTML, Tailwind CSS, DaisyUI, and vanilla JavaScript**.
The project focuses on **core frontend fundamentals** such as state management, input validation, DOM manipulation, and clean file separation - without using any frameworks or backend services.

**Live Demo:** [https://nilanjanajui.github.io/Payo-Mobile-Banking/](https://nilanjanajui.github.io/Payo-Mobile-Banking/)

---

## 📂 Project Folder Structure

```
Payoo/
│
├── index.html          # Login page
├── home.html           # Dashboard (Add Money, Cashout, History)
│
├── assets/             # Logos, icons, images
│   ├── logo.png
│   ├── Logo-full.png
│   └── opt-*.png
│
├── script/             # All JavaScript files
│   ├── login.js
│   ├── machine.js
│   ├── state.js
│   ├── addMoney.js
│   ├── cashout.js
│   └── history.js
│
├── style/
│   └── style.css       # Custom styles (optional)
│
├── tailwind.init.css   # Tailwind setup file
└── README.md
```

---

## 🚀 Features

* Secure login (demo-based)
* Add money from bank
* Cashout to agent
* Live balance update
* Transaction history with filter and clear actions
* Persistent balance + transactions using localStorage
* Modular JavaScript architecture
* Mobile-first responsive UI

---

## 🧠 Architecture Overview

The project follows a **simple layered architecture** using classic `<script>` files:

```
UI (HTML)
│
├── machine.js    → Shared DOM & balance utilities
├── state.js      → Global application state
│
├── login.js      → Login logic
├── addMoney.js   → Add money flow
├── cashout.js    → Cashout flow
├── history.js    → Transaction rendering
```

Each JavaScript file has **one clear responsibility**, making the project easy to extend and maintain.

---

## 🗂 File Responsibilities

### `index.html`

* Login page UI
* Loads `login.js`

### `home.html`

* Main dashboard UI
* Sections for Add Money, Cashout, and Transaction History
* No business logic inside HTML

### `machine.js`

Shared utility functions:

* `getValueFromInput(id)`
* `getBalance()`
* `setBalance(value)`
* `showOnly(sectionId)`

This file centralizes DOM access and balance handling.

---

### `state.js`

Manages application state:

```js
window.transactions = [];

window.addTransaction = function (type, amount, meta) {
    // stores transaction objects
};
```

Acts as an **in-memory database** similar to how real applications manage state.

---

### `addMoney.js`

* Validates user input
* Updates account balance
* Logs transactions using `addTransaction()`

---

### `cashout.js`

* Validates agent number, amount, and PIN
* Prevents overdraft
* Logs cashout transactions

---

### `history.js`

* Reads transaction data from global state
* Dynamically renders transaction cards
* Does not mutate state

---

## 🧾 Transaction Model

Each transaction is stored in the following format:

```js
{
  id: UUID,
  type: "ADD_MONEY" | "CASHOUT",
  amount: number,
  meta: { bank | agent },
  date: string
}
```

This structure mirrors **real-world fintech audit logs**.

---

## 🔐 Demo Login Credentials

```
Mobile Number: 01234567890
PIN: 1234
```

---

## 🛠 Tech Stack

* HTML5
* Tailwind CSS
* DaisyUI
* Vanilla JavaScript (ES6+)

---

## 💡 What This Project Demonstrates

This project demonstrates practical frontend engineering skills that are directly applicable to real-world applications:

* **State management without frameworks** using a centralized global store (`state.js`)
* **Clear separation of concerns** between UI, utilities, and business logic
* **Defensive input validation** to prevent invalid or unsafe actions
* **Predictable UI state control** through centralized section toggling
* **Scalable architecture** that can easily support new features (filters, persistence, backend APIs)

The focus of this project is not visual effects, but **correct data flow, logic clarity, and maintainability** - qualities expected in production code.

---

## 🔮 Future Improvements

* Add date-range filters to transaction history
* Export transactions as CSV
* Backend API integration

---

> *"I intentionally avoided frameworks to demonstrate how I manage state, validation, and UI updates using pure JavaScript."*
