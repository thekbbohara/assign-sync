import dbConnect from "@/lib/dbConnect";
import Class, { IClass } from "@/model/class";
export const GET = async (req: Request) => {
  // Extract query parameters from URL
  const url = new URL(req.url);
  const filter = url.searchParams.get("filter"); // Extract "filter" query parameter
  // Extract userId from request headers or session
  const userId = req.headers.get("userId");
  if (!userId) {
    return new Response(
      JSON.stringify({ err: "User not authenticated or no userId provided!" }),
      { status: 401 }, // Unauthorized
    );
  }
  // Connect to the database
  await dbConnect();
  // Fetch the classes where the admin is the current user
  const classes: IClass[] = await Class.find({ admin: userId }).populate(
    "students.user",
  );
  const allStudents = classes.flatMap((c) => c.students);
  const uniqueStudents = Array.from(
    new Set(
      allStudents.map((student) => {
        if (student) {
          return student.user;
        }
      }),
    ),
  );
  // const uniqueStudentsDetails = uniqueStudents.map(async(student)=> allStudents)
  console.log({ uniqueStudents });
  if (filter === "total") {
    return new Response(
      JSON.stringify({ err: null, total: uniqueStudents.length }),
      { status: 200 }, // OK
    );
  }
  // Default response if filter is not "total"
  return new Response(
    JSON.stringify({ data: uniqueStudents, err: null }),
    { status: 400 }, // Bad Request
  );
};
