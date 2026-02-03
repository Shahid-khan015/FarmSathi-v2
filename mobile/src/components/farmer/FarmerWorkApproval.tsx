import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, MapPin, Clock, Tractor, Wrench, User, Check, X } from 'lucide-react';

export function FarmerWorkApproval() {
  const navigate = useNavigate();
  const { workId } = useParams();
  const [showDispute, setShowDispute] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  // Mock data
  const workData = {
    id: workId,
    field: 'South Field',
    operation: 'Soil Preparation',
    date: 'Feb 2, 2026',
    startTime: '08:30 AM',
    endTime: '01:00 PM',
    areaWorked: '10.5 acres',
    approvedArea: '10.0 acres',
    timeSpent: '4h 30m',
    tractor: 'Mahindra 575 DI',
    tractorReg: 'MH-12-AB-1234',
    implement: 'Rotavator 8ft',
    operator: 'Ramesh Singh',
    operatorPhone: '+91 9876543210',
    fuelConsumed: '42 liters',
    avgSpeed: '4.2 km/h',
    wages: '₹5,250'
  };

  const handleApprove = () => {
    // Mock approval
    navigate('/farmer/reports');
  };

  const handleDispute = () => {
    // Mock dispute submission
    navigate('/farmer/reports');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/farmer/reports')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Work Approval</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Work Summary */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg mb-3">Work Details</h2>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-green-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Field</p>
                <p>{workData.field}</p>
                <p className="text-sm text-gray-600 mt-1">{workData.operation}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="w-5 h-5 text-green-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Date & Time</p>
                <p>{workData.date}</p>
                <p className="text-sm">{workData.startTime} - {workData.endTime}</p>
                <p className="text-sm text-gray-600">Duration: {workData.timeSpent}</p>
              </div>
            </div>

            <div className="flex items-start">
              <User className="w-5 h-5 text-green-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Operator</p>
                <p>{workData.operator}</p>
                <p className="text-sm text-gray-600">{workData.operatorPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Details */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg mb-3">Equipment Used</h2>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <Tractor className="w-5 h-5 text-green-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Tractor</p>
                <p>{workData.tractor}</p>
                <p className="text-sm text-gray-600">{workData.tractorReg}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Wrench className="w-5 h-5 text-green-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Implement</p>
                <p>{workData.implement}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Metrics */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg mb-3">Work Metrics</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Approved Area</p>
              <p className="text-lg">{workData.approvedArea}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Area Worked</p>
              <p className="text-lg">{workData.areaWorked}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fuel Consumed</p>
              <p>{workData.fuelConsumed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Speed</p>
              <p>{workData.avgSpeed}</p>
            </div>
          </div>

          {parseFloat(workData.areaWorked) > parseFloat(workData.approvedArea) && (
            <div className="mt-3 bg-orange-50 border border-orange-200 text-orange-700 p-3 rounded-lg text-sm">
              <p>⚠️ Worked area exceeds approved area by {
                (parseFloat(workData.areaWorked) - parseFloat(workData.approvedArea)).toFixed(1)
              } acres</p>
            </div>
          )}
        </div>

        {/* Wages */}
        <div className="bg-green-50 rounded-lg p-4 shadow">
          <div className="flex justify-between items-center">
            <span className="text-lg">Calculated Wages</span>
            <span className="text-2xl font-medium text-green-700">{workData.wages}</span>
          </div>
        </div>

        {/* Dispute Form */}
        {showDispute && (
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg mb-3">Raise Dispute</h2>
            <textarea
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder="Describe the issue with this work..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg"
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleDispute}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg"
              >
                Submit Dispute
              </button>
              <button
                onClick={() => setShowDispute(false)}
                className="flex-1 border border-gray-300 py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!showDispute && (
          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg flex items-center justify-center"
            >
              <Check className="w-5 h-5 mr-2" />
              Approve Work
            </button>
            <button
              onClick={() => setShowDispute(true)}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg flex items-center justify-center"
            >
              <X className="w-5 h-5 mr-2" />
              Raise Dispute
            </button>
          </div>
        )}
      </div>
    </div>
  );
}