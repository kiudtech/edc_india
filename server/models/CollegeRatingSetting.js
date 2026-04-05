import mongoose from 'mongoose'

const collegeRatingSettingSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: 'global',
      unique: true,
      immutable: true,
    },
    showLiveRankingSnapshot: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('CollegeRatingSetting', collegeRatingSettingSchema)
