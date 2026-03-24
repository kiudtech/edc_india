import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved'],
      default: 'open',
    },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Ticket', ticketSchema)
