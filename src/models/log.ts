import mongoose, { Schema, Model } from 'mongoose'

interface ILog {
  email: string
}

const logSchema = new Schema<ILog>(
  {
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Log =
  (mongoose.models.Log as Model<ILog>) || mongoose.model<ILog>('Log', logSchema)

export default Log
