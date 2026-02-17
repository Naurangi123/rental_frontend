import { useState } from 'react';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Renters() {
  const [friends] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Shibuya, Tokyo',
      avatar: 'https://i.pravatar.cc/300',
      rating: 4.9,
      reviews: 45,
      verified: true,
      bio: 'Responsible tenant, always on time with payments',
      joinDate: 'Jan 2022'
    },
    {
      id: 2,
      name: 'Mike Chen',
      location: 'Shinjuku, Tokyo',
      avatar: 'https://i.pravatar.cc/300',
      rating: 4.7,
      reviews: 32,
      verified: true,
      bio: 'Clean living, professional work schedule',
      joinDate: 'Mar 2022'
    },
    {
      id: 3,
      name: 'Emma Williams',
      location: 'Minato, Tokyo',
      avatar: 'https://i.pravatar.cc/300',
      rating: 4.8,
      reviews: 28,
      verified: true,
      bio: 'Quiet, respectful tenant',
      joinDate: 'May 2022'
    },
    {
      id: 4,
      name: 'James Martinez',
      location: 'Harajuku, Tokyo',
      avatar: 'https://i.pravatar.cc/300',
      rating: 4.6,
      reviews: 19,
      verified: true,
      bio: 'Professional, reliable user',
      joinDate: 'Aug 2022'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      location: 'Chiyoda, Tokyo',
      avatar: 'https://i.pravatar.cc/300',
      rating: 5.0,
      reviews: 15,
      verified: true,
      bio: 'Perfect tenant, takes excellent care of property',
      joinDate: 'Oct 2022'
    },
    {
      id: 6,
      name: 'David Kim',
      location: 'Taito, Tokyo',
      avatar: 'https://i.pravatar.cc/300',
      rating: 4.5,
      reviews: 22,
      verified: true,
      bio: 'Friendly and cooperative tenant',
      joinDate: 'Dec 2022'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Meet Your Friends</h1>
          <p className="text-gray-600 text-lg">
            Connect with verified and trusted user in our community.
          </p>
        </div>

        {/* friends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {friends.map((renter) => (
            <Link
              key={renter.id}
              to={`/renter/${renter.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
              <div className="relative px-6 pb-6 -mt-16">
                <img
                  src={renter.avatar}
                  alt={renter.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                />
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                      <span>{renter.name}</span>
                      {renter.verified && <CheckCircle size={20} className="text-green-500" />}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span>{renter.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{renter.bio}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{renter.rating}</span>
                    <span className="text-gray-600 text-sm">({renter.reviews})</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    View Profile
                  </button>
                  <button className="flex-1 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    Message
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
