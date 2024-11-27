import dbConnect from "@/lib/dbConnect";
import { generateInviteCode } from "@/lib/geneateInviteCode";
import Class, { IClass } from "@/model/class";

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const data: IClass = await req.json();
    const newClass = new Class({ ...data, inviteCode: generateInviteCode() });
    await newClass.save();
    return Response.json({ msg: "Class created successfully" });
  } catch (e) {
    return Response.json({ msg: null, error: e });
  }
};

export const GET = async (req: Request) => {
  await dbConnect();
  const user = req.headers.get("user");
  // console.log({ user });
  if (!user || user == undefined) return Response.json([]);
  const classes = await Class.find({ admin: user });

  // console.log({ classes });
  return Response.json(classes);
};
