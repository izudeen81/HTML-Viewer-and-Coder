# IZU's Gemini HTML Editor

An interactive, AI-powered HTML editor that uses the Gemini API to suggest and apply code modifications based on natural language prompts. Users can see a live preview of their changes instantly, creating a seamless and intuitive web development workflow.

![IZU's Gemini HTML Editor Screenshot](https://storage.googleapis.com/aistudio-ux-team-public/app-maker/user_project_screenshots/gemini-html-editor.png)

## Overview

This application provides a dual-pane interface: a code editor on one side and a live preview on the other. A user can write or paste HTML code into the editor and then use a simple text input to ask Gemini to make changes, such as "make the header text orange" or "add a button with a blue background."

The app is built with React, TypeScript, and Tailwind CSS for a modern, responsive, and maintainable user interface.

## Features

-   **AI-Powered Code Edits:** Leverage the power of Gemini to modify HTML structure and styling with natural language commands.
-   **Live Preview:** Instantly see the results of your code changes rendered in a sandboxed iframe.
-   **Resizable Panes:** Adjust the editor and preview pane widths for a comfortable workspace.
-   **Starter Templates:** Kickstart your project with a selection of pre-built, visually appealing templates.
-   **Session Persistence:** Your code is automatically saved to your browser, so you can pick up where you left off.
-   **Light & Dark Modes:** Switch between themes to match your preference.
-   **WYSIWYG Editing:** Click the "Edit" button to modify the live preview directly.
-   **Element Inspector:** Click "Inspect" to select an element in the preview and see it highlighted in the code.
-   **Undo & Reset:** Easily revert the last AI edit or reset the code to its original state.
-   **Full-Screen Preview:** Expand the preview pane to full-screen for an unobstructed view.
-   **Error Handling:** Clear, user-friendly error messages for API or network issues, with a convenient retry option.

## Tech Stack

-   **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
-   **AI Model:** [Google Gemini API](https://ai.google.dev/gemini-api)

## Project Structure

```
.
├── public/
│   └── index.html      # Main HTML entry point
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks for shared logic
│   ├── lib/
│   │   └── gemini.ts   # Logic for interacting with the Gemini API
│   ├── App.tsx         # Main application component and layout
│   ├── constants.ts    # Initial HTML content and other constants
│   └── index.tsx       # Application entry point
└── README.md
└── ROADMAP.md
```

## How to Use

1.  The application loads with a starter template in the editor.
2.  Use the **template icon** in the code editor's header to load other layouts like a portfolio or blog post.
3.  In the **"Describe your desired change"** input field, type a command for Gemini. For example:
    -   "Change the main title to 'Welcome to My Project'"
    -   "Make all phase headers blue"
    -   "Add a hover effect to the cards to make them lighter"
4.  Click the **"Edit with Gemini"** button or press Enter. The code and preview will update instantly.
5.  Click the **Undo** button to revert the last change from Gemini.
6.  Use the **Inspect** and **Edit** buttons above the preview pane to interact with the rendered HTML directly.
7.  Click the **Expand** icon to make the preview full-screen. Press `Escape` to return.