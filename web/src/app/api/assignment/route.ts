import dbConnect from "@/lib/dbConnect";
import {
  Example,
  Requirement,
  TestCase,
  Assignment,
  type IAssignment,
} from "@/model/assignment";

export const POST = async (req: Request) => {
  const assignment = await req.json();
  // console.log("payloads", assignment);
  const {
    title,
    description,
    instructions,
    codeTemplate,
    classId,
    user,
    solution,
    examples,
    requirements,
    testCases,
    dueDate,
  } = assignment;
  // Validate required fields
  if (
    !title ||
    !description ||
    !instructions ||
    !codeTemplate ||
    !classId ||
    !user
  ) {
    return Response.json({ err: true, msg: "Missing required fields" });
  }
  try {
    // Connect to the database
    await dbConnect();
    const newAssignment = new Assignment({
      title,
      description,
      instructions,
      codeTemplate,
      class: classId,
      user,
      solution: solution ?? "",
      dueDate: dueDate ?? null,
    });
    // console.log("newAssignments", { newAssignment });
    // await newAssignment.save();
    const assignmentId = newAssignment._id;
    //save examples
    if (examples) {
      console.log("saving examples...");
      try {
        // Map the examples to include the assignmentId
        const exampleDocs = examples.map((example: { eg: string }) => ({
          eg: example.eg,
          assignmentId,
        }));
        // Insert the examples into the database
        const result = await Example.insertMany(exampleDocs);
        console.log("Examples saved result:", result);
        const exampleIds = result.map((doc) => doc._id);
        console.log("example ids:", exampleIds);
        newAssignment.examples = exampleIds;
      } catch (error) {
        console.error("Error saving examples:", error);
      }
    }
    //save requirements
    if (requirements) {
      // console.log("saving requirements...");
      try {
        // Map the requirements to include the assignmentId
        const requirementDocs = requirements.map((req: { req: string }) => ({
          req: req.req,
          assignmentId: assignmentId,
        }));
        // Insert the requirements into the database
        const result = await Requirement.insertMany(requirementDocs);

        // console.log("requirements saved", result);
        const requirementIds = result.map((doc) => doc._id);
        console.log("requirementIds", requirementIds);
        newAssignment.requirements = requirementIds;
      } catch (error) {
        console.error("Error saving requirements:", error);
      }
    }
    // save testCases
    if (testCases) {
      try {
        // Map the testCases to include the assignmentId
        const testCaseDocs = testCases.map(
          (testCase: { input: string; expected: string }) => ({
            input: testCase.input,
            expected: testCase.expected,
            assignmentId: assignmentId,
          }),
        );
        // Insert the testcases into the database
        const result = await TestCase.insertMany(testCaseDocs);
        // console.log("Examples saved:", result);
        const testCaseIds = result.map((doc) => doc._id);
        newAssignment.testCases = testCaseIds;
      } catch (error) {
        console.error("Error saving examples:", error);
      }
    }
    // Save the Assignment document
    await newAssignment.save();
    return Response.json({
      err: false,
      msg: "Assignment Created Successfully.",
    });
  } catch (error) {
    console.log("Error creating assignment:", error);
    return Response.json({ err: true, msg: "Unable to save Assignment" });
  }
};
export const GET = async (req: Request) => {
  const headers = req.headers;
  const id = headers.get("id");
  const user = headers.get("user");
  console.log({ user, id });
  if (!id && !user) {
    return new Response(
      JSON.stringify({
        err: true,
        msg: "Unable to fetch Assignments.",
      }),
    );
  }
  try {
    await dbConnect();
    if (!id) {
      const assignments: IAssignment[] = await Assignment.find({
        "submissions.user": user,
      });
      // console.log({ assignments });
      const msg =
        assignments.length >= 1
          ? "Assignment fetched successfully."
          : "No saved assignments.";
      return new Response(
        JSON.stringify({
          err: null,
          msg,
          assignments,
        }),
      );
    }
    const assignment = await Assignment.findById(id);
    // console.log(assignment);
    return Response.json({
      err: null,
      msg: "Assignment fetched successfully.",
      assignment,
    });
  } catch {
    return Response.json({ err: true, msg: "Something went wrong." });
  }
};

export const PUT = async (req: Request) => {
  const { code, userId, assignmentId } = await req.json();
  try {
    await dbConnect();

    // Step 1: Update the submission for the existing user
    const updatedAssignment = await Assignment.findOneAndUpdate(
      { _id: assignmentId, "submissions.user": userId }, // Match the assignment and specific user
      { $set: { "submissions.$.code": code } }, // Update the code for the matched user
      { new: true }, // Return the updated document
    );

    if (!updatedAssignment) {
      // Step 2: If no submission exists for the user, add a new one
      const newSubmission = await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          $push: { submissions: { user: userId, code } },
        },
        { new: true }, // Return the updated document
      );
      console.log("New submission added:", newSubmission);
      return new Response(JSON.stringify({ err: null }), {
        status: 200,
      });
    }

    // console.log("Submission updated:", updatedAssignment);
    return new Response(JSON.stringify({ err: null }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error updating assignment:", err);
    return new Response(JSON.stringify({ err: true }), {
      status: 500,
    });
  }
};
