import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import CartItem from '../components/CartItem'
import { formatCurrency } from '../utils/helpers'

export default function CartPage() {
  const navigate = useNavigate()
  const [cart, setCart] = useState<{ items: any[]; total: number }>({ items: [], total: 0 })

  const fetchCart = () => api.get('/api/cart').then(res => setCart(res.data)).catch(() => {})

  useEffect(() => { fetchCart() }, [])

  const updateItem = (itemId: number, quantity: number) => {
    api.put(`/api/cart/${itemId}`, { quantity }).then(fetchCart)
  }
  const removeItem = (itemId: number) => {
    api.delete(`/api/cart/${itemId}`).then(fetchCart)
  }

  if (cart.items.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
      <Link to="/products" className="text-indigo-600 hover:text-indigo-800">Start Shopping →</Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        {cart.items.map(item => (
          <CartItem key={item.id} item={item} onUpdate={updateItem} onRemove={removeItem} />
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
        <div>
          <p className="text-gray-600">Total</p>
          <p className="text-2xl font-bold">{formatCurrency(cart.total)}</p>
        </div>
        <button onClick={() => navigate('/checkout')}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}
