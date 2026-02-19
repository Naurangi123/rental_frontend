import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, Star, Heart, Shield, BadgeCheck, Flame, Sparkles, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";

const mockUsers = [
  {
    id: 1,
    public_name: "Riya S.",
    name: "Riya Sharma",
    gender: "female",
    role: "both",
    location: "Mumbai",
    hourly_rate: 1200,
    service_tags: ["Coffee Dates", "Dinner", "Movie Night", "Shopping"],
    dob: "2000-04-12",
    rating: 4.8,
    reviews: 15,
    is_verified: true,
    id_verified: true,
    bio: "Bubbly, fun-loving, and great at conversations. Let's make memories over chai and stories!",
    photos: ["https://i.pravatar.cc/400?img=47"],
    status: "active",
  },
  {
    id: 2,
    public_name: "Arjun K.",
    name: "Arjun Kapoor",
    gender: "male",
    role: "provider",
    location: "Delhi",
    hourly_rate: 1500,
    service_tags: ["Long Walks", "Dinner", "Concerts", "Gym Buddy"],
    dob: "1998-08-21",
    rating: 4.6,
    reviews: 18,
    is_verified: true,
    id_verified: false,
    bio: "Adventure-ready, gym enthusiast, and a great listener. I'll make sure your evening is memorable.",
    photos: ["https://i.pravatar.cc/400?img=11"],
    status: "active",
  },
  {
    id: 3,
    public_name: "Pooja V.",
    name: "Pooja Verma",
    gender: "female",
    role: "provider",
    location: "Bangalore",
    hourly_rate: 1000,
    service_tags: ["Café Hopping", "Art Galleries", "Movie Companion", "Book Clubs"],
    dob: "2002-01-05",
    rating: 4.9,
    reviews: 21,
    is_verified: true,
    id_verified: true,
    bio: "Art-lover, coffee addict, and bookworm. I know all the best hidden cafés in Bangalore!",
    photos: ["https://i.pravatar.cc/400?img=44"],
    status: "active",
  },
  {
    id: 4,
    public_name: "Rahul M.",
    name: "Rahul Mehta",
    gender: "male",
    role: "both",
    location: "Chennai",
    hourly_rate: 1300,
    service_tags: ["Beach Walks", "Dinner", "Live Music", "Road Trips"],
    dob: "1996-11-17",
    rating: 4.7,
    reviews: 12,
    is_verified: false,
    id_verified: false,
    bio: "Chill vibes, great music taste, and always up for a spontaneous plan. Your city guide!",
    photos: ["https://i.pravatar.cc/400?img=15"],
    status: "active",
  },
  {
    id: 5,
    public_name: "Anjali K.",
    name: "Anjali Kapoor",
    gender: "female",
    role: "renter",
    location: "Kolkata",
    hourly_rate: 1100,
    service_tags: ["Adda Sessions", "Shopping", "Cultural Events", "Food Tours"],
    dob: "1999-06-30",
    rating: 5.0,
    reviews: 10,
    is_verified: true,
    id_verified: true,
    bio: "Kolkata's most enthusiastic foodie and culture buff. I'll show you the real heart of the city.",
    photos: ["https://i.pravatar.cc/400?img=49"],
    status: "active",
  },
  {
    id: 6,
    public_name: "Vikram R.",
    name: "Vikram Rao",
    gender: "male",
    role: "provider",
    location: "Pune",
    hourly_rate: 1400,
    service_tags: ["Trekking", "Movies", "Dinner", "Bike Rides"],
    dob: "1997-03-08",
    rating: 4.5,
    reviews: 14,
    is_verified: true,
    id_verified: false,
    bio: "Tech guy by day, adventure seeker on weekends. Let's explore Pune's hills or its legendary food scene.",
    photos: ["https://i.pravatar.cc/400?img=57"],
    status: "active",
  },
  {
    id: 7,
    public_name: "Sneha T.",
    name: "Sneha Tripathi",
    gender: "female",
    role: "both",
    location: "Hyderabad",
    hourly_rate: 950,
    service_tags: ["Cooking Together", "Rooftop Dinners", "Yoga Sessions", "Chat"],
    dob: "2001-09-14",
    rating: 4.8,
    reviews: 8,
    is_verified: true,
    id_verified: true,
    bio: "Foodie, yoga enthusiast and certified overthinker. Looking for genuine connections and great conversations.",
    photos: ["https://i.pravatar.cc/400?img=41"],
    status: "active",
  },
  {
    id: 8,
    public_name: "Dev P.",
    name: "Dev Pillai",
    gender: "male",
    role: "provider",
    location: "Kochi",
    hourly_rate: 1050,
    service_tags: ["Backwater Trips", "Seafood Dinners", "Beach Bonfires", "Chess"],
    dob: "1995-12-25",
    rating: 4.9,
    reviews: 20,
    is_verified: true,
    id_verified: true,
    bio: "Kerala's warmest host. I'll take you through backwaters, temples, and the best seafood you've ever had.",
    photos: ["https://i.pravatar.cc/400?img=60"],
    status: "active",
  },
  {
    id: 9,
    public_name: "Meera J.",
    name: "Meera Joshi",
    gender: "female",
    role: "provider",
    location: "Jaipur",
    hourly_rate: 900,
    service_tags: ["Heritage Walks", "Rajasthani Cuisine", "Shopping", "Photography"],
    dob: "2000-07-22",
    rating: 4.7,
    reviews: 16,
    is_verified: false,
    id_verified: true,
    bio: "Pink City's storyteller. History, havelis, and hot chai — I make Jaipur come alive for visitors.",
    photos: ["https://i.pravatar.cc/400?img=36"],
    status: "active",
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
  return { renter: "Renter", provider: "Provider", both: "Open to Both" }[role] || role;
}

export default function Rentals() {
  const [users] = useState(mockUsers);
  const [searchLocation, setSearchLocation] = useState("");
  const [filterGender, setFilterGender] = useState("any");
  const [filterPrice, setFilterPrice] = useState("any");
  const [filterRole, setFilterRole] = useState("any");
  const [likedIds, setLikedIds] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleLike = (e, id) => {
    e.preventDefault();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filtered = users.filter((u) => {
    const locMatch =
      !searchLocation ||
      u.location.toLowerCase().includes(searchLocation.toLowerCase());
    const genderMatch = filterGender === "any" || u.gender === filterGender;
    const roleMatch =
      filterRole === "any" || u.role === filterRole || u.role === "both";
    const priceMatch =
      filterPrice === "any" ||
      (filterPrice === "under1000" && u.hourly_rate < 1000) ||
      (filterPrice === "1000-1500" &&
        u.hourly_rate >= 1000 &&
        u.hourly_rate <= 1500) ||
      (filterPrice === "above1500" && u.hourly_rate > 1500);
    return locMatch && genderMatch && roleMatch && priceMatch;
  });

  const hasActiveFilters =
    filterGender !== "any" ||
    filterPrice !== "any" ||
    filterRole !== "any" ||
    searchLocation;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      }}
    >
      {/* Ambient background orbs */}
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
            <Flame size={26} className="text-rose-400" />
            <h1
              className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #f43f5e, #a855f7, #f97316)",
              }}
            >
              Find Your Companion
            </h1>
            <Sparkles size={26} className="text-violet-400" />
          </div>
          <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Verified companions for dinners, events &amp; more. Real
            connections, safe experiences.
          </p>
        </div>

        {/* Search & Filter Panel */}
        <div
          className="rounded-2xl p-4 sm:p-5 mb-4"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div
              className="flex items-center gap-2 flex-1 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <MapPin size={17} className="text-rose-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by city..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="bg-transparent text-white placeholder-white/35 w-full focus:outline-none text-sm"
              />
              {searchLocation && (
                <button onClick={() => setSearchLocation("")}>
                  <X size={15} className="text-white/40 hover:text-white/70" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all"
              style={{
                background: showFilters
                  ? "linear-gradient(135deg, #f43f5e, #a855f7)"
                  : "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <SlidersHorizontal size={25} />
              Filters
              <ChevronDown
                size={25}
                className={`transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
              {[
                {
                  label: "Looking for",
                  value: filterGender,
                  set: setFilterGender,
                  options: [
                    { value: "any", label: "Any Gender" },
                    { value: "female", label: "Female (GF experience)" },
                    { value: "male", label: "Male (BF experience)" },
                  ],
                },
                {
                  label: "Role",
                  value: filterRole,
                  set: setFilterRole,
                  options: [
                    { value: "any", label: "Any Role" },
                    { value: "provider", label: "Provider only" },
                    { value: "renter", label: "Renter only" },
                  ],
                },
                {
                  label: "Price range",
                  value: filterPrice,
                  set: setFilterPrice,
                  options: [
                    { value: "any", label: "Any Price" },
                    { value: "under1000", label: "Under ₹1,000/hr" },
                    { value: "1000-1500", label: "₹1,000 – ₹1,500/hr" },
                    { value: "above1500", label: "Above ₹1,500/hr" },
                  ],
                },
              ].map(({ label, value, set, options }) => (
                <div key={label}>
                  <label className="block text-white/40 text-xs font-semibold mb-1.5 ml-0.5 uppercase tracking-wider">
                    {label}
                  </label>
                  <select
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none appearance-none cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {options.map((o) => (
                      <option
                        key={o.value}
                        value={o.value}
                        style={{ background: "#302b63" }}
                      >
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Results meta */}
        <div className="flex items-center justify-between mb-5 px-1">
          <p className="text-white/50 text-sm">
            <span className="text-white font-bold">{filtered.length}</span>{" "}
            companions available
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setFilterGender("any");
                setFilterPrice("any");
                setFilterRole("any");
                setSearchLocation("");
              }}
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-sm font-semibold transition-colors"
            >
              <X size={20} /> Clear filters
            </button>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((user) => {
            const age = getAge(user.dob);
            const liked = likedIds.includes(user.id);
            const isFemale = user.gender === "female";
            const accentColor = isFemale ? "#f43f5e" : "#6366f1";
            const gradientBg = isFemale
              ? "linear-gradient(135deg, #f43f5e, #ec4899)"
              : "linear-gradient(135deg, #6366f1, #8b5cf6)";
            const glowShadow = isFemale
              ? "0 4px 20px rgba(244,63,94,0.35)"
              : "0 4px 20px rgba(99,102,241,0.35)";

            return (
              <Link
                key={user.id}
                to={`/rental/${user.id}`}
                className="group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(24px)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
                }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height: 260 }}>
                  <img
                    src={user.photos[0]}
                    alt={user.public_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,8,30,0.96) 0%, rgba(10,8,30,0.25) 45%, transparent 100%)",
                    }}
                  />

                  {/* Verification badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {user.is_verified && (
                      <span
                        className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(16,185,129,0.88)",
                          color: "white",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <BadgeCheck size={15} />
                        Verified
                      </span>
                    )}
                    {user.id_verified && (
                      <span
                        className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(99,102,241,0.88)",
                          color: "white",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <Shield size={15} />
                        ID
                      </span>
                    )}
                  </div>

                  {/* Like button */}
                  <button
                    onClick={(e) => toggleLike(e, user.id)}
                    className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 active:scale-90"
                    style={{
                      background: liked
                        ? "rgba(244,63,94,0.92)"
                        : "rgba(0,0,0,0.45)",
                      border: "1px solid rgba(255,255,255,0.2)",
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

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-white text-xl font-extrabold leading-tight">
                          {user.public_name},{" "}
                          <span className="font-normal text-white/65 text-lg">
                            {age}
                          </span>
                        </h3>
                        <div className="flex items-center gap-1 text-white/55 text-xs mt-0.5">
                          <MapPin size={12} />
                          <span>{user.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star
                          size={13}
                          fill="#fbbf24"
                          stroke="none"
                          className="text-amber-400"
                        />
                        <span className="text-white font-bold text-sm">
                          {user.rating}
                        </span>
                        <span className="text-white/40 text-xs">
                          ({user.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-3 p-4 flex-1">
                  {/* Bio */}
                  <p className="text-white/55 text-sm leading-relaxed line-clamp-2">
                    {user.bio}
                  </p>

                  {/* Service tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {user.service_tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full font-semibold"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.13)",
                          color: ["#f87171", "#c084fc", "#fb923c", "#34d399", "#60a5fa"][i % 5],
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {user.service_tags.length > 3 && (
                      <span
                        className="text-xs px-3 py-1 rounded-full text-white/35"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        +{user.service_tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-3 mt-auto"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div>
                      <div className="text-white font-extrabold text-lg leading-none">
                        ₹{user.hourly_rate.toLocaleString()}
                        <span className="text-white/35 text-xs font-normal ml-0.5">
                          /hr
                        </span>
                      </div>
                      <div
                        className="text-xs mt-1 font-semibold"
                        style={{ color: accentColor }}
                      >
                        {isFemale ? "GF" : "BF"} ·{" "}
                        {getRoleLabel(user.role)}
                      </div>
                    </div>
                    <button
                      // onClick={(e) => e.preventDefault()}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                      style={{
                        background: gradientBg,
                        boxShadow: glowShadow,
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🌙</div>
            <p className="text-white/50 text-lg font-semibold">
              No companions found
            </p>
            <p className="text-white/30 text-sm mt-2">
              Try adjusting your filters or search location.
            </p>
          </div>
        )}

        <div className="h-10" />
      </div>
    </div>
  );
}