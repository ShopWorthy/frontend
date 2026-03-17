export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} ShopWorthy. All rights reserved.</p>
        <p className="text-xs mt-1">Built for security training and demonstration purposes.</p>
      </div>
    </footer>
  )
}
