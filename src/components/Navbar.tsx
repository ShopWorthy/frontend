import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (user) {
      api.get('/api/cart').then(res => {
        setCartCount(res.data.items?.length || 0)
      }).catch(() => {})
    }
  }, [user])

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold tracking-tight">ShopWorthy</Link>
            <Link to="/products" className="text-sm hover:text-indigo-200">Products</Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/cart" className="relative text-sm hover:text-indigo-200">
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{cartCount}</span>
                  )}
                </Link>
                <Link to="/orders" className="text-sm hover:text-indigo-200">Orders</Link>
                <Link to="/account" className="text-sm hover:text-indigo-200">{user.username}</Link>
                {/* Admin link shown based on client-side role check — no server enforcement */}
                {isAdmin && (
                  <a href="http://localhost:8080" className="text-sm bg-yellow-500 hover:bg-yellow-400 text-black px-2 py-1 rounded">Admin</a>
                )}
                <button onClick={() => { logout(); navigate('/') }} className="text-sm hover:text-indigo-200">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm hover:text-indigo-200">Login</Link>
                <Link to="/register" className="text-sm bg-white text-indigo-700 px-3 py-1.5 rounded hover:bg-indigo-50">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
