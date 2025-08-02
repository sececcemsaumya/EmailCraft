"use client";

const CATEGORIES = ["All", "Marketing", "E-commerce", "Newsletter", "Events"];


import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { FaEdit, FaTrash } from "react-icons/fa";

const EmailEditor = dynamic(() => import("react-email-editor"), { ssr: false });

const blankDesign = {
  body: {
    rows: [],
    values: {},
  },
};

export default function TemplatesManager() {
  const [templates, setTemplates] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");

  const [mode, setMode] = useState("create");
  const [editingId, setEditingId] = useState(null);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [pendingDesign, setPendingDesign] = useState(null);

  const emailEditorRef = useRef(null);
  const formRef = useRef(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`/api/templates?page=${page}&limit=5`);
    const json = await res.json();
    setTemplates(json.data);
    setTotalPages(json.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [page]);

  useEffect(() => {
    if (editorLoaded && pendingDesign) {
      if (emailEditorRef.current && emailEditorRef.current.editor) {
        emailEditorRef.current.editor.loadDesign(pendingDesign);
        setPendingDesign(null);
      }
    }
  }, [editorLoaded, pendingDesign]);

  const handleEditorLoad = () => {
    setEditorLoaded(true);
  };

  const resetForm = () => {
    setTitle("");
    setSubject("");
    setCategory("");
    setEditingId(null);
    setMode("create");

    if (emailEditorRef.current && emailEditorRef.current.editor) {
      emailEditorRef.current.editor.loadDesign(blankDesign);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    emailEditorRef.current.editor.exportHtml(async ({ html, design }) => {
      await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subject, category, content: html, design }),
      });

      resetForm();
      load();
    });
  };

  const handleEditClick = (template) => {
    setMode("edit");
    setEditingId(template._id);
    setTitle(template.title);
    setSubject(template.subject || "");
    setCategory(template.category || "");

    if (editorLoaded && emailEditorRef.current && emailEditorRef.current.editor) {
      emailEditorRef.current.editor.loadDesign(template.design);
    } else {
      setPendingDesign(template.design);
    }

    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdate = () => {
    emailEditorRef.current.editor.exportHtml(async ({ html, design }) => {
      await fetch(`/api/templates/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subject, category, content: html, design }),
      });

      resetForm();
      load();
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this template?")) {
      const res = await fetch(`/api/templates/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Template deleted.");
        load();
      } else {
        alert("Error deleting template.");
      }
    }
  };

  return (
    <div className="templateMgr-container">
      <h1 className="templateMgr-title">📧 Email Template Manager</h1>

      <form
        ref={formRef}
        onSubmit={
          mode === "create"
            ? handleCreate
            : (e) => {
                e.preventDefault();
                handleUpdate();
              }
        }
        className="templateMgr-form"
      >
        <h2 className="templateMgr-formTitle">
          {mode === "create" ? "✨ Create New Template" : "✏️ Edit Template"}
        </h2>

        <div className="templateMgr-formGroup">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="templateMgr-dropdown"
          >
            <option value="">Select Category</option>
            {CATEGORIES.filter((c) => c !== "All").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="templateMgr-editorWrapper">
          <EmailEditor ref={emailEditorRef} onLoad={handleEditorLoad} />
        </div>

        <div className="templateMgr-btnGroup">
          <button type="submit" className="templateMgr-btn templateMgr-btnPrimary">
            {mode === "create" ? "💾 Save Template" : "✅ Update Template"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              onClick={resetForm}
              className="templateMgr-btn templateMgr-btnCancel"
            >
              ❌ Cancel Edit
            </button>
          )}
        </div>
      </form>

      <hr className="templateMgr-divider" />

      <h2 className="templateMgr-subtitle">📁 Saved Templates</h2>

      {loading ? (
        <div className="templateMgr-spinner">⏳ Loading templates...</div>
      ) : (
        templates.map((t) => (
          <div key={t._id} className="templateMgr-card">
            <h3>{t.title}</h3>
            <p>
              <strong>Subject:</strong> {t.subject}
            </p>
            {t.category && (
              <p>
                <strong>Category:</strong> {t.category}
              </p>
            )}
            <div
              className="templateMgr-preview"
              dangerouslySetInnerHTML={{ __html: t.content }}
            />
            <div className="templateMgr-btnGroup">
              <button
                onClick={() => handleEditClick(t)}
                className="templateMgr-btn templateMgr-btnEdit"
              >
                <FaEdit style={{ marginRight: "6px" }} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="templateMgr-btn templateMgr-btnDelete"
              >
                <FaTrash style={{ marginRight: "6px" }} />
               Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div className="templateMgr-pagination">
        <button
          className="templateMgr-btnNav"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ⬅ Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className="templateMgr-btnNav"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
