import { Link } from 'react-router-dom';
import { Search, Home, Shield, Users, TrendingUp, MapPin, CheckCircle, AlertTriangle, Heart } from 'lucide-react';
import HumanReviewDashboard from './HumanReview';

import velora from '../assets/velora.png';

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-white py-12 sm:py-16 lg:py-20" style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">Find Your Perfect Match</h1>
              <p className="text-lg sm:text-xl mb-6 lg:mb-8 text-pink-100">
                Connect with trusted friends. Browse, compare, and talk with confidence in a safe, respectful community.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <Link
                  to="/rentals"
                  className="px-6 sm:px-8 py-3 bg-white text-pink-600 rounded-lg font-bold hover:bg-gray-100 transition-colors text-center"
                >
                  Find Friends
                </Link>
                <Link
                  to="/register"
                  className="px-6 sm:px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-pink-700 transition-colors text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8 h-64 sm:h-80 lg:h-96 lg:mt-0">
              <img src={velora} alt="Velora Logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-pink-700">What We Do</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-lg sm:text-xl text-gray-700 mb-6">
                Velora is a premium rental platform connecting verified user worldwide. We facilitate safe, consensual arrangements with a focus on trust, respect, and community. Whether you're seeking a temporary friends or offering one, our platform ensures secure connections tailored to your needs.
              </p>
              <p className="text-base sm:text-lg text-gray-600">
                Designed for Indian and international users, we embrace cultural diversity, promote safety, and uphold ethical standards. Join a growing network of respectful individuals committed to positive experiences.
              </p>
            </div>
            <div className="bg-pink-50 rounded-lg p-6 sm:p-8">
              <Heart size={48} className="text-pink-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-pink-700 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To create a safe, inclusive space where people can connect authentically, respecting boundaries and fostering meaningful relationships in the borrowed space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where We're Available Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-pink-700">Where We're Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <MapPin size={48} className="text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">India</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Serving major cities like Mumbai, Delhi, Bangalore, Chennai, and more. We understand Indian culture and ensure respectful, safe interactions.
              </p>
            </div>
            <div className="text-center">
              <MapPin size={48} className="text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Asia-Pacific</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Expanding to Japan, Singapore, South Korea, and Australia. Connect with a diverse, international community.
              </p>
            </div>
            <div className="text-center">
              <MapPin size={48} className="text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Accessible worldwide with plans for Europe and North America. Join users from over 50 countries in a secure platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-pink-700">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-pink-600 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">1. Register & Verify</h3>
              <p className="text-gray-600 text-sm sm:text-base">Create your profile, verify your email, and agree to our policies for a safe start.</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-pink-600 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">2. Browse & Connect</h3>
              <p className="text-gray-600 text-sm sm:text-base">Search listings, view profiles, and connect with verified users who match your preferences.</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-pink-600 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">3. Arrange Safely</h3>
              <p className="text-gray-600 text-sm sm:text-base">Discuss terms, ensure mutual consent, and proceed with confidence in our secure environment.</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-pink-600 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">4. Enjoy & Review</h3>
              <p className="text-gray-600 text-sm sm:text-base">Complete your rental, leave feedback, and help build a trustworthy community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-pink-700">Who Can Join Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pink-600">For Renters</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Adults 18+ from India and internationally</li>
                <li>• Respectful individuals seeking safe, consensual arrangements</li>
                <li>• Those valuing privacy, trust, and cultural sensitivity</li>
                <li>• Users committed to ethical practices and community guidelines</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pink-600">For Providers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Verified homeowners or hosts offering rental spaces</li>
                <li>• Professionals ensuring safety and respect for all parties</li>
                <li>• Individuals promoting positive, inclusive experiences</li>
                <li>• Those adhering to legal and platform standards</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-8 text-sm sm:text-base">
            We welcome diverse users from all backgrounds, with a special focus on creating a safe space for women and marginalized communities.
          </p>
        </div>
      </section>

      {/* Policies, Rules & Regulations Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-pink-700">Policies, Rules & Regulations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-pink-600">Key Policies</h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                <li>• <strong>Consent First:</strong> All interactions must be mutual and consensual.</li>
                <li>• <strong>Verification Required:</strong> Email and identity verification for all users.</li>
                <li>• <strong>Safety Priority:</strong> Report any suspicious activity immediately.</li>
                <li>• <strong>Respect Boundaries:</strong> Honor personal space and cultural differences.</li>
                <li>• <strong>No Discrimination:</strong> Inclusive platform for all genders, orientations, and backgrounds.</li>
              </ul>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-pink-600">Rules & Regulations</h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                <li>• <strong>Age Restriction:</strong> Users must be 18+ as per legal requirements.</li>
                <li>• <strong>Legal Compliance:</strong> Adhere to local laws in India and international jurisdictions.</li>
                <li>• <strong>Prohibited Activities:</strong> No harassment, exploitation, or illegal arrangements.</li>
                <li>• <strong>Content Standards:</strong> Respectful communication and appropriate profile content.</li>
                <li>• <strong>Accountability:</strong> Violations may result in suspension or permanent ban.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warnings Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-red-700">Important Warnings</h2>
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <AlertTriangle size={24} className="text-red-500 mr-4 mt-1" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-red-600 mb-2">Stay Safe & Legal</h3>
                <p className="text-gray-700 text-sm sm:text-base mb-4">
                  Velora is committed to safety and legality. Any activities that violate laws, including but not limited to human trafficking, exploitation, or non-consensual arrangements, are strictly prohibited and will be reported to authorities.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li>• Do not engage in illegal activities; this includes any form of coercion or fraud.</li>
                  <li>• Respect all users' rights and privacy; harassment or abuse will not be tolerated.</li>
                  <li>• For Indian users: Comply with Indian laws on personal relationships and rentals.</li>
                  <li>• International users: Adhere to your local regulations and our global standards.</li>
                  <li>• If you feel unsafe, contact local authorities or our support team immediately.</li>
                  <li>• We monitor activities to ensure a safe environment; suspicious behavior may lead to account review.</li>
                </ul>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm sm:text-base mt-6">
              By joining, you agree to uphold these standards. Let's build a positive, respectful community together.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16">Why Choose Velora?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-pink-600 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600 text-sm sm:text-base">Find rentals that match your needs with advanced filters.</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-pink-600 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Verified Users</h3>
              <p className="text-gray-600 text-sm sm:text-base">All users are verified for your safety and security.</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-pink-600 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600 text-sm sm:text-base">Join a trusted community of renters and homeowners.</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={24} className="text-pink-600 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Growing Network</h3>
              <p className="text-gray-600 text-sm sm:text-base">Access thousands of listings and connect with others.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Ready to Get Started?</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 lg:mb-8">
            Join thousands of satisfied renters and homeowners today.
          </p>
          <Link
            to="/register"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>

  );
}
