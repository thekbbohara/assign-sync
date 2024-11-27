import dbConnect from "@/lib/dbConnect";
import Class from "@/model/class";

export const PUT = async (req: Request) => {
  const { code, userId } = await req.json();
  console.log({ code, userId });
  if (!code) return Response.json({ err: "no code" });
  try {
    await dbConnect();
    const classExist = await Class.findOneAndUpdate(
      { inviteCode: code },
      { $push: { students: userId } },
      { new: true },
    );
    return Response.json({ err: null, class: classExist });
  } catch (e) {
    return Response.json({ err: e });
  }
};
