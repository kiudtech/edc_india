import mongoose from 'mongoose'

const contactRequestSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      enum: ['startup_application', 'investor_interest', 'college_partnership', 'newsletter'],
      required: true,
    },
    formTitle: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      default: '',
      trim: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
    },
    adminNotes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('ContactRequest', contactRequestSchema)
