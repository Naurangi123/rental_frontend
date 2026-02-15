/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Verification() {
  const [verificationSteps] = useState([
    {
      id: 1,
      title: 'Email Verification',
      description: 'Verify your email address',
      status: 'completed',
      completedDate: '2024-01-10'
    },
    {
      id: 2,
      title: 'Phone Verification',
      description: 'Verify your phone number via SMS',
      status: 'completed',
      completedDate: '2024-01-11'
    },
    {
      id: 3,
      title: 'Identity Verification',
      description: 'Submit a valid ID (passport, driver license, etc.)',
      status: 'in-progress',
      completedDate: null
    },
    {
      id: 4,
      title: 'Address Verification',
      description: 'Verify your residential address',
      status: 'pending',
      completedDate: null
    },
    {
      id: 5,
      title: 'Payment Method',
      description: 'Add and verify a payment method',
      status: 'pending',
      completedDate: null
    }
  ]);

  const completionPercentage = (verificationSteps.filter(s => s.status === 'completed').length / verificationSteps.length) * 100;

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="text-green-500" size={24} />;
    if (status === 'in-progress') return <Clock className="text-yellow-500" size={24} />;
    return <AlertCircle className="text-gray-400" size={24} />;
  };

  const getStatusColor = (status) => {
    if (status === 'completed') return 'bg-green-50 border-green-200';
    if (status === 'in-progress') return 'bg-yellow-50 border-yellow-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6">Verification Tracker</h1>
          <p className="text-gray-600 mb-6">
            Complete verification steps to unlock full access to RentKano features.
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Overall Progress</span>
              <span className="text-lg font-bold text-blue-600">{Math.round(completionPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {verificationSteps.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {verificationSteps.filter(s => s.status === 'in-progress').length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-600">
                {verificationSteps.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        {/* Verification Steps */}
        <div className="space-y-4">
          {verificationSteps.map((step, index=0) => (
            <div
              key={step.id}
              className={`border-2 rounded-lg p-6 ${getStatusColor(step.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="mt-1">{getStatusIcon(step.status)}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                    {step.status === 'completed' && step.completedDate && (
                      <p className="text-green-600 text-sm mt-2">✓ Completed on {step.completedDate}</p>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  {step.status === 'pending' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Start
                    </button>
                  )}
                  {step.status === 'in-progress' && (
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                      Continue
                    </button>
                  )}
                  {step.status === 'completed' && (
                    <span className="text-green-600 font-semibold">Done</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6">Verification Benefits</h2>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <CheckCircle size={20} className="text-green-600" />
              <span>Access to premium rental listings</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle size={20} className="text-green-600" />
              <span>Increased trust score with landlords</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle size={20} className="text-green-600" />
              <span>Priority support from our team</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle size={20} className="text-green-600" />
              <span>Enhanced security and fraud protection</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
