import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Shield,
  AlertTriangle, CheckCircle2, CreditCard, Smartphone, Wallet,
  Lock, Info, Star, BadgeCheck, Heart, X, Check,
  FileText, Users, Phone, MessageCircle, IndianRupee,
} from "lucide-react";

/* ─────────────────────────────────────
   MOCK DATA
───────────────────────────────────── */
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
    photos: ["https://i.pravatar.cc/600?img=47"],
  },
  {
    id: 2,
    public_name: "Arjun K.",
    name: "Arjun Kapoor",
    gender: "male",
    role: "provider",
    location: "Delhi, Delhi",
    hourly_rate: 1500,
    service_tags: ["Long Walks", "Dinner", "Concerts", "Gym Buddy"],
    dob: "1998-08-21",
    rating: 4.6,
    reviews: 18,
    is_verified: true,
    id_verified: false,
    photos: ["https://i.pravatar.cc/600?img=11"],
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
    photos: ["https://i.pravatar.cc/600?img=43"],
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
    photos: ["https://i.pravatar.cc/600?img=49"],
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
    photos: ["https://i.pravatar.cc/600?img=54"],
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
    photos: [
      "https://i.pravatar.cc/600?img=56"
    ],
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
    photos: [
      "https://i.pravatar.cc/600?img=59"
    ],
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
    photos: [
      "https://i.pravatar.cc/600?img=64"
    ],
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
    photos: ["https://i.pravatar.cc/600?img=66"],
  }
];

