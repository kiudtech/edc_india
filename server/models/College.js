import mongoose from 'mongoose'

const collegeSchema = new mongoose.Schema(
  {
    collegeName: { type: String, required: true, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    startupCount: { type: Number, default: 0 },
    activities: { type: String, default: '', trim: true },
    innovationData: { type: String, default: '', trim: true },
    workshopsConducted: { type: Number, default: 0 },
    incubationPrograms: { type: String, default: '', trim: true },
    successStories: { type: String, default: '', trim: true },
    ranking: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['applied', 'under-review', 'ranked', 'rejected'],
      default: 'applied',
    },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('College', collegeSchema)
