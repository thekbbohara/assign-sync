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
    console.log({ classExist });
    if (classExist) {
      return Response.json({ class: classExist });
    }
  } catch (err) {
    Response.json({ err: err });
  }
};
