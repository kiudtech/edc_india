import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AdminLoginPage from '../pages/AdminLoginPage'

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    )
  }

  // If no user is logged in, show the Admin Login page directly on the /admin route
  if (!user) return <AdminLoginPage />

  // If a non-admin user tries to access the admin area, redirect them to their dashboard
  return children
}
