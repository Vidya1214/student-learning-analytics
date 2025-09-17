# Student Performance Dashboard

A modern Next.js dashboard to explore and analyze student learning and performance data with charts, insights, and an interactive table.

## Features
- **Overview stats**: Quick metrics for cohort performance
- **Interactive charts**: Bar, Radar, and Scatter visualizations using `recharts`
- **Insights**: Derived observations from the dataset
- **Student table**: Search, sort, and incrementally load rows with "Show more" / "Show all"
- **Light/Dark UI**: Clean Tailwind-based styling
- **Notebooks**: Jupyter notebook(s) for deeper analysis (`notebooks/`)

## Tech Stack
- **Framework**: Next.js 15
- **UI**: React 19 + Tailwind CSS 4
- **Charts**: `recharts`

## Project Structure
```
student-performance-dashboard/
├─ components/
│  ├─ ChartBar.jsx
│  ├─ ChartRadar.jsx
│  ├─ ChartScatter.jsx
│  ├─ ChartsSection.jsx
│  ├─ Insights.jsx
│  ├─ Layout.jsx
│  ├─ OverviewStats.jsx
│  └─ StudentTable.jsx
├─ pages/
│  ├─ _app.js
│  └─ index.js
├─ public/
│  └─ data/
│     ├─ student_data.json
│     ├─ student_personas.json
│     └─ persona_profiles.json
├─ notebooks/
│  └─ analysis.ipynb
├─ src/
│  └─ app/
│     ├─ layout.js
│     └─ globals.css
├─ package.json
├─ next.config.mjs
├─ eslint.config.mjs
├─ postcss.config.mjs
├─ jsconfig.json
└─ README.md
```

## Getting Started
### Prerequisites
- Node.js 18+ (recommended LTS)
- npm (comes with Node) or yarn/pnpm/bun

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
npm run dev
```
Then open `http://localhost:3000` in your browser.

### Build for production
```bash
npm run build
```

### Start the production server
```bash
npm run start
```

### Lint
```bash
npm run lint
```

## Data
Sample data lives under `public/data/`. The app reads from JSON files for demo purposes:
- `student_data.json` – core student metrics (engagement, scores, etc.)
- `student_personas.json` – persona mapping per student
- `persona_profiles.json` – persona definitions

You can replace these with your own datasets keeping similar shapes.

## Notebooks
- `notebooks/analysis.ipynb` contains exploratory analysis and modeling. Open with Jupyter or VS Code’s Jupyter extension.

## Key UI Behavior
- The `Students` table supports search (by name/class), sort (by any column), and incremental loading:
  - Shows 50 rows initially
  - "Show more" adds 50 more rows each click
  - "Show all" renders the entire filtered set

## Scripts
- `dev`: Start Next.js dev server
- `build`: Compile production build
- `start`: Run production server
- `lint`: Run ESLint

## Contributing
1. Create a feature branch
2. Commit your changes
3. Open a pull request

## Repository
This project is hosted at `https://github.com/Vidya1214/student-learning-analytics`.
