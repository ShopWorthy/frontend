import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])
  const [searchParams] = useSearchParams()
  const msg = searchParams.get('msg') ?? searchParams.get('message') ?? ''

  useEffect(() => {
    api.get('/api/products').then(res => setProducts(res.data.slice(0, 4))).catch(() => {})
  }, [])

  return (
    <div>
      {/* DOM XSS: URL param rendered as HTML - e.g. ?msg=<script> or ?message= - do not use in production */}
      {msg && (
        <div className="max-w-7xl mx-auto px-4 py-2 bg-amber-100 border-b border-amber-300" dangerouslySetInnerHTML={{ __html: msg }} />
      )}
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to ShopWorthy</h1>
          <p className="text-xl text-indigo-200 mb-8">Discover amazing products at unbeatable prices.</p>
          <Link to="/products"
            className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-800 font-medium">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Electronics', 'Footwear', 'Food', 'Sports'].map(cat => (
              <Link key={cat} to={`/products?category=${cat}`}
                className="bg-white rounded-xl p-6 text-center font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors shadow-sm">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