function getAge(dob) {
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

const STEPS = [
  { id: 1, label: "Details",   icon: Calendar },
  { id: 2, label: "Consent",   icon: FileText },
  { id: 3, label: "Payment",   icon: CreditCard },
  { id: 4, label: "Confirm",   icon: CheckCircle2 },
];

const PAYMENT_METHODS = [
  { id: "upi",    label: "UPI",            icon: Smartphone, desc: "GPay, PhonePe, Paytm" },
  { id: "card",   label: "Card",           icon: CreditCard, desc: "Credit / Debit card" },
  { id: "wallet", label: "Wallet",         icon: Wallet,     desc: "Paytm, Amazon Pay" },
  { id: "cash",   label: "Pay at Meeting", icon: IndianRupee, desc: "Cash on arrival" },
];

const TIME_SLOTS = ["10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM",
                    "3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM"];

const POLICIES = [
  {
    id: "terms",
    label: "Terms of Service",
    required: true,
    text: "I agree to the Terms of Service, including acceptable use of the companion platform, booking obligations, and cancellation policy.",
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    required: true,
    text: "I agree to the Privacy Policy, including how my personal data is collected, stored, and used.",
  },
  {
    id: "conduct",
    label: "Code of Conduct",
    required: true,
    text: "I agree to treat the companion with full respect. Any inappropriate, threatening, or disrespectful behaviour will result in immediate cancellation and account suspension.",
  },
  {
    id: "refund",
    label: "Cancellation & Refund Policy",
    required: true,
    text: "I understand that cancellations made within 2 hours of the session are non-refundable. Cancellations 24+ hours in advance receive a full refund.",
  },
  {
    id: "noSexual",
    label: "No Sexual Services Declaration",
    required: true,
    text: "I understand and confirm that this platform provides companionship only. No sexual or intimate physical services are offered or implied. Violation of this policy results in permanent ban.",
  },
  {
    id: "age",
    label: "Age Confirmation",
    required: true,
    text: "I confirm that I am 18 years of age or older, and I am booking this experience on my own behalf.",
  },
  {
    id: "emergency",
    label: "Emergency & Safety Protocol",
    required: false,
    text: "I acknowledge that both parties can escalate safety concerns to our 24/7 support team. In emergencies, contact local authorities first.",
  },
];

const CONSENT_POINTS = [
  "Both parties maintain the right to end the session at any time without explanation.",
  "Location sharing during the session is optional but recommended for safety.",
  "You agree not to record, photograph, or share the companion's personal information without explicit consent.",
  "Any extension of time must be mutually agreed upon and booked separately.",
  "The companion reserves the right to decline any activity they are uncomfortable with.",
  "Disputes must first be raised with our support team before external escalation.",
];

/* ─────────────────────────────────────
   GLASS CARD STYLE
───────────────────────────────────── */
const glass = {
  background: "rgba(255,255,255,0.055)",
  border: "1px solid rgba(255,255,255,0.09)",
  backdropFilter: "blur(24px)",
};

/* ─────────────────────────────────────
   STEP INDICATOR
───────────────────────────────────── */
function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done    = step.id < current;
        const active  = step.id === current;
        const Icon    = step.icon;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-sm"
                style={{
                  background: done
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : active
                    ? "linear-gradient(135deg, #f43f5e, #a855f7)"
                    : "rgba(255,255,255,0.07)",
                  border: active
                    ? "none"
                    : done
                    ? "none"
                    : "1px solid rgba(255,255,255,0.15)",
                  boxShadow: active ? "0 0 20px rgba(244,63,94,0.4)" : "none",
                }}
              >
                {done
                  ? <Check size={16} color="white" />
                  : <Icon size={16} color={active ? "white" : "rgba(255,255,255,0.3)"} />
                }
              </div>
              <span
                className="text-xs font-semibold hidden sm:block"
                style={{ color: active ? "white" : done ? "#10b981" : "rgba(255,255,255,0.3)" }}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="w-12 sm:w-20 h-0.5 mb-5 mx-1 transition-all duration-500"
                style={{
                  background: done
                    ? "linear-gradient(90deg, #10b981, #059669)"
                    : "rgba(255,255,255,0.10)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────
   CUSTOM CHECKBOX
───────────────────────────────────── */
function Checkbox({ checked, onChange, label, sublabel, required, accent = "#f43f5e" }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div
        onClick={onChange}
        className="mt-0.5 w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all duration-200"
        style={{
          background: checked ? accent : "rgba(255,255,255,0.07)",
          border: checked ? "none" : "1.5px solid rgba(255,255,255,0.2)",
          boxShadow: checked ? `0 0 12px ${accent}55` : "none",
        }}
      >
        {checked && <Check size={12} color="white" strokeWidth={3} />}
      </div>
      <div>
        <span className="text-white/85 text-sm font-semibold leading-snug">
          {label}
          {required && <span className="text-rose-400 ml-1">*</span>}
        </span>
        {sublabel && (
          <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{sublabel}</p>
        )}
      </div>
    </label>
  );
}

export default function BookingPage() {
  const { id } = useParams();
  const rental  = rentalsData.find((r) => r.id === parseInt(id));

  // Step
  const [step, setStep] = useState(1);

  // Step 1 — Booking details
  const [selectedDate,     setSelectedDate]     = useState("");
  const [selectedTime,     setSelectedTime]     = useState("");
  const [selectedDuration, setSelectedDuration] = useState(2);
  const [selectedService,  setSelectedService]  = useState("");
  const [meetingLocation,  setMeetingLocation]  = useState("");
  const [specialNote,      setSpecialNote]      = useState("");
  const [contactPhone,     setContactPhone]     = useState("");

  // Step 2 — Consent + policies
  const [consentRead,  setConsentRead]  = useState(false);
  const [policyChecks, setPolicyChecks] = useState(
    Object.fromEntries(POLICIES.map((p) => [p.id, false]))
  );

  // Step 3 — Payment
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId,         setUpiId]         = useState("");
  const [cardNumber,    setCardNumber]    = useState("");
  const [cardExpiry,    setCardExpiry]    = useState("");
  const [cardCvv,       setCardCvv]       = useState("");
  const [promoCode,     setPromoCode]     = useState("");
  const [promoApplied,  setPromoApplied]  = useState(false);

  // Step 4 — Confirmed
  const [bookingId] = useState(() => {return "BK" + Math.random().toString(36).slice(2, 8).toUpperCase();});

  if (!rental) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}>
        <p className="text-white/50">Rental not found.</p>
      </div>
    );
  }

  const age        = getAge(rental.dob);
  const isFemale   = rental.gender === "female";
  const accent     = isFemale ? "#f43f5e" : "#6366f1";
  const gradient   = isFemale
    ? "linear-gradient(135deg, #f43f5e, #ec4899)"
    : "linear-gradient(135deg, #6366f1, #8b5cf6)";
  const glow       = isFemale
    ? "0 6px 24px rgba(244,63,94,0.4)"
    : "0 6px 24px rgba(99,102,241,0.4)";

  const totalAmount   = rental.hourly_rate * selectedDuration;
  const platformFee   = Math.round(totalAmount * 0.05);
  const discount      = promoApplied ? Math.round(totalAmount * 0.1) : 0;
  const grandTotal    = totalAmount + platformFee - discount;

  const allPoliciesChecked = POLICIES.filter((p) => p.required).every((p) => policyChecks[p.id]);

  /* ── Validation per step ── */
  const canProceed = () => {
    if (step === 1) return selectedDate && selectedTime && selectedService && contactPhone.length >= 10;
    if (step === 2) return consentRead && allPoliciesChecked;
    if (step === 3) {
      if (paymentMethod === "upi")    return upiId.length > 5;
      if (paymentMethod === "card")   return cardNumber.length === 16 && cardExpiry && cardCvv.length === 3;
      if (paymentMethod === "cash")   return true;
      if (paymentMethod === "wallet") return true;
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (canProceed()) setStep((s) => Math.min(s + 1, 4));
  };

  const togglePolicy = (id) => {
    setPolicyChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /* ── Promo apply ── */
  const applyPromo = () => {
    if (promoCode.toUpperCase() === "FIRST10") setPromoApplied(true);
  };

  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      }}
    >
      {/* Ambient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute rounded-full" style={{ width:600, height:600, top:-150, left:-150, background:"radial-gradient(circle, rgba(244,63,94,0.15), transparent 70%)" }} />
        <div className="absolute rounded-full" style={{ width:500, height:500, bottom:50, right:-120, background:"radial-gradient(circle, rgba(139,92,246,0.13), transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Back */}
        <Link
          to={`/rental/${id}`}
          className="inline-flex items-center gap-1.5 text-white/45 hover:text-white/80 transition-colors text-sm font-semibold mb-8 group"
        >
          <ChevronLeft size={17} className="transition-transform group-hover:-translate-x-0.5" />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text mb-1"
            style={{ backgroundImage: "linear-gradient(90deg, #f43f5e, #a855f7, #f97316)" }}
          >
            Book Your Experience
          </h1>
          <p className="text-white/45 text-sm">Safe · Verified · Respectful</p>
        </div>

        {/* Step bar */}
        <StepBar current={step} />

        {/* ── Companion mini card ── */}
        <div className="rounded-2xl p-4 mb-6 flex items-center gap-4" style={glass}>
          <img
            src={rental.photos[0]}
            alt={rental.public_name}
            className="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-extrabold text-base">{rental.public_name}, {age}</h3>
              {rental.is_verified && <BadgeCheck size={15} color="#10b981" />}
            </div>
            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
              <span className="flex items-center gap-1 text-white/45 text-xs"><MapPin size={11} />{rental.location}</span>
              <span className="flex items-center gap-1 text-amber-400 text-xs"><Star size={11} fill="currentColor" />{rental.rating} ({rental.reviews})</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-white font-extrabold text-lg" style={{ color: accent }}>
              ₹{rental.hourly_rate.toLocaleString()}
            </div>
            <div className="text-white/35 text-xs">/hour</div>
          </div>
        </div>

        {/* ════════════════════════════
            STEP 1 — BOOKING DETAILS
        ════════════════════════════ */}
        {step === 1 && (
          <div className="rounded-3xl p-6 sm:p-8 flex flex-col gap-6" style={glass}>
            <SectionTitle accent={accent} icon={<Calendar size={16} />} title="Booking Details" />

            {/* Date */}
            <Field label="Select Date" required>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none appearance-none"
                style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", colorScheme:"dark" }}
              />
            </Field>

            {/* Time slots */}
            <Field label="Select Time Slot" required>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                    style={{
                      background: selectedTime === slot ? gradient : "rgba(255,255,255,0.07)",
                      border: selectedTime === slot ? "none" : "1px solid rgba(255,255,255,0.12)",
                      color: selectedTime === slot ? "white" : "rgba(255,255,255,0.55)",
                      boxShadow: selectedTime === slot ? glow : "none",
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </Field>

            {/* Duration */}
            <Field label={`Duration: ${selectedDuration} hour${selectedDuration > 1 ? "s" : ""}`} required>
              <input
                type="range"
                min={1} max={8} step={1}
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
              <div className="flex justify-between text-white/30 text-xs mt-1">
                {[1,2,3,4,5,6,7,8].map((h) => <span key={h}>{h}h</span>)}
              </div>
            </Field>

            {/* Service */}
            <Field label="Choose Activity" required>
              <div className="flex flex-wrap gap-2">
                {rental.service_tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedService(tag)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                    style={{
                      background: selectedService === tag ? gradient : "rgba(255,255,255,0.07)",
                      border: selectedService === tag ? "none" : "1px solid rgba(255,255,255,0.12)",
                      color: selectedService === tag ? "white" : "rgba(255,255,255,0.55)",
                      boxShadow: selectedService === tag ? glow : "none",
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </Field>

            {/* Meeting location */}
            <Field label="Meeting Location / Area" required={false}>
              <input
                type="text"
                placeholder="e.g. Bandra, Mumbai (exact address shared privately)"
                value={meetingLocation}
                onChange={(e) => setMeetingLocation(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none"
                style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}
              />
            </Field>

            {/* Contact phone */}
            <Field label="Your Contact Number" required>
              <div className="flex gap-2">
                <span className="flex items-center px-3 rounded-xl text-white/50 text-sm"
                  style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}>
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value.replace(/\D/,""))}
                  className="flex-1 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none"
                  style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}
                />
              </div>
            </Field>

            {/* Special note */}
            <Field label="Special Requests / Notes" required={false}>
              <textarea
                rows={3}
                placeholder="Any preferences or things the companion should know..."
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none resize-none"
                style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}
              />
            </Field>

            {/* Live price estimate */}
            <PriceEstimate
              hourly={rental.hourly_rate}
              duration={selectedDuration}
              platformFee={platformFee}
              total={grandTotal}
              accent={accent}
            />

            {/* ℹ Safety note */}
            <InfoBox icon={<Phone size={14} />} color="#60a5fa">
              Your contact details are shared with the companion only after booking confirmation.
              You can also chat via our in-app messenger without sharing your personal number.
            </InfoBox>
          </div>
        )}

        {/* ════════════════════════════
            STEP 2 — CONSENT & POLICIES
        ════════════════════════════ */}
        {step === 2 && (
          <div className="rounded-3xl p-6 sm:p-8 flex flex-col gap-6" style={glass}>
            <SectionTitle accent={accent} icon={<FileText size={16} />} title="Consent & Policies" />

            {/* Consent banner */}
            <div
              className="rounded-2xl p-4"
              style={{ background:"rgba(244,63,94,0.08)", border:"1px solid rgba(244,63,94,0.2)" }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-rose-300 font-bold text-sm mb-1">Important — Please Read Carefully</p>
                  <p className="text-white/55 text-xs leading-relaxed">
                    This platform provides <strong className="text-white/80">companionship services only</strong>. 
                    No physical intimacy, sexual services, or personal relationship obligations are implied or included.
                    All sessions are logged for safety. Misconduct results in permanent account ban and may be reported to authorities.
                  </p>
                </div>
              </div>
            </div>

            {/* Consent points */}
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">Session Consent Agreement</p>
              <div
                className="rounded-2xl p-4 flex flex-col gap-3 max-h-52 overflow-y-auto"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}
              >
                {CONSENT_POINTS.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background:"rgba(168,85,247,0.2)", border:"1px solid rgba(168,85,247,0.3)" }}>
                      <span className="text-violet-400 text-xs font-bold">{i+1}</span>
                    </div>
                    <p className="text-white/55 text-xs leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <Checkbox
                checked={consentRead}
                onChange={() => setConsentRead(!consentRead)}
                label="I have read and understood the Session Consent Agreement"
                required
                accent={accent}
              />
            </div>

            {/* Policies */}
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Platform Policies</p>
              <div className="flex flex-col gap-4">
                {POLICIES.map((policy) => (
                  <div
                    key={policy.id}
                    className="rounded-2xl p-4 flex flex-col gap-2"
                    style={{
                      background: policyChecks[policy.id] ? "rgba(16,185,129,0.05)" : "rgba(255,255,255,0.03)",
                      border: policyChecks[policy.id] ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p className="text-white/50 text-xs leading-relaxed">{policy.text}</p>
                    <Checkbox
                      checked={policyChecks[policy.id]}
                      onChange={() => togglePolicy(policy.id)}
                      label={policy.label}
                      required={policy.required}
                      accent={accent}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Obstacle / issue report */}
            <div
              className="rounded-2xl p-4"
              style={{ background:"rgba(251,191,36,0.06)", border:"1px solid rgba(251,191,36,0.2)" }}
            >
              <div className="flex items-start gap-3">
                <MessageCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-300 font-bold text-sm mb-1">Facing Any Issues?</p>
                  <p className="text-white/50 text-xs leading-relaxed">
                    If you encounter any obstacles — policy concerns, discomfort, technical issues, or anything
                    unexpected during or after the booking — reach out to our 24/7 support team immediately.
                    We coordinate with both parties to resolve issues fairly and swiftly.
                  </p>
                  <button className="mt-2 text-amber-400 text-xs font-bold hover:text-amber-300 transition-colors underline underline-offset-2">
                    Contact Support →
                  </button>
                </div>
              </div>
            </div>

            {!allPoliciesChecked && (
              <p className="text-rose-400/70 text-xs text-center">
                Please accept all required (*) policies to continue.
              </p>
            )}
          </div>
        )}

        {/* ════════════════════════════
            STEP 3 — PAYMENT
        ════════════════════════════ */}
        {step === 3 && (
          <div className="rounded-3xl p-6 sm:p-8 flex flex-col gap-6" style={glass}>
            <SectionTitle accent={accent} icon={<CreditCard size={16} />} title="Payment" />

            {/* Order summary */}
            <div className="rounded-2xl p-4 flex flex-col gap-2" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Order Summary</p>
              <SummaryRow label={`${selectedService} · ${selectedDuration}h`} value={`₹${totalAmount.toLocaleString()}`} />
              <SummaryRow label="Platform Fee (5%)" value={`₹${platformFee}`} />
              {promoApplied && <SummaryRow label="Promo FIRST10 (10% off)" value={`-₹${discount}`} green />}
              <div className="border-t border-white/10 mt-1 pt-2">
                <SummaryRow label="Total" value={`₹${grandTotal.toLocaleString()}`} bold />
              </div>
            </div>

            {/* Promo code */}
            <div>
              <p className="text-white/45 text-xs font-semibold mb-2">Promo / Referral Code</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code (try FIRST10)"
                  value={promoCode}
                  onChange={(e) => { setPromoCode(e.target.value); setPromoApplied(false); }}
                  className="flex-1 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none"
                  style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}
                />
                <button
                  onClick={applyPromo}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-85"
                  style={{ background: gradient }}
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-emerald-400 text-xs mt-1.5 flex items-center gap-1"><Check size={12} /> 10% discount applied!</p>
              )}
            </div>

            {/* Payment method selector */}
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">Choose Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  const active = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200"
                      style={{
                        background: active ? (isFemale ? "rgba(244,63,94,0.12)" : "rgba(99,102,241,0.12)") : "rgba(255,255,255,0.05)",
                        border: active ? `1.5px solid ${accent}` : "1.5px solid rgba(255,255,255,0.08)",
                        boxShadow: active ? `0 0 16px ${accent}25` : "none",
                      }}
                    >
                      <Icon size={18} color={active ? accent : "rgba(255,255,255,0.4)"} />
                      <div>
                        <p className="text-white text-sm font-bold leading-none">{method.label}</p>
                        <p className="text-white/35 text-xs mt-0.5">{method.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic payment fields */}
            {paymentMethod === "upi" && (
              <Field label="UPI ID" required>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none"
                  style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}
                />
              </Field>
            )}

            {paymentMethod === "card" && (
              <div className="flex flex-col gap-4">
                <Field label="Card Number" required>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/,""))}
                    className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none tracking-widest"
                    style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry" required>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none"
                      style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}
                    />
                  </Field>
                  <Field label="CVV" required>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/,""))}
                      className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none"
                      style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}
                    />
                  </Field>
                </div>
              </div>
            )}

            {paymentMethod === "cash" && (
              <InfoBox icon={<IndianRupee size={14} />} color="#34d399">
                You have chosen to pay at the meeting point. Please carry exact change of
                <strong className="text-white/80"> ₹{grandTotal.toLocaleString()}</strong>.
                The companion will confirm receipt at session start.
              </InfoBox>
            )}

            {paymentMethod === "wallet" && (
              <InfoBox icon={<Wallet size={14} />} color="#60a5fa">
                You will be redirected to your preferred wallet app to complete payment after confirming the booking.
              </InfoBox>
            )}

            {/* Security note */}
            <div className="flex items-center gap-2 text-white/30 text-xs">
              <Lock size={12} />
              <span>All transactions are encrypted with 256-bit SSL. We never store your card details.</span>
            </div>
          </div>
        )}

        {/* ════════════════════════════
            STEP 4 — CONFIRMATION
        ════════════════════════════ */}
        {step === 4 && (
          <div className="rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 text-center" style={glass}>
            {/* Success animation */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow:"0 0 40px rgba(16,185,129,0.5)" }}
            >
              <Check size={36} color="white" strokeWidth={3} />
            </div>

            <div>
              <h2 className="text-white text-2xl font-extrabold mb-1">Booking Confirmed!</h2>
              <p className="text-white/50 text-sm">Your experience has been booked successfully.</p>
            </div>

            {/* Booking ID */}
            <div
              className="rounded-2xl px-6 py-3 w-full"
              style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)" }}
            >
              <p className="text-white/40 text-xs mb-1">Booking Reference</p>
              <p className="text-white font-extrabold text-xl tracking-widest" style={{ color: accent }}>{bookingId}</p>
            </div>

            {/* Summary */}
            <div className="w-full rounded-2xl p-4 flex flex-col gap-2.5 text-left"
              style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
              <ConfirmRow icon={<Users size={13} />}   label="Companion"  value={`${rental.public_name}, ${age}`} />
              <ConfirmRow icon={<Calendar size={13} />} label="Date"       value={selectedDate || "—"} />
              <ConfirmRow icon={<Clock size={13} />}    label="Time"       value={`${selectedTime || "—"} · ${selectedDuration}h`} />
              <ConfirmRow icon={<Heart size={13} />}    label="Activity"   value={selectedService || "—"} />
              <ConfirmRow icon={<MapPin size={13} />}   label="Location"   value={meetingLocation || "To be shared privately"} />
              <ConfirmRow icon={<CreditCard size={13}/>} label="Payment"  value={PAYMENT_METHODS.find(p=>p.id===paymentMethod)?.label || "—"} />
              <div className="border-t border-white/10 pt-2 mt-1">
                <ConfirmRow icon={<IndianRupee size={13} />} label="Amount Paid" value={`₹${grandTotal.toLocaleString()}`} bold />
              </div>
            </div>

            {/* What's next */}
            <div
              className="w-full rounded-2xl p-4 text-left"
              style={{ background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.2)" }}
            >
              <p className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 size={15} /> What Happens Next
              </p>
              <ul className="text-white/50 text-xs flex flex-col gap-1.5">
                <li>• The companion will confirm within 30 minutes via in-app notification.</li>
                <li>• Exact meeting location will be shared privately 1 hour before the session.</li>
                <li>• A reminder SMS will be sent to +91 {contactPhone}.</li>
                <li>• For changes or cancellations, use the "My Bookings" section.</li>
              </ul>
            </div>

            {/* Safety reminder */}
            <div
              className="w-full rounded-2xl p-4 text-left"
              style={{ background:"rgba(251,191,36,0.06)", border:"1px solid rgba(251,191,36,0.18)" }}
            >
              <p className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2">
                <Shield size={15} /> Safety Reminder
              </p>
              <p className="text-white/45 text-xs leading-relaxed">
                Meet in public places. Inform a trusted person of your plans.
                Contact our 24/7 support if anything feels unsafe. Emergency: dial <strong className="text-white/70">112</strong>.
              </p>
            </div>

            <div className="flex gap-3 w-full">
              <Link
                to="/"
                className="flex-1 py-3 rounded-2xl text-sm font-bold text-white text-center transition-all hover:opacity-85"
                style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.14)" }}
              >
                Go Home
              </Link>
              <Link
                to="/rentals"
                className="flex-1 py-3 rounded-2xl text-sm font-bold text-white text-center transition-all hover:opacity-90"
                style={{ background: gradient, boxShadow: glow }}
              >
                Browse More
              </Link>
            </div>
          </div>
        )}

        {/* ── Navigation buttons ── */}
        {step < 4 && (
          <div className="flex gap-3 mt-5">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-80"
                style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.14)" }}
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-base font-extrabold text-white transition-all"
              style={{
                background: canProceed() ? gradient : "rgba(255,255,255,0.07)",
                boxShadow: canProceed() ? glow : "none",
                color: canProceed() ? "white" : "rgba(255,255,255,0.25)",
                cursor: canProceed() ? "pointer" : "not-allowed",
              }}
            >
              {step === 3 ? "Confirm & Pay" : "Continue"}
              {step < 3 && <ChevronRight size={18} />}
              {step === 3 && <Lock size={15} />}
            </button>
          </div>
        )}

        <div className="h-10" />
      </div>
    </div>
  );
}

