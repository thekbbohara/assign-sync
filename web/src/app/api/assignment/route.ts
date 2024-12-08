import dbConnect from "@/lib/dbConnect";
import {
  Example,
  Requirement,
  TestCase,
  Assignment,
  type IAssignment,
} from "@/model/assignment";

// export const POST = async (req: Request) => {
//   const assignment = await req.json();
//   if (!assignment)
//     return Response.json({ err: true, msg: "Unable to save Assignment" });
//   try {
//     await dbConnect();
//     const newAssignmet = new Assignment({ ...assignment });
//     // console.log(newAssignmet);
//     await newAssignmet.save();
//     return Response.json({
//       err: null,
//       msg: "Assignment Created Successfully.",
//     });
//   } catch (e) {
//     console.log(e);
//     return Response.json({ err: true, msg: "Unable to save Assignment" });
//   }
// };

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

// export const POST = async (req: Request) => {
//   const assignment = await req.json();
//   console.log("payloads", assignment);

//   const {
//     title,
//     description,
//     instructions,
//     codeTemplate,
//     classId,
//     user,
//     solution,
//     examples,
//     requirements,
//     testCases,
//     dueDate,
//   } = assignment;

//   // Validate required fields
//   if (
//     !title ||
//     !description ||
//     !instructions ||
//     !codeTemplate ||
//     !classId ||
//     !user
//   ) {
//     return Response.json({ err: true, msg: "Missing required fields" });
//   }

//   try {
//     // Connect to the database
//     await dbConnect();

//     // Create the Assignment document first
//     const newAssignment = new Assignment({
//       title,
//       description,
//       instructions,
//       codeTemplate,
//       class: classId,
//       user,
//       solution: solution ?? "",
//       dueDate: dueDate ?? null,
//     });

//     // console.log("newAssignment", { newAssignment });

//     // Save the assignment to get the _id before adding references
//     await newAssignment.save();
//     const assignmentId = newAssignment._id;

//     // Save examples
//     if (examples && examples.length > 0) {
//       console.log("saving examples...");
//       try {
//         examples.forEach(async ({ eg }: { eg: string }) => {
//           const newEg = new Example({
//             eg,
//             assignmentId,
//           });
//           if (newEg._id) {
//             await newEg.save();
//             newAssignment.examples = newAssignment.examples || [];
//             newAssignment.examples.push(newEg._id);
//           }
//         });
//       } catch (error) {
//         console.error("Error saving examples:", error.message, error.stack);
//       }
//     }

//     // Save requirements
//     if (requirements && requirements.length > 0) {
//       console.log("saving requirements...");
//       try {
//         await Promise.all(
//           requirements.map(async ({ req }: { req: string }) => {
//             const newReq = new Requirement({
//               req,
//               assignmentId,
//             });
//             await newReq.save();
//             newAssignment.requirements = newAssignment.requirements || [];
//             newAssignment.requirements.push(newReq._id);
//           }),
//         );
//       } catch (error) {
//         console.error("Error saving requirements:", error.message, error.stack);
//       }
//     }

//     // Save test cases
//     if (testCases && testCases.length > 0) {
//       console.log("saving test cases...");
//       try {
//         await Promise.all(
//           testCases.map(
//             async ({
//               input,
//               expected,
//             }: {
//               input: string;
//               expected: string;
//             }) => {
//               const newTestCase = new TestCase({
//                 input,
//                 expected,
//                 assignmentId,
//               });
//               await newTestCase.save();
//               newAssignment.testCases = newAssignment.testCases || [];
//               newAssignment.testCases.push(newTestCase._id);
//             },
//           ),
//         );
//       } catch (error) {
//         console.error("Error saving test cases:", error.message, error.stack);
//       }
//     }

//     // Now that all references are saved, update the assignment with the references
//     await newAssignment.save();

//     return Response.json({
//       err: false,
//       msg: "Assignment Created Successfully.",
//     });
//   } catch (error) {
//     console.log("Error creating assignment:", error?.message, error?.stack);
//     return Response.json({ err: true, msg: "Unable to save Assignment" });
//   }
// };

