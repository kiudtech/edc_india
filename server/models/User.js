import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    startupName: { type: String, default: '', trim: true },
    startupStage: {
      type: String,
      required: true,
      enum: ['Idea Stage', 'MVP/Prototype', 'Early Traction', 'Growth', 'Scaling'],
    },
    industry: {
      type: String,
      required: true,
      enum: [
        'Technology',
        'Healthcare/HealthTech',
        'Education/EdTech',
        'Finance/FinTech',
        'Agriculture/AgriTech',
        'E-Commerce',
        'Manufacturing',
        'Clean Energy/CleanTech',
        'Food & Beverage',
        'Real Estate/PropTech',
        'Media & Entertainment',
        'Logistics/Supply Chain',
        'Other',
      ],
    },
    ideaSummary: { type: String, default: '', maxlength: 200 },
    founderId: { type: String, unique: true },
    membershipStatus: {
      type: String,
      enum: ['pending', 'active', 'inactive'],
      default: 'pending',
    },
    membershipType: {
      type: String,
      enum: ['startup', 'validation'],
      default: 'startup',
    },
    termsAccepted: { type: Boolean, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

export default mongoose.model('User', userSchema)
