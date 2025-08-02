"use client";
import { useEffect, useState } from "react";
import TemplateEditor from "@/components/TemplateEditor";

const CATEGORIES = ["All", "Marketing", "E-commerce", "Newsletter", "Events"];

export default function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await fetch("/api/templates?page=1&limit=100");
      const json = await res.json();
      setTemplates(json.data);
      setFilteredTemplates(json.data);
    };
    fetchTemplates();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setFilteredTemplates(
      category === "All"
        ? templates
        : templates.filter((t) => t.category === category)
    );
  };

  // 👇 Just render editor if editing
  if (editingTemplate) {
    return (
      <TemplateEditor
        template={editingTemplate}
        onCancel={() => setEditingTemplate(null)}
      />
    );
  }

  return (
    <div>
      <div className="intro-text">
        <h1>Explore Stunning Email Templates</h1>
        <p>Discover beautifully crafted email templates across various categories.</p>
        <p>
          Easily preview, filter, and edit templates directly in an intuitive
          drag-and-drop editor.
        </p>
        <p>
          Perfect for newsletters, marketing, events, and more — no coding
          required!
        </p>
      </div>

      <div className="category-buttons">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => handleCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="template-grid">
        <div
          className="template-card blank-template"
          onClick={() =>
            setEditingTemplate({
              title: "",
              subject: "",
              content: "",
              category: "",
              fromEmail: "",
              toEmail: "",
              design: null,
            })
          }
        >
          <div className="blank-icon">✏️</div>
          <div>
            <h3>Blank Template</h3>
            <p>Start from scratch with a clean slate.</p>
          </div>
        </div>

        {filteredTemplates.map((template) => (
          <div key={template._id} className="template-card">
            <div className="template-content">
  <div className="template-inner" dangerouslySetInnerHTML={{ __html: template.content }} />
</div>

            <div className="template-info">
              <h3>{template.title || "Untitled"}</h3>
              <p>{template.subject || "No subject available."}</p>
              <p className="author">Designed by CraftMail</p>
              <button onClick={() => setEditingTemplate(template)} className="edit-button">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
