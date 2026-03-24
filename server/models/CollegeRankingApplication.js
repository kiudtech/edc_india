import mongoose from 'mongoose'

const CollegeRankingApplicationSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  rank: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('CollegeRankingApplication', CollegeRankingApplicationSchema)