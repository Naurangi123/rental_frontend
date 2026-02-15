import { useState } from 'react';
import { Send, AlertTriangle } from 'lucide-react';

export default function ReportAbuse() {
  const [formData, setFormData] = useState({
    reportType: 'inappropriate-behavior',
    targetUser: '',
    targetEmail: '',
    description: '',
    evidence: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Abuse report submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        reportType: 'inappropriate-behavior',
        targetUser: '',
        targetEmail: '',
        description: '',
        evidence: ''
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-8">
            <AlertTriangle size={32} className="text-red-600" />
            <h1 className="text-3xl font-bold">Report Abuse</h1>
          </div>

          <p className="text-gray-600 mb-8">
            Help us maintain a safe community. If you've experienced or witnessed abusive behavior, fraud, or any policy violations, please report it here. Our team will review your report and take appropriate action.
          </p>

          {submitted && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-semibold">Thank you for your report!</p>
              <p className="text-green-600 text-sm mt-1">
                We've received your report and will investigate it promptly. You'll receive an email update within 24 hours.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type of Abuse *
              </label>
              <select
                name="reportType"
                value={formData.reportType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              >
                <option value="inappropriate-behavior">Inappropriate Behavior</option>
                <option value="fraud">Fraud or Scam</option>
                <option value="discrimination">Discrimination or Harassment</option>
                <option value="fake-profile">Fake Profile</option>
                <option value="dangerous-content">Dangerous or Illegal Content</option>
                <option value="payment-issue">Payment Issue</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Target User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  User Name or ID *
                </label>
                <input
                  type="text"
                  name="targetUser"
                  value={formData.targetUser}
                  onChange={handleInputChange}
                  placeholder="The user you're reporting"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  User Email (if known)
                </label>
                <input
                  type="email"
                  name="targetEmail"
                  value={formData.targetEmail}
                  onChange={handleInputChange}
                  placeholder="User's email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Please provide a detailed description of what happened, including dates and times if possible..."
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            {/* Evidence */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Evidence (messages, screenshots, links)
              </label>
              <textarea
                name="evidence"
                value={formData.evidence}
                onChange={handleInputChange}
                placeholder="Paste any relevant messages, links, or describe any evidence..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Privacy Notice:</strong> Your report will be kept confidential. We will not share your information with the reported user without your consent, unless required by law.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Send size={20} />
                <span>Submit Report</span>
              </button>
              <a
                href="/"
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </a>
            </div>
          </form>

          {/* Additional Resources */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Need Additional Help?</h3>
            <div className="space-y-3">
              <p>
                <a href="/contact" className="text-blue-600 hover:text-blue-700">
                  Contact our support team
                </a>
              </p>
              <p>
                <a href="/help" className="text-blue-600 hover:text-blue-700">
                  Check our FAQ and help center
                </a>
              </p>
              <p>
                If you're in immediate danger, please contact local authorities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
