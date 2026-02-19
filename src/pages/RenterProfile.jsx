import { useState } from 'react';
import { MapPin, Phone, Mail, Star, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RenterProfile() {
  const [renter] = useState({
    id: 1,
    name: 'Sarah Johnson',
    location: 'Shibuya, Tokyo',
    avatar: 'https://i.pravatar.cc/300',
    rating: 4.9,
    reviews: 45,
    verified: true,
    joinDate: 'January 2022',
    bio: 'I am a responsible and reliable tenant with a strong track record of punctual payments and maintaining properties in excellent condition.',
    email: 'sarah@example.com',
    phone: '+81-90-1111-2222',
    languages: ['English', 'Japanese'],
    profession: 'Software Engineer',
    aboutMe: 'Quiet professional looking for a peaceful apartment in central Tokyo.',
  });

  const [reviews] = useState([
    {
      id: 1,
      author: 'Property Owner A',
      rating: 5,
      date: '2024-01-10',
      comment: 'Excellent tenant! Always pays on time, keeps the place clean, and communicates well.'
    },
    {
      id: 2,
      author: 'Property Owner B',
      rating: 5,
      date: '2023-12-20',
      comment: 'Very responsible and respectful. Highly recommended!'
    },
    {
      id: 3,
      author: 'Property Owner C',
      rating: 4,
      date: '2023-11-15',
      comment: 'Good tenant overall. Professional and reliable.'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start space-x-6">
            <img
              src={renter.avatar}
              alt={renter.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{renter.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(renter.rating) ? 'fill-yellow-400' : ''}
                    />
                  ))}
                </div>
                <span className="font-bold text-lg">{renter.rating}</span>
                <span className="text-gray-600">({renter.reviews} reviews)</span>
              </div>
              <div className="flex items-center text-gray-600 space-x-4">
                <div className="flex items-center space-x-1">
                  <MapPin size={18} />
                  <span>{renter.location}</span>
                </div>
                <span>•</span>
                <span>Member since {renter.joinDate}</span>
              </div>
            </div>
            <Link
              // key={renter.id}
              // to={`${renter.id}/message/`}
              to="/messages/"
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MessageCircle size={20} />
                <span>Message</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">About</h2>
          <p className="text-gray-700 mb-8">{renter.bio}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Professional Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-sm">Profession</p>
                  <p className="font-medium">{renter.profession}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Languages</p>
                  <p className="font-medium">{renter.languages.join(', ')}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Mail size={18} className="text-blue-600" />
                  <span>{renter.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Phone size={18} className="text-blue-600" />
                  <span>{renter.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{review.author}</h3>
                  <span className="text-gray-600 text-sm">{review.date}</span>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
