import { model, Model, models, type ObjectId, Schema } from "mongoose";
import { IUser } from "./user";

export interface IAssignment extends Document {
  _id?: ObjectId;
  title: string;
  description?: string;
  class: ObjectId;
  dueDate?: Date;
  starterCode?: string;
  testCases: string[];
  solution?: string;
  submissions?: { user: IUser; answer: string }[];
}

const assignSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    description: { type: String },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    dueDate: { type: Date },
    starterCode: { type: String },
    testCases: { type: [String] },
    solution: { type: String },
    submissions: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        answer: { type: String },
      },
    ],
  },
  { timestamps: true },
);

const Assignment =
  (models.Assignment as Model<IAssignment>) ||
  model<IAssignment>("Assignment", assignSchema);

export default Assignment;
