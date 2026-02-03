import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Play, Square, Pause, Activity } from 'lucide-react';

export function OperatorWorkControl() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [workStatus, setWorkStatus] = useState<'running' | 'paused' | 'stopped'>('running');

  const handleStart = () => {
    setWorkStatus('running');
  };

  const handlePause = () => {
    setWorkStatus('paused');
  };

  const handleStop = () => {
    setWorkStatus('stopped');
    navigate('/operator/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/operator/dashboard')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Work Control</h1>
      </div>

      <div className="flex-1 flex flex-col p-4">
        {/* Status Card */}
        <div className={`rounded-lg p-6 shadow-lg mb-4 ${
          workStatus === 'running' ? 'bg-gradient-to-r from-green-500 to-green-600' :
          workStatus === 'paused' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
          'bg-gradient-to-r from-gray-500 to-gray-600'
        } text-white`}>
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <Activity className="w-8 h-8 mr-2" />
              <h2 className="text-2xl">
                {workStatus === 'running' ? 'Work In Progress' :
                 workStatus === 'paused' ? 'Work Paused' :
                 'Work Stopped'}
              </h2>
            </div>
            <p className="text-sm opacity-90">North Field - Soil Preparation</p>
          </div>

          {/* Timer */}
          <div className="text-center mb-6">
            <p className="text-sm opacity-90 mb-1">Elapsed Time</p>
            <p className="text-5xl font-mono">02:45:30</p>
          </div>

          {/* Progress */}
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Area Covered</span>
              <span>8.2 / 12.5 acres</span>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
              <div className="bg-white h-3 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        {/* Current Stats */}
        <div className="bg-white rounded-lg p-4 shadow mb-4">
          <h3 className="text-lg mb-3">Current Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Current Speed</p>
              <p className="text-xl">4.5 km/h</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fuel Level</p>
              <p className="text-xl">68%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Engine Temp</p>
              <p className="text-xl">82°C</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">PTO Status</p>
              <p className="text-xl text-green-600">ON</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/operator/telemetry')}
            className="w-full mt-4 bg-blue-50 border border-blue-200 text-blue-700 py-2 rounded-lg text-sm"
          >
            View Full Telemetry
          </button>
        </div>

        {/* Control Buttons */}
        <div className="mt-auto space-y-3">
          {workStatus === 'running' && (
            <>
              <button
                onClick={handlePause}
                className="w-full bg-orange-600 text-white py-4 rounded-lg flex items-center justify-center text-lg"
              >
                <Pause className="w-6 h-6 mr-2" />
                Pause Work
              </button>
              <button
                onClick={handleStop}
                className="w-full bg-red-600 text-white py-4 rounded-lg flex items-center justify-center text-lg"
              >
                <Square className="w-6 h-6 mr-2" />
                Stop Work
              </button>
            </>
          )}

          {workStatus === 'paused' && (
            <>
              <button
                onClick={handleStart}
                className="w-full bg-green-600 text-white py-4 rounded-lg flex items-center justify-center text-lg"
              >
                <Play className="w-6 h-6 mr-2" />
                Resume Work
              </button>
              <button
                onClick={handleStop}
                className="w-full bg-red-600 text-white py-4 rounded-lg flex items-center justify-center text-lg"
              >
                <Square className="w-6 h-6 mr-2" />
                Stop Work
              </button>
            </>
          )}

          {workStatus === 'stopped' && (
            <button
              onClick={handleStart}
              className="w-full bg-green-600 text-white py-4 rounded-lg flex items-center justify-center text-lg"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Work
              </button>
          )}
        </div>
      </div>
    </div>
  );
}
