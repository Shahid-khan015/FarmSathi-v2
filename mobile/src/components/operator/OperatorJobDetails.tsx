import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, MapPin, Calendar, Tractor, Wrench, User, Play } from 'lucide-react';

export function OperatorJobDetails() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  // Mock data
  const jobData = {
    id: jobId,
    field: 'East Field',
    farmer: 'Mohan Lal',
    farmerPhone: '+91 9876543210',
    operation: 'Plowing',
    area: '8.0 acres',
    tractor: 'John Deere 5310',
    tractorReg: 'MH-12-CD-5678',
    implement: 'Disc Plow 3ft',
    implementReg: 'IMP-456',
    scheduledDate: 'Feb 3, 2026',
    scheduledTime: '2:00 PM',
    estimatedDuration: '3-4 hours',
    wageRate: '₹500/acre',
    estimatedWage: '₹4,000',
    instructions: 'Plow at 6-8 inch depth. Avoid wet patches in northeast corner.'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/operator/dashboard')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Job Details</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Job Information */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg mb-3">Job Information</h2>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Field</p>
                <p>{jobData.field}</p>
                <p className="text-sm text-gray-600 mt-1">Operation: {jobData.operation}</p>
                <p className="text-sm">Area: {jobData.area}</p>
              </div>
            </div>

            <div className="flex items-start">
              <User className="w-5 h-5 text-blue-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Farmer</p>
                <p>{jobData.farmer}</p>
                <p className="text-sm text-gray-600">{jobData.farmerPhone}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-blue-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Scheduled</p>
                <p>{jobData.scheduledDate} at {jobData.scheduledTime}</p>
                <p className="text-sm text-gray-600">Est. Duration: {jobData.estimatedDuration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Details */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg mb-3">Assigned Equipment</h2>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <Tractor className="w-5 h-5 text-blue-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Tractor</p>
                <p>{jobData.tractor}</p>
                <p className="text-sm text-gray-600">{jobData.tractorReg}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Wrench className="w-5 h-5 text-blue-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Implement</p>
                <p>{jobData.implement}</p>
                <p className="text-sm text-gray-600">{jobData.implementReg}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wage Information */}
        <div className="bg-green-50 rounded-lg p-4 shadow">
          <h2 className="text-lg mb-3">Wage Information</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Rate</span>
            <span>{jobData.wageRate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Estimated Wage</span>
            <span className="text-xl text-green-700">{jobData.estimatedWage}</span>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h2 className="text-lg mb-2">Special Instructions</h2>
          <p className="text-sm text-gray-700">{jobData.instructions}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate(`/operator/work/${jobData.id}`)}
          className="w-full bg-blue-600 text-white py-4 rounded-lg flex items-center justify-center"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Job
        </button>
      </div>
    </div>
  );
}