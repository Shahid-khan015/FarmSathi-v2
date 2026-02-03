import { useNavigate } from 'react-router';
import { ArrowLeft, Navigation, Tractor } from 'lucide-react';

export function OwnerFleetTracking() {
  const navigate = useNavigate();

  const activeMachines = [
    { id: 1, name: 'Mahindra 575 DI', lat: 45, lng: 60, implement: 'Rotavator 8ft', operator: 'Suresh Patel' },
    { id: 2, name: 'John Deere 5310', lat: 30, lng: 40, implement: 'Disc Plow 3ft', operator: 'Ramesh Singh' }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/owner/dashboard')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Live Fleet Tracking</h1>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-gray-100">
        {/* Mock Map */}
        <div className="w-full h-full relative overflow-hidden">
          {/* Machine Locations */}
          {activeMachines.map((machine, index) => (
            <div 
              key={machine.id}
              className="absolute"
              style={{ top: `${machine.lat}%`, left: `${machine.lng}%` }}
            >
              <div className="relative">
                <div className={`w-10 h-10 ${
                  index === 0 ? 'bg-blue-600' : 'bg-green-600'
                } rounded-full flex items-center justify-center shadow-lg`}>
                  <Navigation className="w-6 h-6 text-white" style={{ transform: 'rotate(45deg)' }} />
                </div>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded text-xs shadow border border-gray-200">
                  {machine.name.split(' ')[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom List */}
      <div className="bg-white border-t max-h-64 overflow-y-auto">
        <div className="p-4 space-y-2">
          {activeMachines.map((machine) => (
            <div
              key={machine.id}
              onClick={() => navigate(`/owner/machine/${machine.id}`)}
              className="bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div className="flex items-start">
                <Tractor className="w-5 h-5 text-purple-600 mr-2 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{machine.name}</h3>
                  <div className="text-xs text-gray-600 mt-1">
                    <p>Operator: {machine.operator}</p>
                    <p>Implement: {machine.implement}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/owner/telemetry/${machine.id}`);
                  }}
                  className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded"
                >
                  Telemetry
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
