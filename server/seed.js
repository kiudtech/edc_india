import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import User from './models/User.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    const existing = await User.findOne({ role: 'admin' })
    if (existing) {
      console.log('Admin already exists:', existing.email)
      process.exit(0)
    }

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@edcindia.org',
      phone: '9000000000',
      password: 'admin123',
      startupName: 'EDC India',
      startupStage: 'Scaling',
      industry: 'Education/EdTech',
      founderId: 'BUB-ADMIN',
      membershipStatus: 'active',
      membershipType: 'startup',
      termsAccepted: true,
      role: 'admin',
    })

    console.log('Admin user seeded successfully')
    console.log('  Email   : admin@edcindia.org')
    console.log('  Password: admin123')
    console.log('  Founder : ' + admin.founderId)
    process.exit(0)
  } catch (err) {
    console.error('Seed error:', err.message)
    process.exit(1)
  }
}

seedAdmin()
