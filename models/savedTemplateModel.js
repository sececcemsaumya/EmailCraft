import mongoose from "mongoose";

const savedTemplateSchema = new mongoose.Schema({
  title: String,
  subject: String,
  fromEmail: String,
  toEmail: String,
  category: String,
  content: String,
  design: Object
}, {
  timestamps: true,
});

export const SavedTemplateModel =
  mongoose.models.SavedTemplate || mongoose.model("SavedTemplate", savedTemplateSchema);
