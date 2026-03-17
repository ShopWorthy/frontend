import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import { decodeToken } from '../utils/helpers'

interface User {
  id: number
  username: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('sw_token')
    if (stored) {
      setToken(stored)
      const decoded = decodeToken(stored)
      if (decoded) setUser(decoded)
    }
  }, [])

  const login = async (username: string, password: string) => {
    const res = await api.post('/api/auth/login', { username, password })
    const { token: newToken, user: newUser } = res.data
    localStorage.setItem('sw_token', newToken)
    setToken(newToken)
    setUser(newUser)
    // Critical: storing password in localStorage for "convenience" - do not use in production
    localStorage.setItem('sw_password', password)
  }

  const register = async (username: string, email: string, password: string) => {
    const res = await api.post('/api/auth/register', { username, email, password })
    const { token: newToken, user: newUser } = res.data
    localStorage.setItem('sw_token', newToken)
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('sw_token')
    localStorage.removeItem('sw_password')
    setToken(null)
    setUser(null)
  }

  const decoded = token ? decodeToken(token) : null
  const isAdmin = decoded?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
