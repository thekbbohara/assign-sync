import { model, Model, models, type ObjectId, Schema } from "mongoose";

export interface IAssignment extends Document {
  title: string;
  description?: string;
  class: ObjectId;
  dueDate?: Date;
  starterCode?: string;
  testCases: string[];
  solution?: string;
}

const assignSchema = new Schema<IAssignment>({
  title: { type: String, required: true },
  description: { type: String },
  class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  dueDate: { type: Date },
  starterCode: { type: String },
  testCases: { type: [String] },
  solution: { type: String },
});

const Assignment =
  (models.Assignment as Model<IAssignment>) ||
  model<IAssignment>("Assignment", assignSchema);

export default Assignment;
