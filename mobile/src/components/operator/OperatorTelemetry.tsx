import { useNavigate } from 'react-router';
import { ArrowLeft, Activity, Fuel, Thermometer, Zap, Settings, AlertTriangle } from 'lucide-react';

export function OperatorTelemetry() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate('/operator/dashboard')} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Telemetry</h1>
        </div>
        <button onClick={() => navigate('/operator/thresholds')}>
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Real-time Status */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 shadow">
          <div className="flex items-center mb-2">
            <Activity className="w-5 h-5 mr-2" />
            <h2 className="text-lg">Live Monitoring</h2>
          </div>
          <p className="text-sm text-blue-100">Mahindra 575 DI - MH-12-AB-1234</p>
        </div>

        {/* Area Covered */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-sm text-gray-600 mb-2">Area Covered</h3>
          <p className="text-3xl mb-2">8.2 acres</p>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Target: 12.5 acres</span>
            <span>65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* Engine Status */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-green-600 mr-2" />
              <h3>Engine Status</h3>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">ON</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">RPM</p>
              <p className="text-xl">1,850</p>
            </div>
            <div>
              <p className="text-gray-600">Hours Run</p>
              <p className="text-xl">2,345</p>
            </div>
          </div>
        </div>

        {/* PTO Status */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Settings className="w-5 h-5 text-blue-600 mr-2" />
              <h3>PTO Status</h3>
            </div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">ON</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">PTO Speed</p>
              <p className="text-xl">540 RPM</p>
            </div>
            <div>
              <p className="text-gray-600">Load</p>
              <p className="text-xl">78%</p>
            </div>
          </div>
        </div>

        {/* Fuel Level */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center mb-3">
            <Fuel className="w-5 h-5 text-orange-600 mr-2" />
            <h3>Fuel Level</h3>
          </div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-3xl">68%</span>
            <span className="text-sm text-gray-600">34 liters remaining</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-orange-500 h-3 rounded-full" style={{ width: '68%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Consumption: 3.2 L/hr</p>
        </div>

        {/* Temperature */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center mb-3">
            <Thermometer className="w-5 h-5 text-red-600 mr-2" />
            <h3>Temperature</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Engine Temp</p>
              <p className="text-2xl">82°C</p>
              <p className="text-xs text-green-600">Normal</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Oil Temp</p>
              <p className="text-2xl">78°C</p>
              <p className="text-xs text-green-600">Normal</p>
            </div>
          </div>
        </div>

        {/* Vibration */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-purple-600 mr-2" />
              <h3>Vibration Level</h3>
            </div>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />
              High
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Current</p>
              <p className="text-2xl">8.5 Hz</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Threshold</p>
              <p className="text-2xl">7.0 Hz</p>
            </div>
          </div>
          <div className="mt-3 bg-yellow-50 border border-yellow-200 text-yellow-700 p-2 rounded text-sm">
            ⚠️ Vibration exceeds threshold. Check implement attachment.
          </div>
        </div>

        {/* Other Metrics */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="mb-3">Other Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Ground Speed</span>
              <span>4.5 km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Working Depth</span>
              <span>7.2 inches</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hydraulic Pressure</span>
              <span>145 bar</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Battery Voltage</span>
              <span>13.8 V</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
