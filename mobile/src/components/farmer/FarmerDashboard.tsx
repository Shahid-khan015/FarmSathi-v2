import { useNavigate } from 'react-router';
import { Tractor, MapPin, AlertTriangle, FileText, Bell, TrendingUp } from 'lucide-react';

export function FarmerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl">Farmer Dashboard</h1>
          <button onClick={() => navigate('/notifications')} className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
          </button>
        </div>
        <p className="text-sm text-green-100">Welcome back, Rajesh Kumar</p>
      </div>

      {/* Active Work Section */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg">Active Work</h2>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Live</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <Tractor className="w-5 h-5 text-green-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Operator</p>
                <p>Suresh Patel</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-green-600 mr-3 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Field</p>
                <p>North Field (12.5 acres)</p>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Tractor</span>
                <span>Mahindra 575 DI</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Implement</span>
                <span>Rotavator 8ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Operation</span>
                <span>Soil Preparation</span>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Area Covered</span>
                <span>8.2 / 12.5 acres</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <button
              onClick={() => navigate('/farmer/map')}
              className="w-full bg-green-600 text-white py-3 rounded-lg mt-3"
            >
              View Live Map
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => navigate('/farmer/alerts')}
            className="bg-white p-4 rounded-lg shadow flex flex-col items-center relative"
          >
            <AlertTriangle className="w-8 h-8 text-orange-500 mb-2" />
            <span className="text-sm">Alerts</span>
            <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">2</span>
          </button>

          <button
            onClick={() => navigate('/farmer/reports')}
            className="bg-white p-4 rounded-lg shadow flex flex-col items-center"
          >
            <FileText className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm">Reports</span>
          </button>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg mb-3">Pending Approvals</h2>
          
          <div className="space-y-3">
            <div
              onClick={() => navigate('/farmer/approval/1')}
              className="border border-gray-200 rounded-lg p-3"
            >
              <div className="flex justify-between mb-2">
                <span>South Field</span>
                <span className="text-sm text-orange-600">Pending</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Completed: Feb 2, 2026</p>
                <p>Area: 10.5 acres</p>
              </div>
            </div>

            <div
              onClick={() => navigate('/farmer/approval/2')}
              className="border border-gray-200 rounded-lg p-3"
            >
              <div className="flex justify-between mb-2">
                <span>East Field</span>
                <span className="text-sm text-orange-600">Pending</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Completed: Feb 1, 2026</p>
                <p>Area: 8.2 acres</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Support */}
        <div className="mt-4">
          <button
            onClick={() => navigate('/decision-support')}
            className="w-full bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg flex items-center justify-center"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            <span>Tractor Recommendations</span>
          </button>
        </div>
      </div>
    </div>
  );
}
