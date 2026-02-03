import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Activity, Calendar, TrendingUp } from 'lucide-react';

export function OwnerTelemetry() {
  const navigate = useNavigate();
  const { machineId } = useParams();
  const [viewMode, setViewMode] = useState<'realtime' | 'historical'>('realtime');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/owner/dashboard')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Telemetry Monitoring</h1>
      </div>

      {/* Mode Toggle */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setViewMode('realtime')}
            className={`flex-1 py-3 ${
              viewMode === 'realtime'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Real-time
          </button>
          <button
            onClick={() => setViewMode('historical')}
            className={`flex-1 py-3 ${
              viewMode === 'historical'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Historical
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Machine Info */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-sm text-gray-600 mb-1">Machine</h3>
          <p className="text-lg">Mahindra 575 DI</p>
          <p className="text-sm text-gray-600">MH-12-AB-1234</p>
        </div>

        {viewMode === 'realtime' && (
          <>
            {/* Real-time Telemetry */}
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg">Current Status</h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Live</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Engine</p>
                  <p className="text-xl text-green-600">ON</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">PTO</p>
                  <p className="text-xl text-blue-600">ON</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fuel Level</p>
                  <p className="text-xl">68%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-xl">82°C</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vibration</p>
                  <p className="text-xl">8.5 Hz</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Speed</p>
                  <p className="text-xl">4.5 km/h</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-lg mb-3">Performance</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Area Covered Today</span>
                    <span>8.2 acres</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Working Hours Today</span>
                    <span>2h 45m</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Fuel Consumed Today</span>
                    <span>18 liters</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {viewMode === 'historical' && (
          <>
            {/* Historical Data */}
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center mb-3">
                <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg">Select Date Range</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">From Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">To Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
                  Load Data
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center mb-3">
                <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg">Historical Summary</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Total Operating Hours</span>
                  <span>156 hrs</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Total Area Covered</span>
                  <span>425 acres</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Total Fuel Consumed</span>
                  <span>832 liters</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Avg. Fuel Efficiency</span>
                  <span>5.3 L/hr</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Avg. Engine Temp</span>
                  <span>79°C</span>
                </div>
              </div>
            </div>

            {/* Daily Breakdown */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-lg mb-3">Daily Breakdown</h3>
              
              <div className="space-y-2">
                {['Feb 3, 2026', 'Feb 2, 2026', 'Feb 1, 2026'].map((date) => (
                  <div key={date} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{date}</span>
                      <span className="text-sm text-gray-600">8.5 hrs</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">Area: 12.5 acres</div>
                      <div className="text-gray-600">Fuel: 42 L</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
