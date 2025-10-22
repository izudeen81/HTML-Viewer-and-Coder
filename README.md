# Gemini HTML Editor

An interactive, AI-powered HTML editor that uses the Gemini API to suggest and apply code modifications based on natural language prompts. Users can see a live preview of their changes instantly, creating a seamless and intuitive web development workflow.

![Gemini HTML Editor Screenshot](https://storage.googleapis.com/aistudio-ux-team-public/app-maker/user_project_screenshots/gemini-html-editor.png)

## Overview

This application provides a dual-pane interface: a code editor on one side and a live preview on the other. A user can write or paste HTML code into the editor and then use a simple text input to ask Gemini to make changes, such as "make the header text orange" or "add a button with a blue background."

The app is built with React, TypeScript, and Tailwind CSS for a modern, responsive, and maintainable user interface.

## Features

- **AI-Powered Code Edits:** Leverage the power of Gemini to modify HTML structure and styling with natural language commands.
- **Live Preview:** Instantly see the results of your code changes rendered in a sandboxed iframe.
- **Responsive Design:** A clean, intuitive layout that works on all screen sizes.
- **Full-Screen Preview:** Expand the preview pane to full-screen for an unobstructed view.
- **Error Handling:** Clear, user-friendly error messages for API or network issues, with a convenient retry option.
- **Lightweight & Fast:** Built with a minimal set of dependencies for optimal performance.

## Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **AI Model:** [Google Gemini API](https://ai.google.dev/gemini-api)

## Project Structure

```
.
├── public/
│   └── index.html      # Main HTML entry point
├── src/
│   ├── components/
│   │   ├── CodeEditor.tsx  # The text area for HTML input
│   │   ├── GeminiControls.tsx # Input and button for interacting with Gemini
│   │   ├── Icons.tsx       # SVG icon components
│   │   └── Preview.tsx     # The iframe for live preview
│   ├── services/
│   │   └── geminiService.ts # Logic for interacting with the Gemini API
│   ├── App.tsx           # Main application component and layout
│   ├── constants.ts      # Initial HTML content and other constants
│   └── index.tsx         # Application entry point
├── package.json
└── README.md           # This file
└── ROADMAP.md          # Future development plans
```

## Getting Started

### Prerequisites

- An internet browser with JavaScript enabled.
- A valid Google Gemini API key.

### Setup

1.  The application is designed to run in a cloud environment where the API key is provided as an environment variable (`process.env.API_KEY`).
2.  No local setup is required if you are running this in a supported online IDE.
3.  To run locally, you would typically create a `.env` file in the root directory and add your API key:
    ```
    API_KEY=your_gemini_api_key_here
    ```
    You would then need a bundler like Vite or Create React App to serve the project and handle the environment variables.

## How to Use

1.  The application loads with a pre-defined HTML structure in the editor.
2.  In the "Describe your desired change" input field, type a command for Gemini. For example:
    - "Change the main title to 'Welcome to My Project'"
    - "Make all phase headers blue"
    - "Add a hover effect to the phase cards to make them lighter"
3.  Click the "Edit with Gemini" button or press Enter.
4.  The editor will update with the new HTML code provided by Gemini, and the live preview will refresh instantly.
5.  To get a better view of the result, click the "Expand" icon to make the preview full-screen. Click the "Collapse" icon or press `Escape` to return to the split view.
