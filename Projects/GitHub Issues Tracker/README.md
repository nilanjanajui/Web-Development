
# GitHub Issues Tracker

A simple web application that displays and manages project issues similar to GitHub's issue dashboard. The app fetches issues from a public API and shows them in a clean card layout with filtering and search functionality.

---

**Live Demo:** [https://github-issues-tracker-ph-a5.netlify.app/](https://github-issues-tracker-ph-a5.netlify.app/)

---

## Features

* Login page with demo credentials
* Fetch issues from an external API
* Display issues in a 4‑column card grid
* Filter issues by status:

  * All
  * Open
  * Closed
* Dynamic issue count
* Search issues by title
* Loading spinner while fetching data
* Active tab highlighting
* Status‑based card borders

  * Green for open issues
  * Purple for closed issues
* Responsive layout

---

## Project Structure

```
github-issues-tracker
│
├── index.html        # Login page
├── main.html         # Issues dashboard
│
├── css
│   └── style.css
│
├── js
│   ├── login.js
│   └── issues.js
│
└── README.md
```

---

## Demo Login Credentials

```
Username: admin
Password: admin123
```

---

## API Endpoints

### Get All Issues

```
https://phi-lab-server.vercel.app/api/v1/lab/issues
```

### Get Single Issue

```
https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}
```

Example

```
https://phi-lab-server.vercel.app/api/v1/lab/issue/33
```

### Search Issues

```
https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}
```

Example

```
https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications
```

---

## Technologies Used

* HTML
* CSS / Tailwind CSS
* JavaScript (Vanilla)
* Font Awesome

---

## How to Run the Project

1. Clone the repository

```
git clone https://github.com/yourusername/github-issues-tracker.git
```

2. Open the project folder

3. Open `index.html` in your browser

No additional dependencies or build tools are required.

---

## Overview

This project demonstrates working with APIs, DOM manipulation, and dynamic UI updates using vanilla JavaScript. It focuses on building a clean interface for tracking issues and improving user experience with filtering, searching, and responsive design.
