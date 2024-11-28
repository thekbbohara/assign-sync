import dbConnect from "@/lib/dbConnect";
import Class from "@/model/class";
import mongoose from "mongoose";

export const PUT = async (req: Request) => {
  const { code, userId } = await req.json();
  const uid = new mongoose.Types.ObjectId(userId);
  console.log({ code, uid });
  if (!code)
    return new Response(JSON.stringify({ err: "Invalid Code" }), {
      status: 400,
    });

  try {
    await dbConnect();
    const updatedClass = await Class.findOneAndUpdate(
      { inviteCode: code, admin: { $ne: uid } },
      { $addToSet: { students: { user: uid, joinedAt: Date.now() } } }, // Avoid duplication
      { new: true },
    );

    console.log({ updatedClass });
    if (!updatedClass) {
      return new Response(
        JSON.stringify({
          err: true,
          msg: "Invalid code or admin can't join class.",
        }),
        { status: 400 },
      );
    }
    return new Response(
      JSON.stringify({
        err: null,
        msg: "Class joined successfully.",
        class_id: updatedClass._id,
      }),
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ err: true, msg: "Something went wrong" }),
      { status: 500 },
    );
  }
};
