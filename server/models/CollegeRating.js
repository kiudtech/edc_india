import mongoose from 'mongoose'

const collegeRatingSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    studentEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    criteriaRatings: {
      innovationEnvironment: { type: Number, required: true, min: 1, max: 5 },
      placementOpportunities: { type: Number, required: true, min: 1, max: 5 },
      practicalLearning: { type: Number, required: true, min: 1, max: 5 },
      startupSupport: { type: Number, required: true, min: 1, max: 5 },
      facultyQuality: { type: Number, required: true, min: 1, max: 5 },
      infrastructure: { type: Number, required: true, min: 1, max: 5 },
      industryExposure: { type: Number, required: true, min: 1, max: 5 },
      skillDevelopment: { type: Number, required: true, min: 1, max: 5 },
      campusCulture: { type: Number, required: true, min: 1, max: 5 },
      overallExperience: { type: Number, required: true, min: 1, max: 5 },
    },
    feedback: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1500,
    },
  },
  { timestamps: true }
)

collegeRatingSchema.index({ collegeName: 1 })
collegeRatingSchema.index({ createdAt: -1 })

export default mongoose.model('CollegeRating', collegeRatingSchema)
