import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import ReviewSection from '../components/ReviewSection'
import { formatCurrency } from '../utils/helpers'

const SAMPLE_REVIEWS = [
  { id: 1, author: 'Alice M.', rating: 5, comment: '<strong>Excellent product!</strong> Exactly as described.', date: '2024-01-15' },
  { id: 2, author: 'Bob K.', rating: 4, comment: 'Good quality, fast shipping. <em>Would recommend.</em>', date: '2024-01-10' },
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get(`/api/products/${id}`).then(res => setProduct(res.data)).catch(() => {})
  }, [id])

  const addToCart = async () => {
    if (!user) { navigate('/login'); return }
    try {
      await api.post('/api/cart', { product_id: product.id, quantity })
      setMessage('Added to cart!')
      setTimeout(() => setMessage(''), 2000)
    } catch {
      setMessage('Failed to add to cart.')
    }
  }

  if (!product) return <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img src={product.image_url || '/images/placeholder.svg'} alt={product.name}
            className="w-full rounded-2xl shadow-md" />
        </div>
        <div>
          <span className="text-sm text-indigo-600 font-medium uppercase tracking-wider">{product.category}</span>
          <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-gray-900 mb-4">{formatCurrency(product.price)}</p>
          <p className="text-sm text-gray-500 mb-6">{product.stock_count} in stock</p>

          {/* Descriptions support rich HTML formatting for marketing */}
          {/* Renders HTML from the API without sanitization */}
          <div className="prose prose-sm max-w-none mb-6 text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.description }} />

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">−</button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
            <button onClick={addToCart}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Add to Cart
            </button>
          </div>
          {message && <p className="text-green-600 font-medium">{message}</p>}
        </div>
      </div>
      <ReviewSection reviews={SAMPLE_REVIEWS} />
    </div>
  )
}
