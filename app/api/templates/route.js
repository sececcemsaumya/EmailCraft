import { connectDB } from "@/lib/db";
import { TemplateModel } from "@/models/templateModel";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;
  const total = await TemplateModel.countDocuments();
  const templates = await TemplateModel.find().skip(skip).limit(limit);

  return Response.json({
    status: "Success",
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    data: templates,
  });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json(); 
  const newTemplate = await TemplateModel.create(data);
  return Response.json({ status: "Created", data: newTemplate }, { status: 201 });
}
