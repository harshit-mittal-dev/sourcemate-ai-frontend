# SourceMate AI

SourceMate AI is a NotebookLM-inspired AI chatbot frontend where users can create notebooks, upload sources, chat with documents, view source references, save notes, and export chat history.

This project is currently a frontend prototype built using React. Backend integration can be added later to support real PDF reading, source extraction, LLM responses, and citations.

---

## Features

- Dashboard page with recent notebooks
- Create new notebook modal
- Notebook workspace layout
- Upload file source
- Paste text source
- Add website link source
- Source sidebar with select/unselect option
- Source preview modal
- Delete source option
- AI-style chat interface
- Mock AI responses
- Source citation chips
- Save answers as notes
- Copy AI responses
- Explain easier option
- Typing/loading animation
- Study tools panel
- Saved notes panel
- Clear chat option
- Export sources, notes, and chat history as a text file
- Light and dark mode
- Responsive layout

---

## Tech Stack

- React
- Vite
- JavaScript
- CSS

---

## Project Structure

```txt
src/
  components/
    ChatPanel.jsx
    Dashboard.jsx
    SourcePreviewModal.jsx
    SourcesPanel.jsx
    ToolsPanel.jsx
    Topbar.jsx
    UploadModal.jsx
  App.jsx
  App.css
  index.css
  main.jsx