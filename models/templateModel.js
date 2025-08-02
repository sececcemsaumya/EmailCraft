import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  category: { type: String, required : true},
  content: { type: String, required: true },
  design: { type: Object, required: true },
}, { timestamps: true });

export const TemplateModel = mongoose.models.Template || mongoose.model("Template", templateSchema);
