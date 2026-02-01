<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
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

>>>>>>> ef67dedfe391840ec0cafabe18af289582744e93
