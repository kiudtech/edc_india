import mongoose from 'mongoose'

const ideaValidationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    founderName: { type: String, required: true, trim: true },
    founderEmail: { type: String, required: true, trim: true, lowercase: true },
    founderPhone: { type: String, required: true, trim: true },
    startupName: { type: String, required: true, trim: true },
    idea: { type: String, required: true, trim: true },
    innovationDescription: { type: String, default: '', trim: true },
    industry: { type: String, required: true },
    stage: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    transactionId: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'under-review', 'approved', 'rejected'],
      default: 'pending',
    },
    adminNotes: { type: String, default: '' },
    certificateIssued: { type: Boolean, default: false },
    certificateDate: { type: Date },
    rejectionReason: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('IdeaValidation', ideaValidationSchema)
