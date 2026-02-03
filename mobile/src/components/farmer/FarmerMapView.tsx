import { useNavigate } from 'react-router';
import { ArrowLeft, Navigation, AlertCircle } from 'lucide-react';

export function FarmerMapView() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/farmer/dashboard')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Live Map View</h1>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-gray-100">
        {/* Mock Map */}
        <div className="w-full h-full relative overflow-hidden">
          {/* Field Boundary */}
          <svg className="absolute inset-0 w-full h-full" style={{ top: '10%', left: '10%' }}>
            <polygon
              points="50,100 300,80 320,350 80,370"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="3"
              strokeDasharray="10,5"
            />
          </svg>

          {/* Worked Area */}
          <svg className="absolute inset-0 w-full h-full" style={{ top: '10%', left: '10%' }}>
            <polygon
              points="50,100 300,80 300,250 80,260"
              fill="#86efac"
              fillOpacity="0.6"
            />
          </svg>

          {/* Tractor Position */}
          <div className="absolute" style={{ top: '45%', left: '60%' }}>
            <div className="relative">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Navigation className="w-5 h-5 text-white" style={{ transform: 'rotate(45deg)' }} />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded text-xs shadow">
                Mahindra 575
              </div>
            </div>
          </div>

          {/* Boundary Crossing Alert */}
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-red-500 text-white p-3 rounded-lg flex items-start shadow-lg">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">Boundary Crossing Detected!</p>
                <p className="text-xs text-red-100 mt-1">2 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Card */}
      <div className="bg-white border-t p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Operator</span>
          <span>Suresh Patel</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Field</span>
          <span>North Field (12.5 acres)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Progress</span>
          <span>8.2 / 12.5 acres (65%)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Speed</span>
          <span>4.5 km/h</span>
        </div>
      </div>
    </div>
  );
}
