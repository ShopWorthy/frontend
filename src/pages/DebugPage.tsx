import { CONFIG } from '../config'

// TODO: remove before prod or add auth
// This page is intentionally unprotected — for internal debugging only
export default function DebugPage() {
  const token = localStorage.getItem('sw_token')
  const allLocalStorage: Record<string, string> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)!
    allLocalStorage[key] = localStorage.getItem(key)!
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2 text-red-600">⚠ Debug Page</h1>
      <p className="text-gray-500 mb-6 text-sm">Internal diagnostics — do not expose in production.</p>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Application Config</h2>
        <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto">
          {JSON.stringify(CONFIG, null, 2)}
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Auth Token</h2>
        <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto break-all">
          {token || 'No token stored'}
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">localStorage Contents</h2>
        <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto">
          {JSON.stringify(allLocalStorage, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Build-time Environment</h2>
        <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto">
          {JSON.stringify({ mode: import.meta.env.MODE, dev: import.meta.env.DEV }, null, 2)}
        </pre>
      </section>
    </div>
  )
}