//claude
// export const POST = async (req: Request) => {
//   try {
//     const assignment = await req.json();
//     console.log("Assignment payload:", assignment);

//     const {
//       title,
//       description,
//       instructions,
//       codeTemplate,
//       classId,
//       user,
//       solution,
//       examples,
//       requirements,
//       testCases,
//       dueDate,
//     } = assignment;

//     // Validate required fields
//     const requiredFields = [
//       { field: "title", value: title },
//       { field: "description", value: description },
//       { field: "instructions", value: instructions },
//       { field: "codeTemplate", value: codeTemplate },
//       { field: "classId", value: classId },
//       { field: "user", value: user },
//     ];

//     const missingFields = requiredFields
//       .filter(({ value }) => !value)
//       .map(({ field }) => field);

//     if (missingFields.length > 0) {
//       return Response.json(
//         {
//           err: true,
//           msg: `Missing required fields: ${missingFields.join(", ")}`,
//         },
//         { status: 400 },
//       );
//     }

//     try {
//       // Create new assignment without transaction
//       const newAssignment = new Assignment({
//         title,
//         description,
//         instructions,
//         codeTemplate,
//         class: classId,
//         user,
//         solution: solution ?? "",
//         dueDate: dueDate ?? null,
//       });

//       // Save assignment to get _id
//       await newAssignment.save();
//       const assignmentId = newAssignment._id;

//       // Prepare promises for saving related documents
//       const savePromises = [];

//       // Save examples
//       if (examples && examples.length > 0) {
//         const exampleDocs = examples.map((example: { eg: string }) => ({
//           eg: example.eg,
//           assignmentId,
//         }));

//         const examplesPromise = Example.insertMany(exampleDocs).then(
//           (savedExamples) => {
//             newAssignment.examples = savedExamples.map((doc) => doc._id);
//           },
//         );
//         savePromises.push(examplesPromise);
//       }

//       // Save requirements
//       if (requirements && requirements.length > 0) {
//         const requirementDocs = requirements.map((req: { req: string }) => ({
//           req: req.req,
//           assignmentId,
//         }));

//         const requirementsPromise = Requirement.insertMany(
//           requirementDocs,
//         ).then((savedRequirements) => {
//           newAssignment.requirements = savedRequirements.map((doc) => doc._id);
//         });
//         savePromises.push(requirementsPromise);
//       }

//       // Save test cases
//       if (testCases && testCases.length > 0) {
//         const testCaseDocs = testCases.map(
//           (testCase: { input: string; expected: string }) => ({
//             input: testCase.input,
//             expected: testCase.expected,
//             assignmentId,
//           }),
//         );

//         const testCasesPromise = TestCase.insertMany(testCaseDocs).then(
//           (savedTestCases) => {
//             newAssignment.testCases = savedTestCases.map((doc) => doc._id);
//           },
//         );
//         savePromises.push(testCasesPromise);
//       }

//       // Wait for all related document saves
//       await Promise.all(savePromises);

//       // Save the updated assignment
//       await newAssignment.save();

//       return Response.json(
//         {
//           err: false,
//           msg: "Assignment Created Successfully.",
//           assignmentId: assignmentId,
//         },
//         { status: 201 },
//       );
//     } catch (saveError) {
//       console.error("Error saving assignment details:", saveError);
//       return Response.json(
//         {
//           err: true,
//           msg: "Unable to save Assignment",
//           details: saveError instanceof Error ? saveError.message : saveError,
//         },
//         { status: 500 },
//       );
//     }
//   } catch (error) {
//     console.error("Error processing assignment creation:", error);
//     return Response.json(
//       {
//         err: true,
//         msg: "Error processing assignment creation",
//         details: error instanceof Error ? error.message : error,
//       },
//       { status: 500 },
//     );
//   }
// };

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
      console.log({ assignments });
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
