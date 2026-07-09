import { useState } from "react";

function Dashboard({ notebooks, handleOpenNotebook, handleCreateNotebook }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [notebookName, setNotebookName] = useState("");
  const [notebookType, setNotebookType] = useState("Study Notes");

  function submitNotebook() {
    if (!notebookName.trim()) {
      alert("Please enter a notebook name.");
      return;
    }

    handleCreateNotebook({
      name: notebookName,
      type: notebookType,
    });

    setNotebookName("");
    setNotebookType("Study Notes");
    setIsCreateOpen(false);
  }

  return (
    <main className="dashboardPage">
      <section className="dashboardHero">
        <div>
          <span className="eyebrow">AI Research Workspace</span>
          <h1>Organize your sources and chat with them.</h1>
          <p>
            Create a notebook, upload PDFs or notes, ask questions, generate
            summaries, and save important answers.
          </p>

          <button
            className="createNotebookButton"
            onClick={() => setIsCreateOpen(true)}
          >
            + Create New Notebook
          </button>
        </div>

        <div className="heroCard">
          <div className="heroIcon">✨</div>
          <h3>Source-based AI</h3>
          <p>
            Your chatbot workspace is designed for document-based answers,
            citations, study tools, and quick revision.
          </p>
        </div>
      </section>

      <section className="recentSection">
        <div className="sectionTitleRow">
          <div>
            <h2>Recent Notebooks</h2>
            <p>Open an existing workspace or create a new one.</p>
          </div>
        </div>

        <div className="notebookGrid">
          {notebooks.map((notebook) => (
            <button
              className="notebookCard"
              key={notebook.id}
              onClick={() => handleOpenNotebook(notebook)}
            >
              <div className="notebookIcon">📚</div>

              <div>
                <h3>{notebook.name}</h3>
                <p>{notebook.type}</p>
              </div>

              <div className="notebookMeta">
                <span>{notebook.sources} sources</span>
                <span>{notebook.updated}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {isCreateOpen && (
        <div className="modalOverlay">
          <div className="notebookModal">
            <div className="modalHeader">
              <div>
                <h2>Create Notebook</h2>
                <p>Make a new workspace for your documents.</p>
              </div>

              <button
                className="closeButton"
                onClick={() => setIsCreateOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="manualSourceBox">
              <label>Notebook Name</label>
              <input
                value={notebookName}
                onChange={(event) => setNotebookName(event.target.value)}
                placeholder="Example: Control System Notes"
              />

              <label>Notebook Type</label>
              <select
                className="notebookSelect"
                value={notebookType}
                onChange={(event) => setNotebookType(event.target.value)}
              >
                <option>Study Notes</option>
                <option>Project Research</option>
                <option>Exam Revision</option>
                <option>Meeting Notes</option>
                <option>Personal Knowledge Base</option>
              </select>

              <button className="submitSourceButton" onClick={submitNotebook}>
                Create Notebook
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;