import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['announcement', 'event-alert', 'funding-update', 'general'],
      default: 'general',
    },
    targetAudience: {
      type: String,
      enum: ['all', 'selected'],
      default: 'all',
    },
    targetUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default mongoose.model('Notification', notificationSchema)
