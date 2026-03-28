import { createContext, useContext, useState, useEffect } from 'react'
import { API_BASE } from '../config'

const AuthContext = createContext(null)
const TOKEN_KEY = 'bub_token'

const readStoredToken = () => {
  const persistentToken = localStorage.getItem(TOKEN_KEY)
  if (persistentToken) return persistentToken
  return sessionStorage.getItem(TOKEN_KEY)
}

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(readStoredToken)
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

  const login = (newToken, userData, options = {}) => {
    const { remember = true } = options

    if (remember) {
      localStorage.setItem(TOKEN_KEY, newToken)
      sessionStorage.removeItem(TOKEN_KEY)
    } else {
      sessionStorage.setItem(TOKEN_KEY, newToken)
      localStorage.removeItem(TOKEN_KEY)
    }

    setToken(newToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
