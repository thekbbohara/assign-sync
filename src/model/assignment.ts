import mongoose, { Schema, Document, Model, model } from "mongoose";

// Define the TestCase schema
const testCaseSchema = new Schema(
  {
    input: { type: String, required: true },
    expected: { type: String, required: true },
  },
  { _id: false }, // Prevents Mongoose from creating an `_id` for each test case
);

// Define the Assignment Schema
const assignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true }, // Array of strings
    examples: { type: [String], default: [] }, // Array of example strings
    instructions: { type: String, required: true },
    codeTemplate: { type: String, required: true },
    output: { type: String, required: true },
    dueDate: { type: Date, required: true },
    selectedClass: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    testCases: { type: [testCaseSchema], required: true }, // Array of test cases
  },
  { timestamps: true }, // Automatically add `createdAt` and `updatedAt` fields
);

// Define the IAssignment interface (optional, if you want to add typing)
interface IAssignment extends Document {
  title: string;
  description: string;
  requirements: string[];
  examples: string[];
  instructions: string;
  codeTemplate: string;
  output: string;
  dueDate: Date;
  selectedClass: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  testCases: { input: string; expected: string }[];
}

// Create and export the Assignment model
const Assignment: Model<IAssignment> =
  mongoose.models.Assignment ||
  model<IAssignment>("Assignment", assignmentSchema);

export default Assignment;
