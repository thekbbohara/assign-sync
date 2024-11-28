import dbConnect from "@/lib/dbConnect";
import Class from "@/model/class";

export const PUT = async (req: Request) => {
  const { code, userId } = await req.json();
  // console.log({ code, userId });
  if (!code) return Response.json({ err: "Invalid Code" });
  try {
    await dbConnect();
    const updatedClass = await Class.findOneAndUpdate(
      { inviteCode: code, admin: { $ne: userId } },
      // { $push: { students: userId } },
      { $addToSet: { students: userId } }, //Avoid duplication
      { new: true },
    );
    if (!updatedClass)
      return Response.json({
        err: true,
        msg: "Invalid code or admin can't join class.",
      });
    return Response.json({
      err: null,
      mdg: "Class joind successfully.",
      class_id: updatedClass._id,
    });
  } catch (e) {
    return Response.json({ err: true, msg: e });
  }
};
