import { useState } from "react";

function UploadModal({
  isOpen,
  onClose,
  handleFilesSelected,
  handleAddTextSource,
  handleAddLinkSource,
}) {
  const [activeTab, setActiveTab] = useState("file");
  const [textTitle, setTextTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  if (!isOpen) return null;

  function uploadFiles(event) {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      return;
    }

    handleFilesSelected(files);
    event.target.value = "";
    onClose();
  }

  function submitTextSource() {
    if (!textTitle.trim() || !textContent.trim()) {
      alert("Please add a title and some text.");
      return;
    }

    handleAddTextSource(textTitle, textContent);
    setTextTitle("");
    setTextContent("");
    onClose();
  }

  function submitLinkSource() {
    if (!linkUrl.trim()) {
      alert("Please paste a link first.");
      return;
    }

    handleAddLinkSource(linkUrl);
    setLinkUrl("");
    onClose();
  }

  return (
    <div className="modalOverlay">
      <div className="uploadModal">
        <div className="modalHeader">
          <div>
            <h2>Add Source</h2>
            <p>Upload files, paste notes, or add a website link.</p>
          </div>

          <button className="closeButton" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="uploadTabs">
          <button
            className={activeTab === "file" ? "activeUploadTab" : ""}
            onClick={() => setActiveTab("file")}
          >
            Upload File
          </button>

          <button
            className={activeTab === "text" ? "activeUploadTab" : ""}
            onClick={() => setActiveTab("text")}
          >
            Paste Text
          </button>

          <button
            className={activeTab === "link" ? "activeUploadTab" : ""}
            onClick={() => setActiveTab("link")}
          >
            Add Link
          </button>
        </div>

        {activeTab === "file" && (
          <div className="uploadBox">
            <div className="uploadIcon">📁</div>

            <h3>Upload your documents</h3>
            <p>Select a PDF, DOCX, TXT, PPT, or any notes file.</p>

            <input
              className="nativeFileInput"
              type="file"
              multiple
              onChange={uploadFiles}
            />

            <p className="uploadHint">
              After choosing a file and pressing Open, it will directly appear
              in Sources.
            </p>
          </div>
        )}

        {activeTab === "text" && (
          <div className="manualSourceBox">
            <label>Source Title</label>
            <input
              value={textTitle}
              onChange={(event) => setTextTitle(event.target.value)}
              placeholder="Example: DBMS Unit 1 Notes"
            />

            <label>Paste Text</label>
            <textarea
              value={textContent}
              onChange={(event) => setTextContent(event.target.value)}
              placeholder="Paste your notes or content here..."
            />

            <button className="submitSourceButton" onClick={submitTextSource}>
              Add Text Source
            </button>
          </div>
        )}

        {activeTab === "link" && (
          <div className="manualSourceBox">
            <label>Website Link</label>
            <input
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
              placeholder="https://example.com/article"
            />

            <div className="modalNote">
              For now this saves the link as a source. Later backend can fetch
              and extract the page content.
            </div>

            <button className="submitSourceButton" onClick={submitLinkSource}>
              Add Link Source
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadModal;