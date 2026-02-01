# 🍸 BarBooking Frontend

BarBooking is a modern frontend web application for discovering bars, lounges, clubs, karaoke venues, and rooftop locations across Vietnam.  
The project focuses on **performance**, **responsive UI**, and **user-friendly search & filtering**.

---

## 🚀 Features

- 🔍 **Search bars by keyword** (name, location, type)
- 🏙️ **Filter by city, district, type, partner status**
- ⭐ **Sort by rating & popularity**
- 🏆 **Top bars ranking by city**
- ♾️ **Infinite scroll / auto load more**
- 📱 **Fully responsive (mobile-first design)**
- 🧭 **URL-based filters (shareable links)**
- ⚡ **Optimized UI with skeleton loading**

---

## 🛠️ Tech Stack

- **React + TypeScript**
- **React Router v6**
- **Swiper.js** (carousel / sliders)
- **Bootstrap 5**
- **React Icons**
- **Custom API service (`barApi`)**

---

## 📂 Project Structure


---

## 🔍 Search & Filters

- Search via header input → redirect to `/bars?keyword=...`
- Filters are synced with URL parameters
- Debounced filtering for better performance
- Mobile filter modal supported

---

## 📱 Responsive Design

- Desktop: Sidebar filters + horizontal bar cards
- Mobile: Bottom sheets, stacked cards, overlay search
- Optimized for small screens and touch interactions

---

## ⚙️ Getting Started

### 1. Install dependencies
```bash
npm install
npm run dev
npm run build


---

## 4️⃣ Commit message đầu tiên (nên dùng)

```bash
git commit -m "feat: initial BarBooking frontend with search, filters, and responsive UI"

