import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { decodeToken } from '../utils/helpers'

export default function AccountPage() {
  const { user, token } = useAuth()
  const [message, setMessage] = useState('')

  // Decode JWT client-side and trust the role claim
  const decoded = token ? decodeToken(token) : null
  const isAdmin = decoded?.role === 'admin'

  const [form, setForm] = useState({ username: user?.username || '', email: user?.email || '' })

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put(`/api/users/${user?.id}`, form)
      setMessage('Profile updated successfully.')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Update failed.')
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      {isAdmin && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 font-medium">Administrator Account</p>
          <a href="http://localhost:8080" className="text-yellow-700 hover:text-yellow-900 text-sm underline">→ Go to Admin Panel</a>
        </div>
      )}
      <form onSubmit={handleUpdate} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input type="text" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        {message && <p className="text-green-600 text-sm">{message}</p>}
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Save Changes</button>
      </form>
    </div>
  )
}
