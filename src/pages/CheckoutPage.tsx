import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/api/orders', { shipping_address: address, notes })
      navigate(`/orders/${res.data.id}`)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Checkout failed')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
          <textarea value={address} onChange={e => setAddress(e.target.value)} required rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="123 Main St, City, State ZIP" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (optional)</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Leave at door, gift wrap, etc." />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Payment will be processed via our secure payment gateway.</p>
          <p className="text-xs text-gray-400 mt-1">This is a simulated checkout — no real charges will occur.</p>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}
