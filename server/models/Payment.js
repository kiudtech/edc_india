import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ['membership', 'validation', 'course', 'fellowship'],
      required: true,
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'pending',
    },
    transactionId: { type: String, unique: true },
    gateway: { type: String, default: 'razorpay' },
    razorpayOrderId: { type: String, unique: true, sparse: true },
    razorpayPaymentId: { type: String, unique: true, sparse: true },
    razorpaySignature: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Payment', paymentSchema)
