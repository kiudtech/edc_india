import mongoose from 'mongoose'

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    badge: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true },
    price: { type: Number, required: true, min: 0 },
    billingText: { type: String, default: '/ one-time', trim: true },
    ctaText: { type: String, required: true, trim: true },
    ctaRoute: { type: String, required: true, trim: true },
    features: { type: [String], default: [] },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Plan', planSchema)
