import { useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';

export default function WhoRentedMe() {
  const [rentalRecords] = useState([
    {
      id: 1,
      tenantName: 'Sarah Johnson',
      tenantImage: 'https://i.pravatar.cc/300',
      propertyName: 'Modern 2-Bedroom Apartment',
      location: 'Shibuya, Tokyo',
      rentalPeriod: 'Jan 2024 - Jun 2024',
      rating: 5,
      review: 'Excellent tenant! Always pays on time, keeps the place clean, and communicates well.',
      status: 'completed'
    },
    {
      id: 2,
      tenantName: 'Mike Chen',
      tenantImage: 'https://i.pravatar.cc/300',
      propertyName: 'Cozy Studio in Shinjuku',
      location: 'Shinjuku, Tokyo',
      rentalPeriod: 'Jun 2023 - Dec 2023',
      rating: 4,
      review: 'Responsible tenant, professional work schedule, minimal issues.',
      status: 'completed'
    },
    {
      id: 3,
      tenantName: 'Emma Williams',
      tenantImage: 'https://i.pravatar.cc/300',
      propertyName: 'Spacious 3-Bedroom House',
      location: 'Minato, Tokyo',
      rentalPeriod: 'Jul 2024 - Ongoing',
      rating: null,
      review: 'Active rental - no review yet',
      status: 'active'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">Who Rented From Me</h1>
        <p className="text-gray-600 mb-8">
          View all the tenants who have rented your properties and manage their records.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-blue-600">
              {rentalRecords.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed Rentals</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-green-600">
              {rentalRecords.filter(r => r.status === 'active').length}
            </div>
            <div className="text-gray-600">Active Rentals</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-yellow-600">
              {rentalRecords.filter(r => r.rating).length}
            </div>
            <div className="text-gray-600">Reviews Given</div>
          </div>
        </div>

        {/* Rental Records */}
        <div className="space-y-6">
          {rentalRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <img
                    src={record.tenantImage}
                    alt={record.tenantName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{record.tenantName}</h3>
                    <p className="text-gray-600 mb-2">{record.propertyName}</p>
                    <p className="text-gray-600 text-sm">{record.location}</p>
                    <p className="text-gray-600 text-sm">{record.rentalPeriod}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  record.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {record.status === 'active' ? 'Active' : 'Completed'}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    {record.rating && (
                      <div className="flex items-center space-x-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < record.rating ? 'text-yellow-400' : 'text-gray-300'}
                          >
                            ★
                          </span>
                        ))}
                        <span className="font-semibold ml-2">{record.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-700">{record.review}</p>
              </div>

              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700">
                  <Heart size={18} />
                  <span>Mark as Trusted</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700">
                  <Trash2 size={18} />
                  <span>Remove Record</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
