# 🏫 Beacon Valley School – EduBloom LMS
> **Tagline:** *Learn. Grow. Achieve.*  
> **Developed by:** Rimsha (`rimsha201000@gmail.com`)

---

## 🌟 Overview
**EduBloom LMS** is a modern, production-ready, SaaS-grade School Learning & Management System built for **Beacon Valley School**. It features a rich education-tech UI with bubble-card aesthetics, soft glassmorphism, animated mascots, role-based access control (RBAC), and an intelligent AI School Assistant powered by Google Gemini.

---

## 🚀 Key Features

### 1. 👑 5 Isolated User Roles & Quick-Switch Bar
- **Super Admin / Owner:** Full institutional control, Multi-School SaaS Branding configuration, Recycle Bin, and school audits.
- **School Admin:** Daily operations, student enrollment, faculty management, timetables, and reports.
- **Teacher:** Attendance marking, homework publisher, gradebook & exams, assigned class roster.
- **Parent:** Multi-child profile switcher, real-time attendance monitor, fee payment vouchers, child progress report cards.
- **Student:** Personal study portal, homework tracker, schedule, and gradebook.

### 2. ♻️ Dedicated Student Recycle Bin (Soft Delete & Restore)
- Students deleted from active rosters are automatically preserved in the **Recycle Bin**.
- Retains attendance records, fee payment ledgers, and academic results.
- **1-Click Restore:** Restores students directly to active status without data loss.
- **Permanent Deletion:** Protected by a security confirmation warning dialog.

### 3. 🤖 Sparky AI School Assistant (Google Gemini Powered)
- Floating button with animated robot teacher mascot.
- Role-based **Data Guard Security**: strictly restricts answers according to the logged-in user's role (e.g. parents can never inspect another student's finances or grades).
- Answers instant queries such as:
  - *"Show all students absent today"*
  - *"Which students have unpaid fees?"*
  - *"Show Class 8 students with attendance below 75%"*
  - *"How many students are enrolled?"*
  - *"Show Rimsha's attendance"*

### 4. ⚙️ Dynamic School Configuration & Multi-Tenant Branding (Owner Only)
- Live brand customization: School Name, Crest Logo, Primary, Secondary, and Accent color palettes.
- Updates across the entire application instantly with reactive CSS variables.

### 5. 📅 Biometric & Daily Attendance
- Class-wise, section-wise, and date-wise attendance.
- **Quick Mark:** *All Present*, *All Absent*, *Late*, *Excused*.

### 6. 💳 Tuition & Fee Management
- Invoice tracking (Paid, Partial, Pending, Overdue).
- Printable official fee vouchers with school watermark.

### 7. 🏆 Examination Assessment & Official Report Cards
- Subject grade calculations (A+, A, B, C, F) and GPA evaluation.
- Printable official student report card with institutional seals and signatures.

### 8. 🔍 Global Search (Ctrl + K / ⌘K)
- Fast fuzzy lookup across Students, Teachers, Classes, and Assignments.

---

## 🔐 Demo Credentials
| Role | Email | Password |
|---|---|---|
| **Super Admin / Owner** | `owner@beaconvalley.edu` | `password123` |
| **School Admin** | `admin@beaconvalley.edu` | `password123` |
| **Teacher** | `teacher@beaconvalley.edu` | `password123` |
| **Parent** | `parent@beaconvalley.edu` | `password123` |
| **Student** | `student@beaconvalley.edu` | `password123` |

*Tip: You can also use the top 1-click role switcher bar to test any role immediately!*

---

## 📦 Deployment to Vercel & GitHub

### GitHub:
```bash
git init
git add .
git commit -m "Initial release of Beacon Valley School EduBloom LMS"
git remote add origin https://github.com/your-username/beacon-valley-lms.git
git push -u origin main
```

### Vercel:
1. Push to GitHub.
2. Import repository into [Vercel](https://vercel.com).
3. Deploy instantly (zero build configuration required, static SPA ready).
