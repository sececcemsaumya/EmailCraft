"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";

const EmailEditor = dynamic(() => import("react-email-editor"), { ssr: false });

export default function TemplateEditor({ template, onCancel }) {
  const emailEditorRef = useRef(null);

  const handleEditorLoad = () => {
    if (template?.design) {
      emailEditorRef.current?.editor.loadDesign(template.design);
    }
  };

  const handleSaveClick = () => {
    const editorInstance = emailEditorRef.current?.editor;
    if (!editorInstance) {
      alert("Editor not ready");
      return;
    }

    editorInstance.exportHtml(async ({ html, design }) => {
      const { _id, ...templateWithoutId } = template;

      const res = await fetch("/api/user-saved-templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...templateWithoutId, content: html, design }),
      });

      try {
        const json = await res.json();
        alert(json.status === "Saved" ? "✅ Template saved!" : "❌ Save failed.");
      } catch (e) {
        alert("❌ Failed to parse server response.");
      }

      onCancel(); // Close editor
    });
  };

  return (
    <div>
      <EmailEditor
        ref={emailEditorRef}
        onLoad={handleEditorLoad}
        style={{ height: "600px" }}
      />
      <div className="editor-actions">
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
