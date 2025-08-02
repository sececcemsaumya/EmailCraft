import { connectDB } from "@/lib/db";
import { TemplateModel } from "@/models/templateModel";

export async function GET(_req, { params }) {
  await connectDB();
  const item = await TemplateModel.findById(params.id);
  return Response.json({ status: item ? "Success" : "Not found", data: item });
}

export async function PATCH(req, { params }) {
  await connectDB();
  const updates = await req.json();
  const updated = await TemplateModel.findByIdAndUpdate(params.id, updates, { new: true });
  return Response.json({ status: updated ? "Success" : "Not found", data: updated });
}

export async function DELETE(_req, { params }) {
  await connectDB();
  await TemplateModel.findByIdAndDelete(params.id);
  return Response.json({ status: "Deleted" });
}