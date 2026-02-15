import React, { useState } from 'react';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Play, Pause, Download, AlertCircle, CheckCircle, XCircle, Upload, MapPin, Clock, User, Shield, FileText, MessageSquare } from 'lucide-react';

const HumanReviewDashboard = () => {
  const [currentEvidence, setCurrentEvidence] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [verdict, setVerdict] = useState('');
  const [notes, setNotes] = useState('');
  const [refundPercent, setRefundPercent] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const mockCase = {
    id: 'VER-a7f3e4b2-9c8d-4e1a-b5f6-2d3c4e5f6a7b',
    priority: 'High',
    user: {
      name: 'Rahul Sharma',
      publicName: 'Rahul S.',
      age: 28,
      dob: '1996-03-15',
      phone: '****8765',
      role: 'provider',
      badges: ['verified_email', 'phone_verified'],
      lastActive: '2 hours ago',
      accountCreated: '2024-11-15',
      totalBookings: 12,
      completionRate: 95
    },
    verification: {
      type: 'id',
      provider: 'Onfido',
      score: 72,
      status: 'human_review',
      submittedAt: '2025-01-18 14:30 UTC'
    },
    evidence: [
      { type: 'id_front', label: 'ID Front', format: 'image', url: '/api/evidence/1' },
      { type: 'id_back', label: 'ID Back', format: 'image', url: '/api/evidence/2' },
      { type: 'selfie', label: 'Selfie', format: 'image', url: '/api/evidence/3' },
      { type: 'liveness', label: 'Liveness Video', format: 'video', duration: '5s', url: '/api/evidence/4' },
      { type: 'booking_meta', label: 'Booking Metadata', format: 'json' },
      { type: 'geo', label: 'Geo Check', format: 'map' }
    ],
    vendorData: {
      faceMatch: 0.89,
      documentQuality: 0.82,
      livenessScore: 0.76,
      ocrConfidence: 0.91,
      flags: ['slight_glare', 'low_light_selfie']
    },
    timeline: [
      { date: '2024-11-15', event: 'Account Created', icon: 'user' },
      { date: '2024-11-15', event: 'Email Verified', icon: 'check' },
      { date: '2024-11-16', event: 'First ID Upload (Auto-Rejected)', icon: 'x' },
      { date: '2025-01-18', event: 'Second ID Upload (Current)', icon: 'clock' },
      { date: '2025-01-18', event: 'Escalated to Human Review', icon: 'alert' }
    ]
  };

  const reasons = [
    'Document quality issues',
    'Face match discrepancy',
    'Liveness check failed',
    'Underage verification',
    'Fraudulent document detected',
    'Inconsistent information',
    'Other (see notes)'
  ];

  const handleZoomIn = () => setZoomLevel(Math.min(zoomLevel + 25, 200));
  const handleZoomOut = () => setZoomLevel(Math.max(zoomLevel - 25, 50));
  
  const handlePrevEvidence = () => {
    setCurrentEvidence((prev) => (prev > 0 ? prev - 1 : mockCase.evidence.length - 1));
  };
  
  const handleNextEvidence = () => {
    setCurrentEvidence((prev) => (prev < mockCase.evidence.length - 1 ? prev + 1 : 0));
  };

  const canSubmit = verdict && notes.trim().length > 0;

  const handleSubmit = (action) => {
    if (!canSubmit && action !== 'request_info') {
      alert('Please select a verdict and provide notes before submitting.');
      return;
    }
    
    const decision = {
      verdict,
      reason: selectedReason,
      notes,
      refundPercent: verdict === 'Reject' ? refundPercent : 0,
      action,
      timestamp: new Date().toISOString()
    };
    
    console.log('Decision submitted:', decision);
    alert(`Decision ${action} submitted successfully!`);
  };

  const renderEvidenceViewer = () => {
    const evidence = mockCase.evidence[currentEvidence];
    
    if (evidence.format === 'image') {
      return (
        <div className="relative bg-gray-900 rounded-lg overflow-hidden h-96 flex items-center justify-center">
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button onClick={handleZoomOut} className="p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white">
              <ZoomOut size={20} />
            </button>
            <button onClick={handleZoomIn} className="p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white">
              <ZoomIn size={20} />
            </button>
          </div>
          <div 
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold"
            style={{ 
              width: `${zoomLevel}%`, 
              height: `${zoomLevel}%`,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            {evidence.label}
          </div>
          {evidence.type === 'selfie' && (
            <div className="absolute bottom-4 left-4 bg-green-500/90 px-3 py-1 rounded-full text-white text-sm font-medium">
              Face Match: {(mockCase.vendorData.faceMatch * 100).toFixed(0)}%
            </div>
          )}
        </div>
      );
    }
    
    if (evidence.format === 'video') {
      return (
        <div className="relative bg-gray-900 rounded-lg overflow-hidden h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-64 h-48 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Play size={64} className="text-white" />
            </div>
            <button 
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 mx-auto"
            >
              {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isVideoPlaying ? 'Pause' : 'Play'} Video ({evidence.duration})
            </button>
            <div className="mt-4 text-sm text-gray-400">
              Liveness Score: {(mockCase.vendorData.livenessScore * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      );
    }
    
    if (evidence.format === 'json') {
      return (
        <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto">
          <pre className="text-green-400 text-xs font-mono">
{`{
  "booking_id": "BK-123456",
  "start_time": "2025-01-20 10:00 UTC",
  "end_time": "2025-01-20 14:00 UTC",
  "location": "Connaught Place, Delhi",
  "service_type": "Photography Session",
  "amount_cents": 250000,
  "currency": "INR"
}`}
          </pre>
        </div>
      );
    }
    
    if (evidence.format === 'map') {
      return (
        <div className="bg-gray-900 rounded-lg h-96 flex items-center justify-center relative">
          <div className="w-full h-full bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin size={64} className="mx-auto mb-4" />
              <div className="text-lg font-semibold">Delhi, India</div>
              <div className="text-sm opacity-80">Check-in Distance: 0.3 km</div>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-green-500/90 px-3 py-1 rounded-full text-white text-sm">
            Location Verified ✓
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Case Review</h1>
            <span className="text-sm text-gray-500">ID: {mockCase.id}</span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              {mockCase.priority} Priority
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Assign to...
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800">
              View Full Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 p-6">
        {/* Left Sidebar - User Summary */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {mockCase.user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{mockCase.user.name}</h3>
                <p className="text-sm text-gray-500">{mockCase.user.publicName}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <User size={16} className="text-gray-400" />
                <span className="text-gray-600">Age: {mockCase.user.age} ({mockCase.user.dob})</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare size={16} className="text-gray-400" />
                <span className="text-gray-600">Phone: {mockCase.user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield size={16} className="text-gray-400" />
                <span className="text-gray-600">Role: {mockCase.user.role}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-400" />
                <span className="text-gray-600">Last active: {mockCase.user.lastActive}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {mockCase.user.badges.map((badge, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  {badge.replace('_', ' ')}
                </span>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-medium">{mockCase.user.totalBookings}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-medium text-green-600">{mockCase.user.completionRate}%</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="border-t border-gray-200 mt-6 pt-4">
              <h4 className="font-semibold text-sm text-gray-900 mb-3">Timeline</h4>
              <div className="space-y-3">
                {mockCase.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {item.icon === 'user' && <User size={14} className="text-gray-600" />}
                      {item.icon === 'check' && <CheckCircle size={14} className="text-green-600" />}
                      {item.icon === 'x' && <XCircle size={14} className="text-red-600" />}
                      {item.icon === 'clock' && <Clock size={14} className="text-blue-600" />}
                      {item.icon === 'alert' && <AlertCircle size={14} className="text-orange-600" />}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{item.date}</p>
                      <p className="text-sm text-gray-900">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center - Evidence Viewer */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Evidence Viewer ({currentEvidence + 1}/{mockCase.evidence.length})
              </h3>
              <div className="flex items-center gap-2">
                <button onClick={handlePrevEvidence} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-gray-600 min-w-32 text-center">
                  {mockCase.evidence[currentEvidence].label}
                </span>
                <button onClick={handleNextEvidence} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {renderEvidenceViewer()}

            {/* Evidence Navigation */}
            <div className="grid grid-cols-6 gap-2 mt-4">
              {mockCase.evidence.map((ev, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentEvidence(idx)}
                  className={`p-3 rounded-lg text-xs font-medium transition-colors ${
                    currentEvidence === idx
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {ev.label}
                </button>
              ))}
            </div>

            {/* Vendor Analysis */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm text-gray-900 mb-3">Vendor Analysis ({mockCase.verification.provider})</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Face Match</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500"
                        style={{ width: `${mockCase.vendorData.faceMatch * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{(mockCase.vendorData.faceMatch * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Document Quality</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${mockCase.vendorData.documentQuality * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{(mockCase.vendorData.documentQuality * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Liveness Score</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500"
                        style={{ width: `${mockCase.vendorData.livenessScore * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{(mockCase.vendorData.livenessScore * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">OCR Confidence</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500"
                        style={{ width: `${mockCase.vendorData.ocrConfidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{(mockCase.vendorData.ocrConfidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
              {mockCase.vendorData.flags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {mockCase.vendorData.flags.map((flag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                      ⚠ {flag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Decision Pane */}
        <div className="w-96 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">Decision</h3>

            {/* Verdict */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Verdict *</label>
              <div className="space-y-2">
                {['Verified', 'Reject', 'Escalate'].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="verdict"
                      value={option}
                      checked={verdict === option}
                      onChange={(e) => setVerdict(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      {option === 'Verified' && <CheckCircle size={18} className="text-green-600" />}
                      {option === 'Reject' && <XCircle size={18} className="text-red-600" />}
                      {option === 'Escalate' && <AlertCircle size={18} className="text-orange-600" />}
                      <span className="text-sm font-medium">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Reason Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a reason...</option>
                {reasons.map((reason, idx) => (
                  <option key={idx} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            {/* Refund Percentage */}
            {verdict === 'Reject' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refund Percentage: {refundPercent}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={refundPercent}
                  onChange={(e) => setRefundPercent(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes * (Required)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Provide detailed reasoning for your decision..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">{notes.length} characters</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleSubmit('approve')}
                disabled={!canSubmit || verdict !== 'Verified'}
                className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium text-sm transition-colors"
              >
                <CheckCircle size={18} className="inline mr-2" />
                Approve Verification
              </button>
              <button
                onClick={() => handleSubmit('reject')}
                disabled={!canSubmit || verdict !== 'Reject'}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium text-sm transition-colors"
              >
                <XCircle size={18} className="inline mr-2" />
                Reject Verification
              </button>
              <button
                onClick={() => handleSubmit('request_info')}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                <MessageSquare size={18} className="inline mr-2" />
                Request More Info
              </button>
              <button
                onClick={() => handleSubmit('escalate')}
                disabled={!canSubmit || verdict !== 'Escalate'}
                className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium text-sm transition-colors"
              >
                <Upload size={18} className="inline mr-2" />
                Escalate to Legal
              </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <AlertCircle size={14} className="inline mr-1" />
                All decisions are logged and auditable. Ensure thorough review before submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanReviewDashboard;