# Hacker Stories

## Deployed on GitHub Pages

From time to time I will deploy a current version of this project to GitHub Pages.

see [https://pstackebrandt.github.io/hacker-stories](https://pstackebrandt.github.io/hacker-stories)

(For now it won't be a nice UI, but it's a start ;-)

## Getting Started

To start the app for development, follow these steps:

1. **Install dependencies**: Make sure you have [Node.js](https://nodejs.org/) installed. Then, run the following command in your terminal:

    ```bash
    npm install
    ```

1. **Start the development server**: Run the following command to start the development server:

    ```bash
    npm run dev
    ```

1. **Open the app**: Open your browser and go to `http://localhost:5173/` to see your app in action.

1. **Build for production**: When you're ready to deploy, run:

    ```bash
    npm run build
    ```

1. **Preview the production build**: To preview the production build locally, run:

    ```bash
    npm run preview
    ```

## TypeScript Support

This project supports both JavaScript (.js/.jsx) and TypeScript (.ts/.tsx) files. While it currently contains a mix of both, there is an ongoing effort to migrate the codebase to TypeScript for better type safety and developer experience.

Key points:

- Both JS and TS files can coexist
- ESLint is configured to handle both languages appropriately
- New features are encouraged to be written in TypeScript
- Existing JavaScript files will be gradually migrated to TypeScript

## Used project template React + Vite

Original template information:
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
