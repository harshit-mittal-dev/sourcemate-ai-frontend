import { useState } from "react";
import "./App.css";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import SourcesPanel from "./components/SourcesPanel";
import ChatPanel from "./components/ChatPanel";
import ToolsPanel from "./components/ToolsPanel";
import SourcePreviewModal from "./components/SourcePreviewModal";
import UploadModal from "./components/UploadModal";

const initialSources = [
  {
    id: 1,
    name: "Machine_Learning_Notes.pdf",
    type: "PDF",
    pages: 24,
    status: "Ready",
    selected: true,
  },
  {
    id: 2,
    name: "Project_Concept_Note.docx",
    type: "DOCX",
    pages: 8,
    status: "Ready",
    selected: true,
  },
  {
    id: 3,
    name: "Class Summary Notes",
    type: "TEXT",
    pages: 5,
    status: "Ready",
    selected: false,
  },
];

const starterMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Hey! Upload your PDFs, notes, or project documents and ask me anything from them. I’ll answer like a source-based AI assistant.",
    citations: [],
  },
];

const suggestedPrompts = [
  "Summarize all sources",
  "Create exam questions",
  "Explain this simply",
  "Find key definitions",
];

const studyTools = [
  {
    title: "Generate Summary",
    icon: "📝",
    description: "Create a clean summary from selected sources.",
  },
  {
    title: "Create Quiz",
    icon: "❓",
    description: "Generate MCQs and short answers.",
  },
  {
    title: "Make Flashcards",
    icon: "🧠",
    description: "Turn concepts into revision cards.",
  },
  {
    title: "Extract Key Terms",
    icon: "🔎",
    description: "Find important terms and meanings.",
  },
];

const initialNotebooks = [
  {
    id: 1,
    name: "Machine Learning Notes",
    type: "Study Notes",
    sources: 3,
    updated: "Today",
  },
  {
    id: 2,
    name: "AI Project Research",
    type: "Project Research",
    sources: 2,
    updated: "Yesterday",
  },
  {
    id: 3,
    name: "DBMS Exam Prep",
    type: "Exam Revision",
    sources: 5,
    updated: "2 days ago",
  },
];

