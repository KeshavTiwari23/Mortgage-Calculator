# Mortgage Calculator Wireframe (React)

This repository contains a **React wireframe** for an improved, user-friendly **Mortgage Calculator** based on customer feedback analysis.

## Overview
This wireframe addresses key issues such as poor navigation, confusing terminology, and lack of mobile responsiveness. It includes:
- Guided 3-step workflow
- Tooltips and glossary modal
- Auto-save functionality (localStorage)
- Responsive Tailwind CSS design
- Accessible form elements
- Placeholder for amortisation chart

## Tech Stack
- React (Vite)
- Tailwind CSS

## Setup Instructions
1. Create a new React project:
   ```bash
   npm create vite@latest mortgage-wireframe -- --template react
   cd mortgage-wireframe
   npm install
   ```

2. Install Tailwind CSS:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
   Configure `tailwind.config.js` and add Tailwind directives to `src/index.css`.

3. Replace `src/App.jsx` with the provided wireframe code.

4. Run:
   ```bash
   npm run dev
   ```

## Folder Structure
```
📁 mortgage-wireframe
 ┣ 📁 src
 ┃ ┣ 📜 App.jsx
 ┃ ┣ 📜 index.css
 ┃ ┗ 📜 main.jsx
 ┣ 📜 index.html
 ┣ 📜 package.json
 ┗ 📜 tailwind.config.js
```

## Features Summary
| Category | Description |
|-----------|--------------|
| Navigation | Step-by-step workflow guides users through input and calculation. |
| Clarity | Glossary and tooltips explain mortgage terms clearly. |
| Performance | Lightweight, responsive, mobile-optimized layout. |
| Accessibility | Keyboard-friendly forms with clear labels. |
| Auto-save | Retains user inputs using localStorage. |

## License
Educational and prototyping use only.
