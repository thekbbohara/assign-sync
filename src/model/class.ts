import { Model, model, models, ObjectId, Schema } from "mongoose";

export interface IClass {
  name: string;
  subject: string;
  description?: string;
  students?: ObjectId[];
  inviteCode: string;
}

const classSchema = new Schema<IClass>({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: Text },
  inviteCode: { type: String, required: true, unique: true }
})

const ClassModel = (models.ClassModel as Model<IClass>) || model<IClass>("ClassModel", classSchema)
export default ClassModel;
