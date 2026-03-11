import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    eventType: {
      type: String,
      enum: ['Workshop', 'Startup Meet', 'Pitch Event', 'Hackathon', 'Webinar', 'Other'],
      default: 'Other',
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Registration Open', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Upcoming',
    },
    image: { type: String, default: '' },
    registrationLimit: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Event', eventSchema)
