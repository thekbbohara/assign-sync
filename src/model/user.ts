import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  name?: string;
  email: string;
  avatar?: string;
}
const userSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, required: true },
  name: String,
  email: { type: String, required: true },
  avatar: String,
})

const UserModel = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", userSchema)

export default UserModel;
