import { useState } from "react";
import { Star, MapPin, BadgeCheck, Shield, Heart, MessageCircle, Flame, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

const mockFriends = [
  {
    id: 1,
    public_name: "Riya S.",
    name: "Riya Sharma",
    gender: "female",
    role: "both",
    location: "Mumbai",
    dob: "2000-04-12",
    rating: 4.9,
    reviews: 45,
    is_verified: true,
    id_verified: true,
    bio: "Bubbly, fun-loving, and great at conversations. Let's make memories over chai and stories!",
    photos: ["https://i.pravatar.cc/400?img=47"],
    joinDate: "Jan 2023",
    service_tags: ["Coffee Dates", "Dinner", "Movie Night"],
  },
  {
    id: 2,
    public_name: "Arjun K.",
    name: "Arjun Kapoor",
    gender: "male",
    role: "companion",
    location: "Delhi",
    dob: "1998-08-21",
    rating: 4.7,
    reviews: 32,
    is_verified: true,
    id_verified: false,
    bio: "Adventure-ready, gym enthusiast, and a great listener. Making every evening memorable.",
    photos: ["https://i.pravatar.cc/400?img=11"],
    joinDate: "Mar 2023",
    service_tags: ["Long Walks", "Concerts", "Gym Buddy"],
  },
  {
    id: 3,
    public_name: "Pooja V.",
    name: "Pooja Verma",
    gender: "female",
    role: "companion",
    location: "Bangalore",
    dob: "2002-01-05",
    rating: 4.8,
    reviews: 28,
    is_verified: true,
    id_verified: true,
    bio: "Art-lover, coffee addict and bookworm. I know all the best hidden cafés in Bangalore!",
    photos: ["https://i.pravatar.cc/400?img=44"],
    joinDate: "May 2023",
    service_tags: ["Café Hopping", "Art Galleries", "Book Clubs"],
  },
  {
    id: 4,
    public_name: "Rahul M.",
    name: "Rahul Mehta",
    gender: "male",
    role: "both",
    location: "Chennai",
    dob: "1996-11-17",
    rating: 4.6,
    reviews: 19,
    is_verified: false,
    id_verified: false,
    bio: "Chill vibes, great music taste, and always up for a spontaneous plan. Your city guide!",
    photos: ["https://i.pravatar.cc/400?img=15"],
    joinDate: "Aug 2023",
    service_tags: ["Beach Walks", "Live Music", "Road Trips"],
  },
  {
    id: 5,
    public_name: "Anjali K.",
    name: "Anjali Kapoor",
    gender: "female",
    role: "patron",
    location: "Kolkata",
    dob: "1999-06-30",
    rating: 5.0,
    reviews: 15,
    is_verified: true,
    id_verified: true,
    bio: "Kolkata's most enthusiastic foodie and culture buff. I'll show you the real heart of the city.",
    photos: ["https://i.pravatar.cc/400?img=49"],
    joinDate: "Oct 2023",
    service_tags: ["Food Tours", "Cultural Events", "Shopping"],
  },
  {
    id: 6,
    public_name: "Vikram R.",
    name: "Vikram Rao",
    gender: "male",
    role: "companion",
    location: "Pune",
    dob: "1997-03-08",
    rating: 4.5,
    reviews: 22,
    is_verified: true,
    id_verified: false,
    bio: "Tech guy by day, adventure seeker on weekends. Let's explore Pune's hills or legendary food scene.",
    photos: ["https://i.pravatar.cc/400?img=57"],
    joinDate: "Dec 2023",
    service_tags: ["Trekking", "Bike Rides", "Dinner"],
  },
  {
    id: 7,
    public_name: "Sneha T.",
    name: "Sneha Tripathi",
    gender: "female",
    role: "both",
    location: "Hyderabad",
    dob: "2001-09-14",
    rating: 4.8,
    reviews: 8,
    is_verified: true,
    id_verified: true,
    bio: "Foodie, yoga enthusiast and certified overthinker. Looking for genuine connections.",
    photos: ["https://i.pravatar.cc/400?img=41"],
    joinDate: "Feb 2024",
    service_tags: ["Yoga Sessions", "Rooftop Dinners", "Chat"],
  },
  {
    id: 8,
    public_name: "Dev P.",
    name: "Dev Pillai",
    gender: "male",
    role: "companion",
    location: "Kochi",
    dob: "1995-12-25",
    rating: 4.9,
    reviews: 20,
    is_verified: true,
    id_verified: true,
    bio: "Kerala's warmest host. Backwaters, temples, and the best seafood you've ever had.",
    photos: ["https://i.pravatar.cc/400?img=60"],
    joinDate: "Apr 2024",
    service_tags: ["Backwater Trips", "Seafood Dinners", "Chess"],
  },
  {
    id: 9,
    public_name: "Meera J.",
    name: "Meera Joshi",
    gender: "female",
    role: "companion",
    location: "Jaipur",
    dob: "2000-07-22",
    rating: 4.7,
    reviews: 16,
    is_verified: false,
    id_verified: true,
    bio: "Pink City's storyteller. History, havelis, and hot chai — I make Jaipur come alive.",
    photos: ["https://i.pravatar.cc/400?img=36"],
    joinDate: "Jun 2024",
    service_tags: ["Heritage Walks", "Photography", "Shopping"],
  },
];

function getAge(dob) {
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function getRoleLabel(role) {
  return { renter: "Patron", provider: "Companion", both: "Open to Both" }[role] || role;
}

export default function Renters() {
  const [friends] = useState(mockFriends);
  const [likedIds, setLikedIds] = useState([]);

  const toggleLike = (e, id) => {
    e.preventDefault();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      }}
    >
      {/* Ambient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: -150,
            left: -150,
            background:
              "radial-gradient(circle, rgba(244,63,94,0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: 50,
            right: -120,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 350,
            height: 350,
            top: "55%",
            left: "38%",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.1), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={26} className="text-violet-400" />
            <h1
              className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #f43f5e, #a855f7, #f97316)",
              }}
            >
              Meet Your Friends
            </h1>
            {/* <Flame size={26} className="text-rose-400" /> */}
          </div>
          <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Connect with verified and trusted companions in our community.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-6">
            {[
              { label: "Active Members", value: "2,400+" },
              { label: "Cities", value: "32" },
              { label: "Verified Profiles", value: "1,800+" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div
                  className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #f43f5e, #a855f7)",
                  }}
                >
                  {value}
                </div>
                <div className="text-white/40 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {friends.map((friend) => {
            const age = getAge(friend.dob);
            const liked = likedIds.includes(friend.id);
            const isFemale = friend.gender === "female";
            const bannerGradient = isFemale
              ? "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #a855f7 100%)"
              : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)";
            const accentColor = isFemale ? "#f43f5e" : "#6366f1";
            const btnGradient = isFemale
              ? "linear-gradient(135deg, #f43f5e, #ec4899)"
              : "linear-gradient(135deg, #6366f1, #8b5cf6)";
            const btnShadow = isFemale
              ? "0 4px 20px rgba(244,63,94,0.35)"
              : "0 4px 20px rgba(99,102,241,0.35)";

            return (
              <Link
                key={friend.id}
                to={`/renter/${friend.id}`}
                className="group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(24px)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
                }}
              >
                {/* Coloured banner */}
                <div
                  className="relative h-24 overflow-hidden shrink-0"
                  style={{ background: bannerGradient }}
                >
                  {/* Decorative circles */}
                  <div
                    className="absolute top-2 right-4 w-16 h-16 rounded-full opacity-20"
                    style={{ background: "rgba(255,255,255,0.5)" }}
                  />
                  <div
                    className="absolute -top-4 right-12 w-24 h-24 rounded-full opacity-10"
                    style={{ background: "rgba(255,255,255,0.5)" }}
                  />
                  <div
                    className="absolute top-0 left-8 w-10 h-10 rounded-full opacity-20"
                    style={{ background: "rgba(255,255,255,0.5)" }}
                  />

                  {/* Like button */}
                  <button
                    onClick={(e) => toggleLike(e, friend.id)}
                    className="absolute top-3 right-3 w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200 active:scale-90"
                    style={{
                      background: liked
                        ? "rgba(244,63,94,0.92)"
                        : "rgba(0,0,0,0.35)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Heart
                      size={30}
                      fill={liked ? "white" : "none"}
                      stroke="white"
                      strokeWidth={liked ? 0 : 2}
                    />
                  </button>
                </div>

                {/* Content area */}
                <div className="px-5 pb-5 -mt-10 flex flex-col flex-1">
                  {/* Avatar + rating row */}
                  <div className="flex items-end justify-between mb-3">
                    <div className="relative">
                      <img
                        src={friend.photos[0]}
                        alt={friend.public_name}
                        className="w-20 h-20 rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{
                          border: "3px solid rgba(255,255,255,0.12)",
                          boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
                        }}
                      />
                      {/* Online indicator */}
                      <span
                        className="absolute bottom-1 right-1 w-3 h-3 rounded-full"
                        style={{
                          background: "#10b981",
                          border: "2px solid #1a1535",
                        }}
                      />
                    </div>

                    {/* Rating pill */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <Star size={12} fill="#fbbf24" stroke="none" />
                      <span className="text-white font-bold text-sm">
                        {friend.rating}
                      </span>
                      <span className="text-white/40 text-xs">
                        ({friend.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Name + badges */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white text-lg font-extrabold leading-tight">
                        {friend.public_name},
                        <span className="text-white/55 font-normal text-base ml-1">
                          {age}
                        </span>
                      </h3>
                      {friend.is_verified && (
                        <span
                          className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(16,185,129,0.15)",
                            color: "#10b981",
                          }}
                        >
                          <BadgeCheck size={11} />
                          Verified
                        </span>
                      )}
                      {friend.id_verified && (
                        <span
                          className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(99,102,241,0.15)",
                            color: "#818cf8",
                          }}
                        >
                          <Shield size={11} />
                          ID
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <div className="flex items-center gap-1 text-white/45 text-xs">
                        <MapPin size={12} />
                        <span>{friend.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/35 text-xs">
                        <Users size={12} />
                        <span>Since {friend.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-3">
                    {friend.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {friend.service_tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: [
                            "#f87171",
                            "#c084fc",
                            "#fb923c",
                            "#34d399",
                            "#60a5fa",
                          ][i % 5],
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Role label */}
                  <div
                    className="text-xs font-bold mb-4"
                    style={{ color: accentColor }}
                  >
                    {isFemale ? "GF" : "BF"} · {getRoleLabel(friend.role)}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      // onClick={(e) => e.preventDefault()}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                      style={{
                        background: btnGradient,
                        boxShadow: btnShadow,
                      }}
                    >
                      View Profile
                    </button>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="flex items-center justify-center w-12 h-12 rounded-xl text-white transition-all hover:opacity-80 active:scale-95 shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.14)",
                      }}
                    >
                      <MessageCircle size={25} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}