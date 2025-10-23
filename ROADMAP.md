# Project Roadmap

This document outlines the future development plans for IZU's Gemini HTML Editor. Our goal is to evolve this tool into a more powerful and user-friendly web development assistant.

## Recently Added

-   **✅ Theme Selector:** Implemented a theme switcher for light and dark modes.
-   **✅ Starter Templates:** Added a dropdown with several pre-built HTML templates.
-   **✅ Session Persistence:** Code is now saved in `localStorage` to persist between sessions.
-   **✅ WYSIWYG & Inspector:** Added modes to edit the preview directly and inspect elements.
-   **✅ Undo Functionality:** The last AI edit can now be undone.

## Short-Term Goals (Next 1-3 Months)

-   **✨ Enhanced Editor Experience:**
    -   **Description:** Re-integrate a lightweight code editor component (like CodeMirror or Monaco) to add syntax highlighting, line numbers, and auto-closing tags.
    -   **Benefit:** Improves code readability and makes manual edits much easier for users.

-   **💅 CSS & JavaScript Editing:**
    -   **Description:** Add separate tabs or panes for editing CSS and JavaScript alongside the HTML. Gemini prompts will be updated to understand which language to modify.
    -   **Benefit:** Expands the tool's utility to cover the full spectrum of frontend development.

## Mid-Term Goals (Next 3-6 Months)

-   **📦 Component Library Integration:**
    -   **Description:** Allow users to ask Gemini to insert pre-styled components from popular libraries (e.g., "add a Tailwind CSS pricing table").
    -   **Benefit:** Drastically speeds up development by leveraging reusable UI patterns.

-   **🗣️ Voice-to-Command Input:**
    -   **Description:** Integrate the Web Speech API to allow users to speak their edit commands instead of typing them.
    -   **Benefit:** Improves accessibility and offers a futuristic, hands-free workflow.

## Long-Term Goals (6+ Months)

-   **📁 Multi-File Support:**
    -   **Description:** Evolve the editor to support a simple file system, allowing users to work with multiple linked HTML, CSS, and JS files.
    -   **Benefit:** Enables the creation of more complex, multi-page websites.

-   **🤖 Proactive AI Suggestions:**
    -   **Description:** Have Gemini proactively analyze the code and suggest improvements for accessibility, performance, or best practices without a user prompt.
    -   **Benefit:** Transforms the tool from a reactive editor into a proactive coding assistant.

-   **🔄 Version Control (Git Integration):**
    -   **Description:** Allow users to commit their changes to a Git repository directly from the editor.
    -   **Benefit:** Provides a complete development environment with versioning and collaboration capabilities.