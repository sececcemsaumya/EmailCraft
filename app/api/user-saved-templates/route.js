import { connectDB } from "@/lib/db";
import { SavedTemplateModel } from "@/models/savedTemplateModel";

export async function GET() {
  await connectDB();
  const templates = await SavedTemplateModel.find();
  return Response.json({ status: "Success", data: templates });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  // Remove _id if exists
  if (data._id) {
    delete data._id;
  }

  const savedTemplate = await SavedTemplateModel.create(data);
  return Response.json({ status: "Saved", data: savedTemplate }, { status: 201 });
}

