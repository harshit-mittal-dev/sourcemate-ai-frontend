function getSourceIcon(type) {
  if (type === "PDF") return "📄";
  if (type === "DOCX") return "📘";
  if (type === "LINK") return "🔗";
  if (type === "TEXT") return "🗒️";
  return "📁";
}

function SourcesPanel({
  sources,
  toggleSource,
  handleViewSource,
  handleDeleteSource,
  openUploadModal,
}) {
  return (
    <aside className="sourcesPanel">
      <div className="panelHeader">
        <div>
          <h2>Sources</h2>
          <p>{sources.length} uploaded</p>
        </div>

        <button className="addButton" onClick={openUploadModal}>
          + Add
        </button>
      </div>

      <div className="sourceList">
        {sources.map((source) => (
          <div
            key={source.id}
            className={source.selected ? "sourceCard active" : "sourceCard"}
            onClick={() => toggleSource(source.id)}
          >
            <div className="sourceIcon">{getSourceIcon(source.type)}</div>

            <div className="sourceInfo">
              <h3>{source.name}</h3>
              <p>
                {source.type} • {source.pages} pages
              </p>
              <span>{source.status}</span>

              <div className="sourceActions">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleViewSource(source);
                  }}
                >
                  View
                </button>

                <button
                  className="dangerButton"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteSource(source.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="checkCircle">{source.selected ? "✓" : ""}</div>
          </div>
        ))}
      </div>

      <div className="sourceTip">
        <strong>Tip:</strong> Select only the sources you want the chatbot to
        use.
      </div>
    </aside>
  );
}

export default SourcesPanel;