import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';

export function OperatorThresholds() {
  const navigate = useNavigate();

  const [thresholds, setThresholds] = useState({
    fuelLevel: 20,
    engineTemp: 95,
    oilTemp: 90,
    vibration: 7.0,
    rpmMax: 2200,
    rpmMin: 1500
  });

  const handleSave = () => {
    // Mock save
    navigate('/operator/telemetry');
  };

  const updateThreshold = (key: string, value: number) => {
    setThresholds({ ...thresholds, [key]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/operator/telemetry')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Threshold Configuration</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg flex items-start">
          <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            Set threshold values for telemetry parameters. You'll receive alerts when values exceed these thresholds.
          </p>
        </div>

        {/* Fuel Level Threshold */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-3">
            <h3>Minimum Fuel Level</h3>
            <span className="text-2xl text-orange-600">{thresholds.fuelLevel}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            value={thresholds.fuelLevel}
            onChange={(e) => updateThreshold('fuelLevel', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>10%</span>
            <span>50%</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Alert when fuel drops below this level
          </p>
        </div>

        {/* Engine Temperature */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-3">
            <h3>Maximum Engine Temperature</h3>
            <span className="text-2xl text-red-600">{thresholds.engineTemp}°C</span>
          </div>
          <input
            type="range"
            min="85"
            max="105"
            value={thresholds.engineTemp}
            onChange={(e) => updateThreshold('engineTemp', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>85°C</span>
            <span>105°C</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Alert when engine temperature exceeds this value
          </p>
        </div>

        {/* Oil Temperature */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-3">
            <h3>Maximum Oil Temperature</h3>
            <span className="text-2xl text-red-600">{thresholds.oilTemp}°C</span>
          </div>
          <input
            type="range"
            min="80"
            max="100"
            value={thresholds.oilTemp}
            onChange={(e) => updateThreshold('oilTemp', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>80°C</span>
            <span>100°C</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Alert when oil temperature exceeds this value
          </p>
        </div>

        {/* Vibration */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-3">
            <h3>Maximum Vibration Level</h3>
            <span className="text-2xl text-purple-600">{thresholds.vibration} Hz</span>
          </div>
          <input
            type="range"
            min="5"
            max="10"
            step="0.5"
            value={thresholds.vibration}
            onChange={(e) => updateThreshold('vibration', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>5.0 Hz</span>
            <span>10.0 Hz</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Alert when vibration exceeds this level
          </p>
        </div>

        {/* RPM Range */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="mb-3">Engine RPM Range</h3>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Minimum RPM</span>
              <span className="text-xl text-blue-600">{thresholds.rpmMin}</span>
            </div>
            <input
              type="range"
              min="1200"
              max="1800"
              step="50"
              value={thresholds.rpmMin}
              onChange={(e) => updateThreshold('rpmMin', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>1200</span>
              <span>1800</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Maximum RPM</span>
              <span className="text-xl text-blue-600">{thresholds.rpmMax}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="2500"
              step="50"
              value={thresholds.rpmMax}
              onChange={(e) => updateThreshold('rpmMax', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>2000</span>
              <span>2500</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Alert when RPM is outside this range
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-4 rounded-lg flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Thresholds
        </button>
      </div>
    </div>
  );
}
