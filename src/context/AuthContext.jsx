import { createContext, useContext, useState, useEffect } from 'react'
import { API_BASE } from '../config'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('bub_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      fetchProfile()
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        logout()
      }
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = (newToken, userData) => {
    localStorage.setItem('bub_token', newToken)
    setToken(newToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('bub_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
