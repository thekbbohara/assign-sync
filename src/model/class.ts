import { generateInviteCode } from "@/lib/geneateInviteCode";
import { Model, model, models, ObjectId, Schema } from "mongoose";
import { IUser } from "./user";
import { IAssignment } from "./assignment";

export interface IStudent extends IUser {
  _id: ObjectId;
  joinedAt: Date;
  completedAssignments: number;
  totalAssignments: number;
}
export interface IAssignments extends IAssignment {
  _id: ObjectId;
  submissions: number;
  totalStudents: number;
}
export interface IClass {
  _id?: ObjectId;
  name: string;
  subject: string;
  description?: string;
  inviteCode: string;
  admin: ObjectId;
  students?: IStudent[];
  assignments?: IAssignments[];
}

// Schema definition
const classSchema = new Schema<IClass>({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: false },
  inviteCode: { type: String, required: true, unique: true },
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      unique: true,
      default: [],
    },
  ],
  assignments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: false,
      default: [],
    },
  ],
});

classSchema.pre("save", async function (next) {
  const classDoc = this;

  if (!classDoc.inviteCode) {
    classDoc.inviteCode = generateInviteCode();
  }

  let attempts = 0;
  while (attempts < 5) {
    const existingClass = await model<IClass>("Class").findOne({
      inviteCode: classDoc.inviteCode,
    });

    if (!existingClass) {
      break;
    } else {
      classDoc.inviteCode = generateInviteCode();
      attempts++;
    }
  }

  if (attempts >= 5) {
    classDoc.inviteCode = classDoc._id.toString();
  }

  next(); // Ensure this is after your async operations
});

// const Class =
//   (models.Class as Model<IClass>) || model<IClass>("Class", classSchema);

const Class = models.Class || model<IClass>("Class", classSchema);

export default Class;
