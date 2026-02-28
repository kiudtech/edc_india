import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ['membership', 'validation', 'course'],
      required: true,
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'pending',
    },
    transactionId: { type: String, unique: true },
  },
  { timestamps: true }
)

export default mongoose.model('Payment', paymentSchema)
