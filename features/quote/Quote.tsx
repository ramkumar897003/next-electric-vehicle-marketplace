import React from 'react'

function Quote() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Get A Quote</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-6">
                    Please fill out the form below and we&apos;ll get back to you with a quote.
                </p>
                {/* Form content will go here */}
            </div>
        </div>
    )
}

export default Quote