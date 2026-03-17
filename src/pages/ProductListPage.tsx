import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')
  const searchFromUrl = searchParams.get('search') ?? ''
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState(searchFromUrl)
  const [loading, setLoading] = useState(false)

  const fetchProducts = (q?: string, cat?: string | null) => {
    setLoading(true)
    const params: any = {}
    if (q) params.search = q
    if (cat) params.category = cat
    api.get('/api/products', { params }).then(res => {
      setProducts(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => {
    setSearch(searchFromUrl)
    fetchProducts(searchFromUrl || undefined, category)
  }, [category, searchFromUrl])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    next.set('search', search)
    setSearchParams(next)
    fetchProducts(search, category)
  }

  const activeSearch = searchParams.get('search') ?? search

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{category ? `${category}` : 'All Products'}</h1>
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Search</button>
        {search && <button type="button" onClick={() => { setSearch(''); const next = new URLSearchParams(); if (category) next.set('category', category); setSearchParams(next); fetchProducts(undefined, category) }}
          className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">Clear</button>}
      </form>
      {activeSearch && (
        <p className="mb-4 text-gray-600" dangerouslySetInnerHTML={{ __html: `Results for: ${activeSearch}` }} />
      )}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
