// // const exampleSchema= new Schema({ example: {type:String},assignmentId:{type:Schema.Types.ObjectId, required:true} },{_id:false});
// // const requirements= new Schema({ requirment: String, assignmentId:{type:Schema.Types.ObjectId} },{_id:false});
// // const testCases= new Schema({input:String,output:String,assignmentId:{type:Schema.Types.ObjectId}},{_id:false});
// // const submissions= new Schema({ code: String, user: { type: Schema.Types.ObjectId, ref: "User" },assignmentId:{type:Schema.Types.ObjectId}},{_id:false});

// // const assignmentSchema = new Schema<IAssignment>(
// //   {
// //     title: { type: String, required: true },
// //     description: { type: String, required: true },
// //     instructions: { type: String, required: true },
// //     codeTemplate: { type: String, required: true },
// //     dueDate: { type: Date, required: false, default: null },
// //     class: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Class",
// //       required: true,
// //     },
// //     user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
// //     solution: { type: String },
// //   },
// //   { timestamps: true }, // Automatically add `createdAt` and `updatedAt` fields
// // );

// // ChatGPT
// const exampleSchema = new Schema({
//   type: { type: String, required: true },
//   assignmentId: {
//     type: Schema.Types.ObjectId,
//     ref: "Assignment",
//     required: true,
//   },
// });

// const requirementsSchema = new Schema({
//   type: { type: String, required: true },
//   assignmentId: {
//     type: Schema.Types.ObjectId,
//     ref: "Assignment",
//     required: true,
//   },
// });

// const testCasesSchema = new Schema({
//   input: { type: String, required: true },
//   output: { type: String, required: true },
//   assignmentId: {
//     type: Schema.Types.ObjectId,
//     ref: "Assignment",
//     required: true,
//   },
// });

// const submissionsSchema = new Schema({
//   code: { type: String, required: true },
//   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   assignmentId: {
//     type: Schema.Types.ObjectId,
//     ref: "Assignment",
//     required: true,
//   },
//   submittedAt: { type: Date, default: Date.now },
// });

// const assignmentSchema = new Schema<IAssignment>(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     instructions: { type: String, required: true },
//     codeTemplate: { type: String, required: true },
//     dueDate: { type: Date, default: null },
//     class: {
//       type: Schema.Types.ObjectId,
//       ref: "Class",
//       required: true,
//     },
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     solution: { type: String },
//     // Arrays of references
//     examples: [{ type: Schema.Types.ObjectId, ref: "Example" }],
//     requirements: [{ type: Schema.Types.ObjectId, ref: "Requirement" }],
//     testCases: [{ type: Schema.Types.ObjectId, ref: "TestCase" }],
//     submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
//   },
//   { timestamps: true }, // Automatically add `createdAt` and `updatedAt` fields
// );

// module.exports = {
//   Assignment: mongoose.model("Assignment", assignmentSchema),
//   Example: mongoose.model("Example", exampleSchema),
//   Requirement: mongoose.model("Requirement", requirementsSchema),
//   TestCase: mongoose.model("TestCase", testCasesSchema),
//   Submission: mongoose.model("Submission", submissionsSchema),
// };
