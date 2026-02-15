// import { useState } from "react";
// import { Search, Filter, MapPin, DollarSign, Bed } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Rentals() {
//   const [rentals] = useState([
//     {
//       id: 1,
//       name: "Riya Sharma",
//       role: "gf",
//       location: "Mumbai, Maharashtra",
//       hourly_rate: "₹1200",
//       service_tags: ["chat", "dinner", "movie companion"],
//       age: 24,
//       rating: 4.8,
//       reviews: 15,
//       photos: ["https://i.pravatar.cc/150?img=12"],
//     },
//     {
//       id: 2,
//       name: "Arjun Singh",
//       role: "bf",
//       location: "Delhi, Delhi",
//       hourly_rate: "₹1500",
//       service_tags: ["walks", "dinner", "shopping"],
//       age: 26,
//       rating: 4.6,
//       reviews: 18,
//       photos: ["https://i.pravatar.cc/150?img=45"],
//     },
//     {
//       id: 3,
//       name: "Pooja Verma",
//       role: "gf",
//       location: "Bangalore, Karnataka",
//       hourly_rate: "₹1000",
//       service_tags: ["chat", "coffee", "movie companion"],
//       age: 22,
//       rating: 4.9,
//       reviews: 21,
//       photos: ["https://i.pravatar.cc/150?img=33"],
//     },
//     {
//       id: 4,
//       name: "Rahul Mehta",
//       role: "bf",
//       location: "Chennai, Tamil Nadu",
//       hourly_rate: "₹1300",
//       service_tags: ["walks", "dinner", "concert"],
//       age: 28,
//       rating: 4.7,
//       reviews: 12,
//       photos: ["https://i.pravatar.cc/150?img=7"],
//     },
//     {
//       id: 5,
//       name: "Anjali Kapoor",
//       role: "gf",
//       location: "Kolkata, West Bengal",
//       hourly_rate: "₹1100",
//       service_tags: ["chat", "shopping", "coffee"],
//       age: 25,
//       rating: 5.0,
//       reviews: 10,
//       photos: ["https://i.pravatar.cc/150?img=51"],
//     },
//     {
//       id: 6,
//       name: "Vikram Rao",
//       role: "bf",
//       location: "Pune, Maharashtra",
//       hourly_rate: "₹1400",
//       service_tags: ["movie companion", "dinner", "walks"],
//       age: 27,
//       rating: 4.5,
//       reviews: 14,
//       photos: ["https://i.pravatar.cc/150?img=88"],
//     },
//   ]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Search Section */}
//         <div className="bg-white rounded-lg shadow-md p-8 mb-12">
//           <h1 className="text-3xl font-bold mb-6">Browse Rentals</h1>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
//               <Search size={20} className="text-gray-600" />
//               <input
//                 type="text"
//                 placeholder="Search location..."
//                 className="bg-transparent w-full focus:outline-none"
//               />
//             </div>
//             <select className="bg-gray-100 rounded-lg px-4 py-2 focus:outline-none">
//               <option>All Price Ranges</option>
//               <option>Under ¥100,000</option>
//               <option>¥100,000 - ¥200,000</option>
//               <option>¥200,000+</option>
//             </select>
//             <select className="bg-gray-100 rounded-lg px-4 py-2 focus:outline-none">
//               <option>Any Bedrooms</option>
//               <option>Studio</option>
//               <option>1 Bedroom</option>
//               <option>2+ Bedrooms</option>
//             </select>
//             <button className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
//               <Filter size={20} />
//               <span>Search</span>
//             </button>
//           </div>
//         </div>

//         {/* Rentals Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {rentals.map((rental) => (
//             <Link
//               key={rental.id}
//               to={`/rental/${rental.id}`}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <img
//                 src={rental.image}
//                 alt={rental.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-2">{rental.title}</h3>
//                 <div className="flex items-center text-gray-600 mb-4">
//                   <MapPin size={16} className="mr-1" />
//                   <span>{rental.location}</span>
//                 </div>
//                 <div className="flex justify-between items-center mb-4">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-1">
//                       <Bed size={16} className="text-gray-600" />
//                       <span className="text-gray-600">{rental.bedrooms}</span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <DollarSign size={16} className="text-blue-600" />
//                       <span className="text-blue-600 font-semibold">
//                         {rental.price}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-1">
//                     <span className="text-yellow-400">★</span>
//                     <span className="font-semibold">{rental.rating}</span>
//                     <span className="text-gray-600 text-sm">
//                       ({rental.reviews})
//                     </span>
//                   </div>
//                   <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Search, Filter, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Rentals() {
  const [rentals] = useState([
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
      photos: ["https://i.pravatar.cc/150?img=12"],
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
      photos: ["https://i.pravatar.cc/150?img=45"],
    },
    {
      id: 3,
      name: "Pooja Verma",
      role: "gf",
      location: "Bangalore, Karnataka",
      hourly_rate: "₹1000",
      service_tags: ["chat", "coffee", "movie companion"],
      age: 22,
      rating: 4.9,
      reviews: 21,
      photos: ["https://i.pravatar.cc/150?img=33"],
    },
    {
      id: 4,
      name: "Rahul Mehta",
      role: "bf",
      location: "Chennai, Tamil Nadu",
      hourly_rate: "₹1300",
      service_tags: ["walks", "dinner", "concert"],
      age: 28,
      rating: 4.7,
      reviews: 12,
      photos: ["https://i.pravatar.cc/150?img=7"],
    },
    {
      id: 5,
      name: "Anjali Kapoor",
      role: "gf",
      location: "Kolkata, West Bengal",
      hourly_rate: "₹1100",
      service_tags: ["chat", "shopping", "coffee"],
      age: 25,
      rating: 5.0,
      reviews: 10,
      photos: ["https://i.pravatar.cc/150?img=51"],
    },
    {
      id: 6,
      name: "Vikram Rao",
      role: "bf",
      location: "Pune, Maharashtra",
      hourly_rate: "₹1400",
      service_tags: ["movie companion", "dinner", "walks"],
      age: 27,
      rating: 4.5,
      reviews: 14,
      photos: ["https://i.pravatar.cc/150?img=68"],
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h1 className="text-3xl font-bold mb-6">Browse Rentals</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
              <Search size={20} className="text-gray-600" />
              <input
                type="text"
                placeholder="Search location..."
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
            <select className="bg-gray-100 rounded-lg px-4 py-2 focus:outline-none">
              <option>All Price Ranges</option>
              <option>Under ₹1000</option>
              <option>₹1000 - ₹1500</option>
              <option>₹1500+</option>
            </select>
            <select className="bg-gray-100 rounded-lg px-4 py-2 focus:outline-none">
              <option>Any Role</option>
              <option value="gf">GF</option>
              <option value="bf">BF</option>
            </select>
            <button className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Filter size={20} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Rentals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentals.map((rental) => (
            <Link
              key={rental.id}
              to={`/rental/${rental.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={rental.photos?.[0] || "https://i.pravatar.cc/150?img=1"}
                alt={rental.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {rental.name} ({rental.role.toUpperCase()})
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span>{rental.location}</span>
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold">Hourly Rate:</span>{" "}
                  {rental.hourly_rate}
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold">Age:</span> {rental.age}
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold">Services:</span>{" "}
                  {rental.service_tags.join(", ")}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400" />
                    <span className="font-semibold">{rental.rating}</span>
                    <span className="text-gray-600 text-sm">
                      ({rental.reviews} reviews)
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    View Details
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
