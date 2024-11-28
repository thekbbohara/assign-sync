import dbConnect from "@/lib/dbConnect";
import Assignment from "@/model/assignment";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ class_id: string }> },
) => {
  const { class_id } = await params;
  try {
    await dbConnect();
    const assignments = await Assignment.find({ class: class_id });
    console.log(assignments);
    if (assignments) {
      return Response.json(assignments);
    }
  } catch (err) {
    Response.json({ err: err });
  }
};