function SectionTitle({ accent, icon, title }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:`${accent}22`, border:`1px solid ${accent}44` }}>
        {icon && <span style={{ color: accent }}>{icon}</span>}
      </div>
      <h2 className="text-white font-extrabold text-lg">{title}</h2>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
        {label}{required && <span className="text-rose-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function InfoBox({ icon, color, children }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl p-3.5"
      style={{ background:`${color}12`, border:`1px solid ${color}30` }}>
      <span style={{ color }} className="shrink-0 mt-0.5">{icon}</span>
      <p className="text-white/55 text-xs leading-relaxed">{children}</p>
    </div>
  );
}

function SummaryRow({ label, value, green, bold }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50 text-sm">{label}</span>
      <span
        className={`text-sm font-bold ${bold ? "text-white text-base" : ""}`}
        style={{ color: green ? "#10b981" : bold ? "white" : "rgba(255,255,255,0.75)" }}
      >
        {value}
      </span>
    </div>
  );
}

function PriceEstimate({ hourly, duration, platformFee, total }) {
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-2"
      style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Price Estimate</p>
      <SummaryRow label={`₹${hourly.toLocaleString()} × ${duration}h`} value={`₹${(hourly*duration).toLocaleString()}`} />
      <SummaryRow label="Platform Fee (5%)" value={`₹${platformFee}`} />
      <div className="border-t border-white/10 mt-1 pt-1.5">
        <SummaryRow label="Estimated Total" value={`₹${total.toLocaleString()}`} bold />
      </div>
    </div>
  );
}

function ConfirmRow({ icon, label, value, bold }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-white/40 text-xs shrink-0">
        {icon}<span>{label}</span>
      </div>
      <span className={`text-xs text-right ${bold ? "text-white font-extrabold text-sm" : "text-white/70 font-semibold"}`}>
        {value}
      </span>
    </div>
  );
}