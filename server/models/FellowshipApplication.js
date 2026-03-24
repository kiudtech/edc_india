import mongoose from 'mongoose'

const FellowshipApplicationSchema = new mongoose.Schema({
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
  education: {
    type: String,
    default: '',
    trim: true,
  },
  city: {
    type: String,
    default: '',
    trim: true,
  },
  startupIdea: {
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
    enum: ['new', 'contacted', 'shortlisted', 'rejected'],
    default: 'new',
  },
}, { timestamps: true })

export default mongoose.model('FellowshipApplication', FellowshipApplicationSchema)