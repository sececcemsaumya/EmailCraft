import { connectDB } from "@/lib/db";
import { SavedTemplateModel } from "@/models/savedTemplateModel";

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    await SavedTemplateModel.findByIdAndDelete(params.id);
    return Response.json({ status: "Success", message: "Template deleted." });
  } catch (err) {
    return Response.json({ status: "Error", message: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const data = await req.json();
    const updated = await SavedTemplateModel.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return Response.json({ status: "Success", data: updated });
  } catch (err) {
    return Response.json({ status: "Error", message: err.message }, { status: 500 });
  }
}
