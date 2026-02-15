/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Heart, MessageSquare, Share2 } from 'lucide-react';

export default function RentalHistory() {
  const [rentals] = useState([
    {
      id: 1,
      title: 'Modern 2-Bedroom Apartment',
      location: 'Shibuya, Tokyo',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      rating: 5,
      landlord: 'Tanaka Yamamoto',
      status: 'completed',
      image: 'https://via.placeholder.com/300x200?text=Apt+1'
    },
    {
      id: 2,
      title: 'Cozy Studio in Shinjuku',
      location: 'Shinjuku, Tokyo',
      startDate: '2023-06-15',
      endDate: '2023-12-31',
      rating: 4,
      landlord: 'Suzuki Tanaka',
      status: 'completed',
      image: 'https://via.placeholder.com/300x200?text=Apt+2'
    },
    {
      id: 3,
      title: 'Spacious 3-Bedroom House',
      location: 'Minato, Tokyo',
      startDate: '2024-07-01',
      endDate: 'ongoing',
      rating: null,
      landlord: 'Kenji Yamamoto',
      status: 'active',
      image: 'https://via.placeholder.com/300x200?text=House+1'
    }
  ]);

  const [selectedRental, setSelectedRental] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">My Rental History</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-blue-600">{rentals.length}</div>
            <div className="text-gray-600">Total Rentals</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-green-600">
              {rentals.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-purple-600">
              {rentals.filter(r => r.status === 'active').length}
            </div>
            <div className="text-gray-600">Active</div>
          </div>
        </div>

        {/* Rentals List */}
        <div className="space-y-6">
          {rentals.map((rental) => (
            <div key={rental.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <img
                    src={rental.image}
                    alt={rental.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:col-span-3 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">{rental.title}</h3>
                      <p className="text-gray-600">{rental.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      rental.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rental.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Landlord</p>
                      <p className="font-semibold">{rental.landlord}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Period</p>
                      <p className="font-semibold">{rental.startDate} to {rental.endDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {rental.status === 'completed' ? (
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="font-semibold">{rental.rating}</span>
                        <span className="text-gray-600 text-sm">/ 5</span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    
                    <div className="flex space-x-2">
                      {rental.status === 'completed' && (
                        <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                          <MessageSquare size={16} />
                          <span>Leave Review</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Share2 size={16} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
