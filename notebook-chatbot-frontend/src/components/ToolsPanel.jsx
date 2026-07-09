function ToolsPanel({ studyTools, handleToolClick, savedNotes }) {
  return (
    <aside className="toolsPanel">
      <div className="panelBlock">
        <h2>Study Tools</h2>
        <p>Generate useful outputs from your sources.</p>

        <div className="toolGrid">
          {studyTools.map((tool) => (
            <button
              className="toolCard"
              key={tool.title}
              onClick={() => handleToolClick(tool.title)}
            >
              <span>{tool.icon}</span>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="panelBlock">
        <h2>Learning Path</h2>

        <div className="timeline">
          <div>
            <span>1</span>
            <p>Understand Basics</p>
          </div>

          <div>
            <span>2</span>
            <p>Review Key Terms</p>
          </div>

          <div>
            <span>3</span>
            <p>Practice Questions</p>
          </div>

          <div>
            <span>4</span>
            <p>Final Revision</p>
          </div>
        </div>
      </div>

      <div className="panelBlock">
        <h2>Saved Notes</h2>

        <div className="notesList">
          {savedNotes.map((note, index) => (
            <div className="noteItem" key={index}>
              <span>🧾</span>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ToolsPanel;