import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "types";
import bcrypt from "bcryptjs";

interface IUserModal extends Model<IUser> {
  findOneOrCreateFromGoogle(profile: any): Promise<IUser>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  role: { type: String, default: "user" },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.findOneOrCreateFromGoogle = async function (profile: any) {
  const { id, emails, displayName } = profile;

  let user =
    (await this.findOne({ googleId: id })) ||
    (await this.findOne({ email: emails[0].value }));

  if (!user) {
    user = new this({
      googleId: id,
      email: emails[0].value,
      name: displayName,
    });

    await user.save;
  }

  return user;
};

const User: IUserModal = mongoose.model<IUser, IUserModal>("User", userSchema);
export default User;
