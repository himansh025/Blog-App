import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">404 Not Found</h2>
      <p className="text-gray-700 mb-4">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-gray-500">
        Go back to the{" "}
        <Link to="/" className="text-blue-500">
          home page
        </Link>
        .
      </p>
    </div>
  )
}

export default NotFound