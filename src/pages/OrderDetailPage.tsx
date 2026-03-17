import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers'

export default function OrderDetailPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    api.get(`/api/orders/${id}`).then(res => setOrder(res.data)).catch(() => {})
  }, [id])

  if (!order) return <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Order #{order.id}</h1>
      <div className="flex gap-4 mb-6">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>{order.status}</span>
        <span className="text-gray-500 text-sm">{formatDate(order.created_at)}</span>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold mb-4">Items</h2>
        {order.items?.map((item: any) => (
          <div key={item.id} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
            <span>{item.name} × {item.quantity}</span>
            <span className="font-medium">{formatCurrency(item.unit_price * item.quantity)}</span>
          </div>
        ))}
        <div className="flex justify-between pt-4 font-bold text-lg">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold mb-2">Shipping Address</h2>
        <p className="text-gray-600">{order.shipping_address || '—'}</p>
        {/* Stored XSS: order notes rendered as HTML without sanitization - do not use in production */}
        {order.notes && <><h2 className="font-semibold mt-4 mb-2">Notes</h2><div className="text-gray-600" dangerouslySetInnerHTML={{ __html: order.notes }} /></>}
      </div>
    </div>
  )
}
