import { useNavigate } from 'react-router';
import { Bell, Briefcase, DollarSign, Clock } from 'lucide-react';

export function OperatorDashboard() {
  const navigate = useNavigate();

  const jobs = [
    {
      id: 1,
      field: 'North Field - Rajesh Kumar',
      operation: 'Soil Preparation',
      area: '12.5 acres',
      tractor: 'Mahindra 575 DI',
      implement: 'Rotavator 8ft',
      status: 'active',
      startTime: '08:30 AM'
    },
    {
      id: 2,
      field: 'East Field - Mohan Lal',
      operation: 'Plowing',
      area: '8.0 acres',
      tractor: 'John Deere 5310',
      implement: 'Disc Plow 3ft',
      status: 'assigned',
      scheduledTime: 'Today, 2:00 PM'
    },
    {
      id: 3,
      field: 'West Field - Suresh Yadav',
      operation: 'Seeding',
      area: '15.0 acres',
      tractor: 'Swaraj 855',
      implement: 'Seed Drill 9ft',
      status: 'assigned',
      scheduledTime: 'Tomorrow, 9:00 AM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl">Operator Dashboard</h1>
          <button onClick={() => navigate('/notifications')} className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">2</span>
          </button>
        </div>
        <p className="text-sm text-blue-100">Welcome, Suresh Patel</p>
      </div>

      <div className="p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center mb-2">
              <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">Active Jobs</span>
            </div>
            <p className="text-2xl">1</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center mb-2">
              <DollarSign className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm text-gray-600">Today's Earnings</span>
            </div>
            <p className="text-2xl">₹3,500</p>
          </div>
        </div>

        {/* Active Job */}
        <div className="mb-4">
          <h2 className="text-lg mb-3">Active Job</h2>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg mb-1">{jobs[0].field}</h3>
                <p className="text-sm text-blue-100">{jobs[0].operation}</p>
              </div>
              <span className="bg-green-400 text-white px-3 py-1 rounded-full text-xs">Live</span>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-blue-100">Area</span>
                <span>{jobs[0].area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Tractor</span>
                <span>{jobs[0].tractor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Implement</span>
                <span>{jobs[0].implement}</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Clock className="w-4 h-4 mr-2" />
                <span>Started at {jobs[0].startTime}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate(`/operator/work/${jobs[0].id}`)}
                className="bg-white text-blue-600 py-2 rounded-lg"
              >
                View Controls
              </button>
              <button
                onClick={() => navigate('/operator/telemetry')}
                className="bg-blue-700 text-white py-2 rounded-lg"
              >
                Telemetry
              </button>
            </div>
          </div>
        </div>

        {/* Assigned Jobs */}
        <div>
          <h2 className="text-lg mb-3">Assigned Jobs</h2>
          <div className="space-y-3">
            {jobs.slice(1).map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/operator/job/${job.id}`)}
                className="bg-white rounded-lg p-4 shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{job.field}</h3>
                    <p className="text-sm text-gray-600">{job.operation}</p>
                  </div>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
                    Scheduled
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-gray-600">Area</p>
                    <p>{job.area}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time</p>
                    <p>{job.scheduledTime}</p>
                  </div>
                </div>

                <div className="border-t pt-2 space-y-1 text-sm text-gray-600">
                  <p>Tractor: {job.tractor}</p>
                  <p>Implement: {job.implement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/operator/earnings')}
            className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg"
          >
            <DollarSign className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm">Earnings</span>
          </button>
          <button
            onClick={() => navigate('/operator/thresholds')}
            className="bg-orange-50 border border-orange-200 text-orange-700 p-4 rounded-lg"
          >
            <Briefcase className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm">Thresholds</span>
          </button>
        </div>
      </div>
    </div>
  );
}
