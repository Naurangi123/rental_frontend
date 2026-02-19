import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin, Star, BadgeCheck, Shield, Heart, MessageCircle,
  ChevronLeft, ChevronRight, X, Clock, Users, Share2, Flag,
  CheckCircle2, XCircle,
} from "lucide-react";

/* ─────────────────────────────────────────
   PHOTO MODAL  (declared BEFORE RentalDetail)
───────────────────────────────────────── */
function PhotoModal({ photos, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % photos.length);
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(5,4,20,0.93)", backdropFilter: "blur(14px)" }}
      onClick={handleBackdrop}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full text-white z-10 transition-all hover:opacity-80 active:scale-90"
        style={{
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-white/60 text-xs font-semibold pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {current + 1} / {photos.length}
      </div>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-4 sm:left-8 z-10 w-11 h-11 flex items-center justify-center rounded-full text-white transition-all hover:opacity-80 active:scale-90"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Image wrapper — stops backdrop click */}
      <div
        className="relative w-full max-w-2xl mx-20 sm:mx-28"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photos[current]}
          alt={`photo-${current}`}
          className="w-full rounded-2xl object-contain"
          style={{ maxHeight: "80vh" }}
        />
        {/* Glow */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-2xl opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #a855f7, transparent)" }}
        />
      </div>

      {/* Next */}
      {photos.length > 1 && (
        <button
          onClick={next}
          className="absolute right-4 sm:right-8 z-10 w-11 h-11 flex items-center justify-center rounded-full text-white transition-all hover:opacity-80 active:scale-90"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dot indicators */}
      {photos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 22 : 7,
                height: 7,
                background:
                  i === current
                    ? "linear-gradient(90deg, #f43f5e, #a855f7)"
                    : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────── */
const rentalsData = [
  {
    id: 1,
    public_name: "Riya S.",
    name: "Riya Sharma",
    gender: "female",
    role: "both",
    location: "Mumbai, Maharashtra",
    hourly_rate: 1200,
    service_tags: ["Coffee Dates", "Dinner", "Movie Night", "Shopping", "Long Walks"],
    dob: "2000-04-12",
    rating: 4.8,
    reviews: 15,
    is_verified: true,
    id_verified: true,
    bio: "Bubbly, fun-loving, and great at conversations. I love exploring new cafés, binge-watching shows, and going on spontaneous walks. Let's make memories over chai and stories!",
    photos: [
      "https://i.pravatar.cc/600?img=47",
      "https://i.pravatar.cc/600?img=48",
      "https://i.pravatar.cc/600?img=50",
    ],
    verification_summary: {
      id_verified: true,
      bio_verified: true,
      photo_verified: true,
      payment_verified: true,
      phone_verified: true,
    },
    joinDate: "Jan 2023",
  },
  {
    id: 2,
    public_name: "Arjun K.",
    name: "Arjun Kapoor",
    gender: "male",
    role: "provider",
    location: "Delhi, Delhi",
    hourly_rate: 1500,
    service_tags: ["Long Walks", "Dinner", "Concerts", "Gym Buddy", "Road Trips"],
    dob: "1998-08-21",
    rating: 4.6,
    reviews: 18,
    is_verified: true,
    id_verified: false,
    bio: "Adventure-ready, gym enthusiast, and a great listener. Whether it's a fine-dining evening or a trek in the hills, I'll make sure your time is unforgettable.",
    photos: [
      "https://i.pravatar.cc/600?img=11",
      "https://i.pravatar.cc/600?img=12",
    ],
    verification_summary: {
      id_verified: false,
      bio_verified: true,
      photo_verified: true,
      payment_verified: false,
      phone_verified: true,
    },
    joinDate: "Mar 2023",
  },
  {
    id: 3,
    public_name: "Pooja V.",
    name: "Pooja Verma",
    gender: "female",
    role: "provider",
    location: "Bangalore, Karnataka",
    hourly_rate: 1000,
    service_tags: ["Café Hopping", "Art Galleries", "Movie Companion", "Book Clubs", "Museum Visits"],
    dob: "2002-01-05",
    rating: 4.9,
    reviews: 21,
    is_verified: true,
    id_verified: true,
    bio: "Art-lover, coffee addict, and bookworm. I know all the best hidden cafés in Bangalore and love deep conversations about life, books, and everything in between.",
    photos: [
      "https://i.pravatar.cc/600?img=44",
      "https://i.pravatar.cc/600?img=45",
      "https://i.pravatar.cc/600?img=43",
    ],
    verification_summary: {
      id_verified: true,
      bio_verified: true,
      photo_verified: true,
      payment_verified: true,
      phone_verified: true,
    },
    joinDate: "May 2023",
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
    photos: [
      "https://i.pravatar.cc/600?img=49",
      "https://i.pravatar.cc/600?img=50",
      "https://i.pravatar.cc/600?img=51",
    ],
    verification_summary: {
      id_verified: true,
      bio_verified: true,
      photo_verified: true,
      payment_verified: true,
      phone_verified: true,
    },
    joinDate: "May 2023",
  },
  {
    id: 5,
    public_name: "Anjali K.",
    name: "Anjali Kapoor",
    gender: "female",
    role: "Patron",
    location: "Kolkata",
    hourly_rate: 1100,
    service_tags: ["Adda Sessions", "Shopping", "Cultural Events", "Food Tours"],
    dob: "1999-06-30",
    rating: 5.0,
    reviews: 10,
    is_verified: true,
    id_verified: true,
    bio: "Kolkata's most enthusiastic foodie and culture buff. I'll show you the real heart of the city.",
    photos: [
      "https://i.pravatar.cc/600?img=55",
      "https://i.pravatar.cc/600?img=53",
      "https://i.pravatar.cc/600?img=54",
    ],
    verification_summary: {
      id_verified: true,
      bio_verified: true,
      photo_verified: true,
      payment_verified: true,
      phone_verified: true,
    },
    joinDate: "May 2023",
  },
  {
    id: 6,
    public_name: "Vikram R.",
    name: "Vikram Rao",
    gender: "male",
    role: "companion",
    location: "Pune",
    hourly_rate: 1400,
    service_tags: ["Trekking", "Movies", "Dinner", "Bike Rides"],
    dob: "1997-03-08",
    rating: 4.5,
    reviews: 14,
    is_verified: true,
    id_verified: false,
    bio: "Tech guy by day, adventure seeker on weekends. Let's explore Pune's hills or its legendary food scene.",
    photos: [
      "https://i.pravatar.cc/600?img=56",
      "https://i.pravatar.cc/600?img=58",
      "https://i.pravatar.cc/600?img=57",
    ],
    verification_summary: {
      id_verified: true,
      bio_verified: true,
      photo_verified: true,
      payment_verified: true,
      phone_verified: true,
    },
    joinDate: "May 2023",
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
    photos: [
      "https://i.pravatar.cc/600?img=59",
      "https://i.pravatar.cc/600?img=61",
      "https://i.pravatar.cc/600?img=62",
    ],
    verification_summary: {
      id_verified: true,
      bio_verified: true,
      photo_verified: true,
      payment_verified: true,
      phone_verified: true,
    },
    joinDate: "May 2023",
  },
  {
    id: 8,
    public_name: "Dev P.",
    name: "Dev Pillai",
    gender: "male",
    role: "companion",
    location: "Kochi",
    hourly_rate: 1050,
    service_tags: ["Backwater Trips", "Seafood Dinners", "Beach Bonfires", "Chess"],
    dob: "1995-12-25",
    rating: 4.9,
    reviews: 20,
    is_verified: true,
    id_verified: true,
    bio: "Kerala's warmest host. I'll take you through backwaters, temples, and the best seafood you've ever had.",
    photos: [
      "https://i.pravatar.cc/600?img=64",
      "https://i.pravatar.cc/600?img=63",
      "https://i.pravatar.cc/600?img=65",
    ],
    verification_summary: {
      id_verified: true,
      bio_verified: true,
      photo_verified: true,
      payment_verified: true,
      phone_verified: true,
    },
    joinDate: "May 2023",
  },
  {
    id: 9,
    public_name: "Meera J.",
    name: "Meera Joshi",
    gender: "female",
    role: "companion",
    location: "Jaipur",
    hourly_rate: 900,
    service_tags: ["Heritage Walks", "Rajasthani Cuisine", "Shopping", "Photography"],
    dob: "2000-07-22",
    rating: 4.7,
    reviews: 16,
    is_verified: false,
    id_verified: true,
    bio: "Pink City's storyteller. History, havelis, and hot chai — I make Jaipur come alive for visitors.",
    photos: [
      "https://i.pravatar.cc/600?img=66",
      "https://i.pravatar.cc/600?img=68",
      "https://i.pravatar.cc/600?img=67",
    ],
    verification_summary: {
      id_verified: true,
      bio_verified: true,
      photo_verified: true,
      payment_verified: true,
      phone_verified: true,
    },
    joinDate: "May 2023",
  }
];

const VERIFICATION_LABELS = {
  id_verified: "ID Verified",
  bio_verified: "Bio Verified",
  photo_verified: "Photos Verified",
  payment_verified: "Payment Verified",
  phone_verified: "Phone Verified",
};

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

const TAG_COLORS = ["#f87171", "#c084fc", "#fb923c", "#34d399", "#60a5fa"];

export default function RentalDetail() {
  const { id } = useParams();
  const navigate = useNavigate()
  const rental = rentalsData.find((r) => r.id === parseInt(id));

  const [selectedPhoto, setSelectedPhoto] = useState(rental?.photos?.[0] || null);
  const [liked, setLiked]               = useState(false);
  const [modalOpen, setModalOpen]       = useState(false);
  const [modalIndex, setModalIndex]     = useState(0);


  const handleMainPhotoClick = () => {
    const idx = rental.photos.indexOf(selectedPhoto);
    setModalIndex(idx >= 0 ? idx : 0);
    setModalOpen(true);
  };

  if (!rental) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}
      >
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full border-4 mx-auto mb-4 animate-spin"
            style={{ borderColor: "rgba(244,63,94,0.3)", borderTopColor: "#f43f5e" }}
          />
          <p className="text-white/40 text-sm">Loading profile…</p>
        </div>
      </div>
    );
  }

  const age = getAge(rental.dob);
  const isFemale = rental.gender === "female";
  const accentColor = isFemale ? "#f43f5e" : "#6366f1";
  const btnGradient = isFemale
    ? "linear-gradient(135deg, #f43f5e, #ec4899)"
    : "linear-gradient(135deg, #6366f1, #8b5cf6)";
  const btnShadow     = isFemale
    ? "0 6px 24px rgba(244,63,94,0.4)"
    : "0 6px 24px rgba(99,102,241,0.4)";
  const bannerGradient = isFemale
    ? "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #a855f7 100%)"
    : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)";

  const glassCard = {
    background: "rgba(255,255,255,0.055)",
    border: "1px solid rgba(255,255,255,0.09)",
    backdropFilter: "blur(24px)",
  };

  const payment_handle = (id) => {
    navigate(`/payment/${id}`);
  };

  const message_handle = () => {
    navigate("/messages");
  };

  return (
    <>
      {/* ── PAGE ── */}
      <div
        className="min-h-screen"
        style={{
          background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
          fontFamily: "'Nunito', 'Segoe UI', sans-serif",
        }}
      >
        {/* Ambient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute rounded-full" style={{ width:600, height:600, top:-150, left:-150, background:"radial-gradient(circle, rgba(244,63,94,0.18), transparent 70%)" }} />
          <div className="absolute rounded-full" style={{ width:500, height:500, bottom:50, right:-120, background:"radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)" }} />
          <div className="absolute rounded-full" style={{ width:350, height:350, top:"55%", left:"38%", background:"radial-gradient(circle, rgba(249,115,22,0.1), transparent 70%)" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

          {/* Back */}
          <Link
            to="/rentals"
            className="inline-flex items-center gap-1.5 text-white/45 hover:text-white/80 transition-colors text-sm font-semibold mb-8 group"
          >
            <ChevronLeft size={17} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Browse
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* ── PHOTOS COL ── */}
            <div className="lg:col-span-2 flex flex-col gap-4">

              {/* Main photo */}
              <div
                className="relative rounded-3xl overflow-hidden w-full cursor-zoom-in"
                style={{ aspectRatio: "3/4" }}
                onClick={handleMainPhotoClick}
              >
                {selectedPhoto && (
                  <img
                    src={selectedPhoto}
                    alt={rental.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(10,8,30,0.72) 0%, transparent 55%)" }}
                />

                {/* Like + Share — stop propagation so they don't open modal */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                    className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 active:scale-90"
                    style={{
                      background: liked ? "rgba(244,63,94,0.92)" : "rgba(0,0,0,0.45)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Heart size={20} fill={liked ? "white" : "none"} stroke="white" strokeWidth={liked ? 0 : 2} />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-12 flex items-center justify-center rounded-full transition-all hover:opacity-80"
                    style={{
                      background: "rgba(0,0,0,0.45)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Share2 size={20} className="text-white" />
                  </button>
                </div>

                {/* Verified badge */}
                {rental.is_verified && (
                  <div
                    className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white pointer-events-none"
                    style={{ background: "rgba(16,185,129,0.88)", backdropFilter: "blur(8px)" }}
                  >
                    <BadgeCheck size={13} />
                    Verified Profile
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {rental.photos.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {rental.photos.map((photo, idx) => (
                    <button
                      key={idx}
                      // onClick={() => handleThumbnailClick(photo, idx)}
                      onClick={() => setSelectedPhoto(photo)}
                      className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-200"
                      style={{
                        border: selectedPhoto === photo
                          ? `2.5px solid ${accentColor}`
                          : "2.5px solid rgba(255,255,255,0.08)",
                        boxShadow: selectedPhoto === photo ? `0 0 16px ${accentColor}55` : "none",
                        opacity: selectedPhoto === photo ? 1 : 0.5,
                      }}
                    >
                      <img src={photo} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* ── END PHOTOS COL ── */}

            {/* ── DETAILS COL ── */}
            <div className="lg:col-span-3 flex flex-col gap-5">

              {/* Identity card */}
              <div className="rounded-3xl overflow-hidden" style={glassCard}>
                <div className="h-16 relative overflow-hidden" style={{ background: bannerGradient }}>
                  <div className="absolute top-1 right-6 w-20 h-20 rounded-full opacity-15" style={{ background: "rgba(255,255,255,0.5)" }} />
                  <div className="absolute -top-6 right-16 w-28 h-28 rounded-full opacity-10" style={{ background: "rgba(255,255,255,0.5)" }} />
                </div>
                <div className="px-6 pb-6 pt-3">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-1">
                    <div>
                      <h1 className="text-white text-2xl sm:text-3xl font-extrabold leading-tight">
                        {rental.public_name},{" "}
                        <span className="text-white/55 font-normal text-xl">{age}</span>
                      </h1>
                      <p className="text-sm font-bold mt-0.5" style={{ color: accentColor }}>
                        {isFemale ? "GF" : "BF"} · {getRoleLabel(rental.role)}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-2xl shrink-0"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      <Star size={15} fill="#fbbf24" stroke="none" />
                      <span className="text-white font-bold text-lg leading-none">{rental.rating}</span>
                      <span className="text-white/40 text-sm">({rental.reviews})</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-4">
                    <div className="flex items-center gap-1.5 text-white/50 text-sm">
                      <MapPin size={13} /><span>{rental.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/50 text-sm">
                      <Clock size={13} /><span>Member since {rental.joinDate}</span>
                    </div>
                    {rental.id_verified && (
                      <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#818cf8" }}>
                        <Shield size={13} /><span>ID Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="rounded-3xl p-5" style={glassCard}>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>About Me</h2>
                <p className="text-white/60 text-sm leading-relaxed">{rental.bio || "No bio available."}</p>
              </div>

              {/* Services */}
              <div className="rounded-3xl p-5" style={glassCard}>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {rental.service_tags.map((tag, i) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1.5 rounded-full font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: TAG_COLORS[i % TAG_COLORS.length],
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification */}
              <div className="rounded-3xl p-5" style={glassCard}>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accentColor }}>Verification Status</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.entries(rental.verification_summary).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                      style={{
                        background: value ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.07)",
                        border: value ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(239,68,68,0.15)",
                      }}
                    >
                      {value ? <CheckCircle2 size={15} color="#10b981" /> : <XCircle size={15} color="#ef4444" />}
                      <span className="text-sm font-semibold" style={{ color: value ? "#10b981" : "#f87171" }}>
                        {VERIFICATION_LABELS[key] || key}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing + CTA */}
              <div className="rounded-3xl p-5" style={glassCard}>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                  <div>
                    <p className="text-white/35 text-xs font-bold uppercase tracking-wider mb-1">Hourly Rate</p>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-extrabold text-transparent bg-clip-text" style={{ backgroundImage: btnGradient }}>
                        ₹{rental.hourly_rate.toLocaleString()}
                      </span>
                      <span className="text-white/30 text-sm mb-0.5">/hr</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/35 text-sm">
                    <Users size={14} /><span>{rental.reviews} happy clients</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={()=>{payment_handle(rental.id)}}
                    className="flex-1 py-3.5 rounded-2xl text-base font-extrabold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: btnGradient, boxShadow: btnShadow }}
                  >
                    Book {isFemale ? "GF" : "BF"} Experience
                  </button>
                  <button
                    onClick={message_handle}
                    className="flex items-center justify-center w-14 h-14 rounded-2xl text-white transition-all hover:opacity-80 active:scale-95 shrink-0"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
                  >
                    <MessageCircle size={20} />
                  </button>
                </div>
                <div className="flex justify-center mt-3">
                  <button className="flex items-center gap-1.5 text-white/25 hover:text-white/45 text-xs transition-colors">
                    <Flag size={12} />
                    Report this profile
                  </button>
                </div>
              </div>

            </div>
            {/* ── END DETAILS COL ── */}

          </div>{/* end grid */}

          <div className="h-10" />
        </div>
      </div>
      {/* ── PAGE END ── */}

      {/* ── MODAL — rendered in React root via Fragment, fully outside page DOM ── */}
      {modalOpen && (
        <PhotoModal
          photos={rental.photos}
          initialIndex={modalIndex}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}