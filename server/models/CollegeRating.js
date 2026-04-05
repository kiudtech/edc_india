import mongoose from 'mongoose'

const collegeRatingSchema = new mongoose.Schema(
  {
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
