import dbConnect from "@/lib/dbConnect";
import Class from "@/model/class";
import mongoose from "mongoose";

export const PUT = async (req: Request) => {
  const { code, userId } = await req.json();
  const uid = new mongoose.Types.ObjectId(userId);
  console.log({ code, uid });

  if (!code) {
    return new Response(JSON.stringify({ err: "Invalid Code" }), {
      status: 400,
    });
  }

  try {
    await dbConnect();

    // Check if the class exists with the given code
    const targetClass = await Class.findOne({ inviteCode: code });
    if (!targetClass) {
      return new Response(JSON.stringify({ err: true, msg: "Invalid code." }), {
        status: 400,
      });
    }

    // Check if the user is the admin of the class
    if (targetClass.admin.equals(uid)) {
      return new Response(
        JSON.stringify({ err: true, msg: "Admin cannot join the class." }),
        { status: 400 },
      );
    }
    type TStudent = {
      user: mongoose.Types.ObjectId; // Explicitly define the type
      joinedAt?: Date;
    };
    // Check if the user is already in the students array
    const isAlreadyStudent = targetClass.students.some((student: TStudent) =>
      student.user.equals(uid),
    );
    if (isAlreadyStudent) {
      return new Response(
        JSON.stringify({ err: true, msg: "User already joined the class." }),
        { status: 400 },
      );
    }

    // Add the user to the class if all checks pass
    targetClass.students.push({ user: uid, joinedAt: Date.now() });
    await targetClass.save();

    return new Response(
      JSON.stringify({
        err: null,
        msg: "Class joined successfully.",
        class_id: targetClass._id,
      }),
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ err: true, msg: "Something went wrong." }),
      { status: 500 },
    );
  }
};
