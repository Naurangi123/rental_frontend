import { useState, useEffect } from 'react';
import { Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EvidenceViewer from './EvidenceViewer';
import DecisionPane from './DecisionPane';
import HumanReviewDashboard from './HumanReview';

export default function Profile() {
  const [user, setUser] = useState(null);
  const { getProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setError(null);
        const profile = await getProfile();
        if (isMounted) {
          setUser(profile);
        }
      } catch (err) {
        console.error('Failed to load profile', err);
        if (isMounted) {
          setError(err.response?.data?.message || 'Failed to load profile. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  console.log('User Profile:', user);

  const verificationChecks = [
    { label: 'Email Verified', status: user?.email_verified || false },
    { label: 'Phone Verified', status: user?.phone_verified || false },
    { label: 'ID Verified', status: user?.id_verified || false },
    { label: 'Payment Method', status: user?.payment_verified || false },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
            <div className="flex items-center space-x-4">
              <AlertCircle size={32} className="text-red-600" />
              <div>
                <h2 className="text-2xl font-bold text-red-700 mb-2">Error Loading Profile</h2>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No user data
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 text-center">
            <p className="text-yellow-700 text-lg">No profile data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border-t-4 border-pink-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full">
              <img
                src={user.latest_photo || 'https://i.pravatar.cc/300'}
                alt={user.name || 'User'}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-pink-500 shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.name || 'User'}</h1>
                  {user.is_verified && (
                    <CheckCircle size={28} className="text-green-500" />
                  )}
                </div>
                <p className="text-gray-600 mb-4">
                  Member since {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}
                </p>
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-pink-600">{user.rating || 0}</div>
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-pink-600">{user.reviews_count || 0}</div>
                    <div className="text-gray-600 text-sm">Reviews</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-pink-600">{user.rentals_count || 0}</div>
                    <div className="text-gray-600 text-sm">Rentals</div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/profile/edit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md font-medium text-center"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {['overview', 'verification', 'rentals', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-4 border-pink-500 text-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">About Me</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {user.bio || 'No bio added yet. Edit your profile to add a bio.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Email</h3>
                    <p className="text-gray-600 break-all">{user.email}</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Phone</h3>
                    <p className="text-gray-600">{user.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'verification' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Verification Status</h2>
                <div className="space-y-3">
                  {verificationChecks.map((check, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-pink-50 rounded-lg border border-pink-200 hover:border-pink-400 transition-colors duration-300"
                    >
                      <span className="font-medium text-gray-700">{check.label}</span>
                      {check.status ? (
                        <span className="flex items-center space-x-2 text-green-600">
                          <CheckCircle size={20} />
                          <span className="font-medium">Verified</span>
                        </span>
                      ) : (
                        <span className="text-orange-600 font-medium">Pending</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'rentals' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">My Rentals</h2>
                <p className="text-gray-600 text-lg">
                  You have <span className="font-bold text-pink-600">{user.rentals_count || 0}</span> active rentals.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">My Reviews</h2>
                <p className="text-gray-600 text-lg">
                  You have <span className="font-bold text-pink-600">{user.reviews_count || 0}</span> reviews from renters.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <EvidenceViewer />
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <DecisionPane />
        </div>
      </div>
    </div>
  );
}
