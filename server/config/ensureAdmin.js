import User from '../models/User.js'

export const ensureAdminUser = async () => {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@edcindia.org').trim().toLowerCase()
  const adminPassword = (process.env.ADMIN_PASSWORD || 'admin123').trim()

  if (!adminEmail || !adminPassword) return

  const existingAdmin = await User.findOne({ role: 'admin' })
  if (existingAdmin) {
    // Keep password in sync with configured admin credentials.
    existingAdmin.email = adminEmail
    existingAdmin.password = adminPassword
    await existingAdmin.save()
    console.log('Admin bootstrap: existing admin updated')
    return
  }

  await User.create({
    name: 'Admin',
    email: adminEmail,
    phone: process.env.ADMIN_PHONE || '9000000000',
    password: adminPassword,
    startupName: 'EDC India',
    startupStage: 'Scaling',
    industry: 'Education/EdTech',
    founderId: 'BUB-ADMIN',
    membershipStatus: 'active',
    membershipType: 'startup',
    termsAccepted: true,
    role: 'admin',
  })

  console.log('Admin bootstrap: admin created')
}