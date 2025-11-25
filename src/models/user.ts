import mongoose, { Schema, Model } from 'mongoose'

interface IUser {
  name: string
  email: string
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>('User', userSchema)

export default User
