"use client";
import { useEffect, useState } from "react";
import TemplateEditor from "@/components/TemplateEditor";
import { FaEdit, FaTrash } from "react-icons/fa"; 

export default function SavedTemplates() {
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/user-saved-templates");
        const json = await res.json();
        if (json.status === "Success") {
          setSavedTemplates(json.data);
        } else {
          setError("No templates found.");
        }
      } catch (err) {
        setError("Failed to fetch templates.");
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/user-saved-templates/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();
    if (json.status === "Success") {
      setSavedTemplates((prev) => prev.filter((t) => t._id !== id));
    } else {
      alert("Failed to delete template.");
    }
  };

  if (editingTemplate) {
    return (
      <TemplateEditor
        template={editingTemplate}
        onCancel={() => setEditingTemplate(null)}
      />
    );
  }

  return (
    <div className="saved-wrapper">
      <h2 className="saved-title">Your Saved Templates</h2>

      {loading && <p className="saved-message">⏳ Loading...</p>}
      {error && <p className="saved-error">{error}</p>}

      <div className="saved-template-grid">
        {savedTemplates.map((template) => (
          <div key={template._id} className="saved-template-card">
            <div
              className="saved-template-preview"
              dangerouslySetInnerHTML={{ __html: template.content }}
            />
            <div className="saved-template-meta">
              <h3>{template.title || "Untitled"}</h3>
              <p>{template.subject || "No subject."}</p>
              <div className="saved-template-buttons">
                <button
                  onClick={() => setEditingTemplate(template)}
                  className="saved-edit-btn"
                >
                  <FaEdit style={{ marginRight: "6px" }} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(template._id)}
                  className="saved-delete-btn"
                >
                  <FaTrash style={{ marginRight: "6px" }} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}