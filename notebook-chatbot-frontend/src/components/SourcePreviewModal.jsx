function getSourceIcon(type) {
  if (type === "PDF") return "📄";
  if (type === "DOCX") return "📘";
  if (type === "LINK") return "🔗";
  if (type === "TEXT") return "🗒️";
  return "📁";
}

function SourcePreviewModal({ source, onClose }) {
  if (!source) return null;

  return (
    <div className="modalOverlay">
      <div className="sourceModal">
        <div className="modalHeader">
          <div>
            <h2>Source Preview</h2>
            <p>Details of your uploaded source</p>
          </div>

          <button className="closeButton" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="previewIcon">{getSourceIcon(source.type)}</div>

        <div className="sourceDetails">
          <div>
            <span>File Name</span>
            <strong>{source.name}</strong>
          </div>

          <div>
            <span>Type</span>
            <strong>{source.type}</strong>
          </div>

          <div>
            <span>Pages</span>
            <strong>{source.pages}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{source.status}</strong>
          </div>

          <div>
            <span>Selected for Chat</span>
            <strong>{source.selected ? "Yes" : "No"}</strong>
          </div>

          {source.url && (
            <div>
              <span>Link</span>
              <strong>{source.url}</strong>
            </div>
          )}

          {source.preview && (
            <div>
              <span>Preview</span>
              <strong>{source.preview}</strong>
            </div>
          )}
        </div>

        <div className="modalNote">
          In the backend version, this section can show extracted text, page
          preview, document chunks, and source citations.
        </div>
      </div>
    </div>
  );
}

export default SourcePreviewModal;