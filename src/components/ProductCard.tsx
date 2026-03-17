import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/helpers'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock_count: number
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image_url || '/images/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <span className="text-xs text-indigo-600 font-medium uppercase tracking-wider">{product.category}</span>
          <h3 className="mt-1 font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">{product.name}</h3>
          <p className="mt-1 text-lg font-bold text-gray-900">{formatCurrency(product.price)}</p>
          <p className="text-xs text-gray-500 mt-1">{product.stock_count} in stock</p>
        </div>
      </div>
    </Link>
  )
}
