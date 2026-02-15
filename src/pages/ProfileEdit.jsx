import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Upload, ArrowLeft, AlertCircle } from "lucide-react";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { user, updateProfile, uploadAvatar, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    photos: [],
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        photos: user.photos || [],
      });
      if (user.photos?.length) {
        setPhotoPreview(user.photos[user.photos.length - 1]);
      } else {
        setPhotoPreview("https://i.pravatar.cc/300");
      }
    }
  }, [user]);

  console.log("bio", formData.bio);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     setError(null);
  //     setSuccess(false);

  //     try {
  //       // Upload avatar if changed
  //       if (photoFile) {
  //         const photoFormData = new FormData();
  //         photoFormData.append('photos', photoFile);
  //         await uploadAvatar(photoFormData);
  //       }

  //       // Update profile data
  //       await updateProfile(user.id, formData);
  //       setSuccess(true);
  //       setTimeout(() => {
  //         navigate('/profile');
  //       }, 2000);
  //     } catch (err) {
  //       console.error('Error updating profile:', err);
  //       setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Upload photo
      if (photoFile) {
        const photoFormData = new FormData();
        photoFormData.append("photos", photoFile);

        const res = await uploadAvatar(photoFormData);

        // ✅ Update local state with returned array
        if (res?.photos) {
          setFormData((prev) => ({
            ...prev,
            photos: res.photos,
          }));
        }
      }

      // Update other profile fields (excluding photos)
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
      });

      setSuccess(true);
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 text-center">
            <p className="text-yellow-700 text-lg mb-4">
              Please log in to edit your profile
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/profile"
            className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Profile</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              ✓ Profile updated successfully! Redirecting...
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center space-x-3">
            <AlertCircle size={24} className="text-red-600" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Profile Photo
              </label>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <img
                  src={user.latest_photo || photoPreview || "https://i.pravatar.cc/300"}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-pink-500"
                />
                <label className="flex-1">
                  <input
                    name="photos"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <div className="flex items-center space-x-2 px-4 py-3 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer border-2 border-dashed border-pink-300">
                    <Upload size={20} />
                    <span>Change Photo</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                placeholder="Enter your email"
                disabled
              />
              <p className="text-sm text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                type="text"
                value={formData.bio}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all resize-none"
                placeholder="Tell us about yourself..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <Link
                to="/profile"
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 font-medium text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
