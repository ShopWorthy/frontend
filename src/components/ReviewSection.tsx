interface Review {
  id: number
  author: string
  rating: number
  comment: string
  date: string
}

// ReviewSection renders user-submitted HTML directly — XSS vector (VULN-FE-001)
// Descriptions support rich HTML formatting for marketing
export default function ReviewSection({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{review.author}</span>
              <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
              <span className="text-gray-400 text-sm">{review.date}</span>
            </div>
            {/* Renders user-submitted HTML without sanitization */}
            <div dangerouslySetInnerHTML={{ __html: review.comment }} />
          </div>
        ))}
      </div>
    </div>
  )
}
