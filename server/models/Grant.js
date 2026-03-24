import mongoose from 'mongoose'

const grantSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    amount: { type: String, required: true, trim: true },
    eligibility: { type: String, required: true, trim: true },
    deadline: { type: Date, required: true },
    applicationLink: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true },
    type: {
      type: String,
      enum: ['Grant', 'Funding', 'Investor'],
      default: 'Grant',
    },
    status: {
      type: String,
      enum: ['Active', 'Closed', 'Upcoming'],
      default: 'Active',
    },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Grant', grantSchema)
