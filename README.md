# Chef Claude

Chef Claude is a small React app that turns a list of ingredients into an AI-generated recipe suggestion using the OpenRouter API.

It is designed as a polished front-end demo and learning project focused on React component composition, state management, and async API integration.

## Features

- Add ingredients one at a time from the UI
- Display the current ingredients in a structured list
- Generate a recipe when enough ingredients are available
- Send the ingredient list to an AI model through OpenRouter
- Render recipe output with markdown formatting
- Show loading and error states for a smoother user experience

## Tech Stack

- React 19
- Vite
- JavaScript
- OpenRouter API
- ESLint

## Project Goals

This repository is based on a hands-on challenge to practice:

- component-driven UI design
- passing state and callbacks between parent and child components
- handling async requests in React
- rendering AI-generated markdown content safely
- refining the UX around generated results

## Prerequisites

Before running the app locally, ensure you have:

- Node.js 18+
- npm
- an OpenRouter API key

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/sirkrlvin/chef-claude.git
   cd chef-claude
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   VITE_OPENROUTER_API_KEY=your_api_key_here
   VITE_OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct
   ```

   The model value is optional. If omitted, the app falls back to a default OpenRouter model.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL reported by Vite in your browser.

## Available Scripts

```bash
npm run dev      # start the Vite development server
npm run build    # create a production build
npm run preview  # preview the production build locally
npm run lint     # run ESLint checks
```

## Repository Structure

```text
chef-claude/
├── README.md
├── challenge.md
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── index.jsx
│   └── Components/
│       ├── ClaudeRecipe.jsx
│       ├── Header.jsx
│       ├── IngredientsList.jsx
│       └── Main.jsx
├── src/assets/
│   ├── hero.png
│   └── images/
│       ├── chef-claude.png
│       └── chef-claude-full.png
└── .env.example (if added locally)
```

## How It Works

The app maintains ingredient state in `Main.jsx` and passes it down to the list and recipe components. When a user requests a recipe, it sends the current ingredient list to OpenRouter and renders the returned response in the recipe view.

The UI also includes a scroll-to-result interaction so the generated recipe is brought into view as soon as it appears.

## Notes

- Keep your API key in a local `.env` file and do not commit it to source control.
- If OpenRouter is busy or rate-limited, the UI shows a friendly retry message rather than failing silently.
- This project is intentionally lightweight and suited for learning React patterns and front-end app composition.

## License

This project is provided as-is for educational and demo purposes.
