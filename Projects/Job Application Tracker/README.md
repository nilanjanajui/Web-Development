# 📋 Job Tracker Application

A responsive Job Tracking web application that allows users to manage and monitor job applications efficiently.

This project demonstrates dynamic UI rendering, state management, filtering logic, and responsive design using Vanilla JavaScript.

---

## 🚀 Features

### ✅ Job Status Management

* Mark a job as **Interview**
* Mark a job as **Rejected**
* Automatically removes a job from the opposite list when status changes
* Dynamic status badge updates

### 📊 Live Counters

* Total Jobs
* Interview Jobs
* Rejected Jobs
* Filtered job count display (example: `2 of 5`)

### 🔍 Filtering System

* View **All Jobs**
* View **Interview Jobs**
* View **Rejected Jobs**
* Smart rendering prevents duplicate empty states

### 🗑 Delete Functionality

* Delete any job card
* Automatically updates counters
* Removes job from Interview and Rejected arrays

### 📭 Smart Empty State Logic

* Shows "No jobs available" when:

  * No jobs exist at all (main section)
  * A filter has no results but jobs exist overall
* Prevents duplicate empty state messages

### 📱 Fully Responsive Design

* Mobile-friendly layout
* Grid becomes single-column on small screens
* Flexible card layout
* Clean spacing adjustments for mobile view

---

## 🛠 Technologies Used

* HTML5
* CSS3 (Responsive Design + Media Queries)
* Tailwind CSS (utility classes)
* Vanilla JavaScript (DOM manipulation & state management)

---

## 📂 Project Structure

```
job-tracker/
│
├── index.html
├── style/
│     ├── style.css
├── script.js
├── images
│     ├── jobs.png
│     ├── Trash.png
└── README.md
```

---

## ⚙️ How It Works

### 🔹 State Management

The application maintains three main variables:

* `interviewList` → Stores interview jobs
* `rejectedList` → Stores rejected jobs
* `currentStatus` → Tracks active filter

This ensures consistent UI updates without page reload.

### 🔹 Event Delegation

All button actions (Interview, Rejected, Delete) are handled through a single event listener on the main container.

Benefits:

* Cleaner code
* Better performance
* Works for dynamically rendered cards

### 🔹 Rendering Logic

The app uses dynamic rendering functions:

* `renderInterview()`
* `renderRejected()`
* `generateCardHTML()`
* `createEmptyMessage()`

Cards are rebuilt dynamically based on the selected filter.

### 🔹 Counter Updates

The `calculateCount()` function:

* Updates total job count
* Updates interview count
* Updates rejected count
* Updates filtered display count
* Controls visibility of the main empty state

---

## 🧠 Logic Highlights

* Prevents duplicate entries in Interview and Rejected lists
* Automatically syncs job status
* Smart empty-state rendering
* Clean separation between UI rendering and state logic
* No duplicated "No jobs available" messages

---

## 📱 Responsive Behavior

On smaller screens:

* Cards stack vertically
* Grid switches to one column
* Buttons adjust spacing
* Layout remains clean and usable

---

## 🎯 Possible Future Improvements

* Add Local Storage (persist data after refresh)
* Add job creation form
* Add search functionality
* Add animations/transitions
* Add dark mode
* Deploy to GitHub Pages

---

## 🏁 Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Start managing your job applications

---

## 🌐 Live Website

You can view the live version of this project here:

🔗 **Live Demo:** [https://nilanjanajui.github.io/Job-Application-Tracker/](https://nilanjanajui.github.io/Job-Application-Tracker/)


---

## 👨‍💻 Purpose of the Project

This project was built to practice:

* DOM manipulation
* Event delegation
* Conditional rendering
* State management
* Responsive UI design

---

## 📄 License

This project is open-source and available for educational and personal use.
