import dbConnect from "@/lib/dbConnect";
import Class from "@/model/class";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  try {
    await dbConnect();
    const classExist = await Class.findById(id).populate(["students"]);
    if (classExist) {
      return Response.json(classExist);
    }
  } catch (err) {
    Response.json({ err: err });
  }
};