function App() {
  const [notebooks, setNotebooks] = useState(initialNotebooks);
  const [activeNotebook, setActiveNotebook] = useState(null);

  const [sources, setSources] = useState(initialSources);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [savedNotes, setSavedNotes] = useState([
    "Workspace created",
    "Selected sources will be used for answers",
  ]);

  const selectedSources = sources.filter((source) => source.selected);

  function handleOpenNotebook(notebook) {
    setActiveNotebook(notebook);
  }

  function handleCreateNotebook(newNotebook) {
    const notebook = {
      id: Date.now(),
      name: newNotebook.name,
      type: newNotebook.type,
      sources: 0,
      updated: "Just now",
    };

    setNotebooks((prevNotebooks) => [notebook, ...prevNotebooks]);
    setActiveNotebook(notebook);

    setSources([]);
    setMessages(starterMessages);
    setSavedNotes(["New notebook created"]);
  }

  function handleBackToDashboard() {
    setActiveNotebook(null);
    setPreviewSource(null);
    setIsUploadModalOpen(false);
  }

  function handleExportNotes() {
    if (!activeNotebook) {
      alert("Open a notebook first before exporting.");
      return;
    }

    const sourceText = sources
      .map((source, index) => {
        return `${index + 1}. ${source.name} | Type: ${source.type} | Status: ${
          source.status
        } | Selected: ${source.selected ? "Yes" : "No"}`;
      })
      .join("\n");

    const notesText = savedNotes
      .map((note, index) => `${index + 1}. ${note}`)
      .join("\n");

    const chatText = messages
      .map((message) => {
        const speaker = message.role === "user" ? "User" : "SourceMate AI";
        return `${speaker}: ${message.text}`;
      })
      .join("\n\n");

    const exportContent = `
SourceMate AI Export

Notebook: ${activeNotebook.name}
Type: ${activeNotebook.type}
Date: ${new Date().toLocaleString()}

====================
SOURCES
====================
${sourceText || "No sources added yet."}

====================
SAVED NOTES
====================
${notesText || "No saved notes yet."}

====================
CHAT HISTORY
====================
${chatText || "No chat messages yet."}
`;

    const blob = new Blob([exportContent], {
      type: "text/plain",
    });

    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = `${activeNotebook.name.replaceAll(" ", "_")}_export.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(fileUrl);
  }

  function addAssistantMessage(text) {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        role: "assistant",
        text,
        citations: [],
      },
    ]);
  }

  function toggleSource(id) {
    setSources((prevSources) =>
      prevSources.map((source) =>
        source.id === id ? { ...source, selected: !source.selected } : source
      )
    );
  }

  function handleViewSource(source) {
    setPreviewSource(source);
  }

  function handleDeleteSource(id) {
    setSources((prevSources) =>
      prevSources.filter((source) => source.id !== id)
    );

    if (previewSource?.id === id) {
      setPreviewSource(null);
    }

    addAssistantMessage(
      "Source deleted successfully. Your selected source list has been updated."
    );
  }

  function handleFilesSelected(files) {
    if (!files || files.length === 0) return;

    const newSources = files.map((file, index) => {
      const extension = file.name.includes(".")
        ? file.name.split(".").pop().toUpperCase()
        : "FILE";

      return {
        id: Date.now() + index,
        name: file.name,
        type: extension,
        pages: "New",
        status: "Ready",
        selected: true,
        preview: `Uploaded file: ${file.name}. Real file reading will be handled by backend later.`,
      };
    });

    setSources((prevSources) => [...prevSources, ...newSources]);

    addAssistantMessage(
      `${files.length} new source${
        files.length > 1 ? "s" : ""
      } added successfully. You can now ask questions from the selected files.`
    );
  }

  function handleAddTextSource(title, content) {
    const newSource = {
      id: Date.now(),
      name: title,
      type: "TEXT",
      pages: "Text",
      status: "Ready",
      selected: true,
      preview: content.slice(0, 160) + (content.length > 160 ? "..." : ""),
    };

    setSources((prevSources) => [...prevSources, newSource]);
    addAssistantMessage("Text source added successfully.");
  }

  function handleAddLinkSource(url) {
    const cleanedUrl = url.trim();

    const newSource = {
      id: Date.now(),
      name: cleanedUrl.replace("https://", "").replace("http://", ""),
      type: "LINK",
      pages: "Web",
      status: "Ready",
      selected: true,
      url: cleanedUrl,
      preview: "Website link saved as a source.",
    };

    setSources((prevSources) => [...prevSources, newSource]);
    addAssistantMessage("Link source added successfully.");
  }

  function isBadQuestion(text) {
    const cleanedText = text.trim();

    if (cleanedText.length < 2) return true;

    const hasLetterOrNumber = /[a-zA-Z0-9]/.test(cleanedText);

    return !hasLetterOrNumber;
  }

  function createMockAnswer(question) {
    return {
      id: Date.now() + 1,
      role: "assistant",
      text: `Based on your selected sources, here is a clear answer for: "${question}". In the final version, this response will come from your backend LLM API after reading uploaded documents.`,
      citations: selectedSources.slice(0, 2).map((source, index) => ({
        title: source.name,
        page: index + 1,
      })),
    };
  }

  function handleSend(customPrompt) {
    const finalText = customPrompt || input.trim();

    if (!finalText || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: finalText,
      citations: [],
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    if (isBadQuestion(finalText)) {
      setTimeout(() => {
        addAssistantMessage(
          "Please type a proper question so I can help you better."
        );
      }, 300);
      return;
    }

    if (selectedSources.length === 0) {
      setTimeout(() => {
        addAssistantMessage(
          "Please select at least one source from the left panel before asking a source-based question."
        );
      }, 300);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const aiMessage = createMockAnswer(finalText);
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsLoading(false);
    }, 900);
  }

  function handleSaveNote(text) {
    setSavedNotes((prevNotes) => [text.slice(0, 75) + "...", ...prevNotes]);
  }

  function handleClearChat() {
    setMessages(starterMessages);
    setInput("");
    setIsLoading(false);
  }

  function handleToolClick(toolTitle) {
    if (selectedSources.length === 0) {
      addAssistantMessage(
        `Please select at least one source before using ${toolTitle}.`
      );
      return;
    }

    const toolMessage = {
      id: Date.now(),
      role: "assistant",
      text: `${toolTitle} generated from your selected sources. Later this button will connect to backend and generate real output from uploaded files.`,
      citations: selectedSources.slice(0, 2).map((source, index) => ({
        title: source.name,
        page: index + 1,
      })),
    };

    setMessages((prevMessages) => [...prevMessages, toolMessage]);
    setSavedNotes((prevNotes) => [`${toolTitle} saved`, ...prevNotes]);
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Topbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeNotebook={activeNotebook}
        handleBackToDashboard={handleBackToDashboard}
        handleExportNotes={handleExportNotes}
      />

      {!activeNotebook ? (
        <Dashboard
          notebooks={notebooks}
          handleOpenNotebook={handleOpenNotebook}
          handleCreateNotebook={handleCreateNotebook}
        />
      ) : (
        <>
          <main className="workspace">
            <SourcesPanel
              sources={sources}
              toggleSource={toggleSource}
              handleViewSource={handleViewSource}
              handleDeleteSource={handleDeleteSource}
              openUploadModal={() => setIsUploadModalOpen(true)}
            />

            <ChatPanel
              selectedSources={selectedSources}
              suggestedPrompts={suggestedPrompts}
              messages={messages}
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleSaveNote={handleSaveNote}
              handleClearChat={handleClearChat}
              isLoading={isLoading}
            />

            <ToolsPanel
              studyTools={studyTools}
              handleToolClick={handleToolClick}
              savedNotes={savedNotes}
            />
          </main>

          <SourcePreviewModal
            source={previewSource}
            onClose={() => setPreviewSource(null)}
          />

          <UploadModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            handleFilesSelected={handleFilesSelected}
            handleAddTextSource={handleAddTextSource}
            handleAddLinkSource={handleAddLinkSource}
          />
        </>
      )}
    </div>
  );
}

export default App;