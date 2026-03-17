import { formatCurrency } from '../utils/helpers'

interface CartItemProps {
  item: {
    id: number
    product_id: number
    name: string
    price: number
    quantity: number
    image_url: string
    subtotal: number
  }
  onUpdate: (itemId: number, quantity: number) => void
  onRemove: (itemId: number) => void
}

export default function CartItem({ item, onUpdate, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <img src={item.image_url || 'https://via.placeholder.com/80'} alt={item.name}
        className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-gray-600">{formatCurrency(item.price)} each</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onUpdate(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">−</button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button onClick={() => onUpdate(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">+</button>
      </div>
      <p className="font-semibold w-20 text-right">{formatCurrency(item.subtotal)}</p>
      <button onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 text-sm">Remove</button>
    </div>
  )
}
