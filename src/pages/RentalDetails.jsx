import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, IndianRupee, Bed } from "lucide-react";

// Sample data (in real app, fetch from API)
const rentalsData = [
  {
    id: 1,
    name: "Riya Sharma",
    role: "gf",
    location: "Mumbai, Maharashtra",
    hourly_rate: "₹1200",
    service_tags: ["chat", "dinner", "movie companion"],
    age: 24,
    rating: 4.8,
    reviews: 15,
    photos: [
      "https://i.pravatar.cc/150?img=12",
      "https://i.pravatar.cc/150?img=14",
      "https://i.pravatar.cc/150?img=15",
    ],
    bio: "Friendly, outgoing, and loves to make new friends. Enjoys movies, coffee, and long walks.",
    verification_summary: {
      id_verified: true,
      bio_verified: true,
      photo_verified: true,
    },
  },
  {
    id: 2,
    name: "Arjun Singh",
    role: "bf",
    location: "Delhi, Delhi",
    hourly_rate: "₹1500",
    service_tags: ["walks", "dinner", "shopping"],
    age: 26,
    rating: 4.6,
    reviews: 18,
    photos: [
      "https://i.pravatar.cc/150?img=45",
      "https://i.pravatar.cc/150?img=46",
    ],
    bio: "Charming, caring, and loves outdoor activities. Perfect companion for events and outings.",
    verification_summary: {
      id_verified: true,
      bio_verified: false,
      photo_verified: true,
    },
  },
];

export default function RentalDetail() {
  const { id } = useParams();

  // Combined state to avoid multiple setState calls
  const [rentalState, setRentalState] = useState({
    rental: null,
    selectedPhoto: null,
  });

  useEffect(() => async () => {
    const data = rentalsData.find((r) => r.id === parseInt(id));
    if (data) {
      setRentalState({
        rental: data,
        selectedPhoto: data.photos[0] || null,
      });
    }
  }, [id]);

  const { rental, selectedPhoto } = rentalState;

  if (!rental) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading rental details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/rentals"
          className="inline-block mb-6 text-blue-600 hover:text-blue-700 font-medium"
        >
          &larr; Back to Rentals
        </Link>

        {/* Photos Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            {selectedPhoto && (
              <img
                src={selectedPhoto}
                alt={rental.name}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            )}

            {/* Thumbnail selection */}
            <div className="flex mt-4 space-x-4 overflow-x-auto">
              {rental.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${rental.name}-${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedPhoto === photo
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                  onClick={() =>
                    setRentalState((prev) => ({
                      ...prev,
                      selectedPhoto: photo,
                    }))
                  }
                />
              ))}
            </div>
          </div>

          {/* Rental Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{rental.name}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={18} className="mr-1" />
              <span>{rental.location}</span>
            </div>

            <div className="flex items-center text-gray-700 mb-4 space-x-6">
              <div className="flex items-center space-x-1">
                <IndianRupee size={16} className="text-green-600" />
                <span className="font-semibold">{rental.hourly_rate}/hr</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bed size={16} className="text-gray-600" />
                <span>{rental.age} yrs old</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{rental.bio || "No bio available."}</p>

            {/* Services Offered */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Services Offered by You:</h3>
              <div className="flex flex-wrap gap-2">
                {rental.service_tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-yellow-400">★</span>
              <span className="font-semibold">{rental.rating}</span>
              <span className="text-gray-600">({rental.reviews} reviews)</span>
            </div>

            {/* Action Button */}
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Rent {rental.role.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">About {rental.name}</h2>
          <p>
            This {rental.role.toUpperCase()} is available for companionship, events,
            or casual activities as listed above. Age: {rental.age} years.
          </p>
          <p className="mt-2">
            Location: {rental.location}. Hourly Rate: {rental.hourly_rate}.
          </p>
        </div>
      </div>
    </div>
  );
}
