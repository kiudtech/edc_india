import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    duration: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    instructor: { type: String, default: '', trim: true },
    type: {
      type: String,
      enum: ['free', 'paid'],
      default: 'paid',
    },
    contentLink: { type: String, default: '', trim: true },
    isVisible: { type: Boolean, default: true },
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

export default mongoose.model('Course', courseSchema)
