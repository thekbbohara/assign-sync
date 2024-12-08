import mongoose, { Schema, Document, Model, model } from "mongoose";

export interface IExample extends Document {
  eg: string;
  assignmentId: Schema.Types.ObjectId;
}

export interface IRequirement extends Document {
  req: string;
  assignmentId: Schema.Types.ObjectId;
}

export interface ITestCase extends Document {
  input: string;
  expected: string;
  assignmentId: Schema.Types.ObjectId;
}

export interface ISubmission extends Document {
  code: string;
  user: Schema.Types.ObjectId;
  assignmentId: Schema.Types.ObjectId;
  submittedAt: Date;
}

export interface IAssignment extends Document {
  title: string;
  description: string;
  requirements: IRequirement[];
  examples: IExample[];
  instructions: string;
  codeTemplate: string;
  dueDate: Date | undefined | null;
  class: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  testCases: ITestCase[];
  submissions?: ISubmission[];
  solution?: string;
}

const exampleSchema = new Schema<IExample>({
  eg: { type: String, required: true },
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
});
const requirementsSchema = new Schema<IRequirement>({
  req: { type: String, required: true },
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
});

const testCasesSchema = new Schema<ITestCase>({
  input: { type: String, required: true },
  expected: { type: String, required: true },
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
});

const submissionsSchema = new Schema<ISubmission>({
  code: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  submittedAt: { type: Date, default: Date.now },
});

const assignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructions: { type: String, required: true },
    codeTemplate: { type: String, required: true },
    dueDate: { type: Date, default: null },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    solution: { type: String },
    examples: [{ type: Schema.Types.ObjectId, ref: "Example" }],
    requirements: [{ type: Schema.Types.ObjectId, ref: "Requirement" }],
    testCases: [{ type: Schema.Types.ObjectId, ref: "TestCase" }],
    submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
  },
  { timestamps: true },
);

export const Assignment: Model<IAssignment> =
  mongoose.models.Assignment ||
  model<IAssignment>("Assignment", assignmentSchema);

export const Example =
  mongoose.models.Example || mongoose.model("Example", exampleSchema);
export const Requirement =
  mongoose.models.Requirement ||
  mongoose.model("Requirement", requirementsSchema);
export const TestCase =
  mongoose.models.TestCase || mongoose.model("TestCase", testCasesSchema);
export const Submission =
  mongoose.models.Submission || mongoose.model("Submission", submissionsSchema);
