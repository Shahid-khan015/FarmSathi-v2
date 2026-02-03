import { useNavigate } from 'react-router';
import { Bell, Tractor, MapPin, Activity, FileText, Plus } from 'lucide-react';

export function OwnerDashboard() {
  const navigate = useNavigate();

  const fleetStatus = {
    totalTractors: 12,
    activeTractors: 7,
    idleTractors: 5,
    totalImplements: 18,
    activeImplements: 9
  };

  const activeMachines = [
    {
      id: 1,
      name: 'Mahindra 575 DI',
      reg: 'MH-12-AB-1234',
      type: 'tractor',
      operator: 'Suresh Patel',
      field: 'North Field - Rajesh Kumar',
      implement: 'Rotavator 8ft',
      status: 'working',
      fuelLevel: 68
    },
    {
      id: 2,
      name: 'John Deere 5310',
      reg: 'MH-12-CD-5678',
      type: 'tractor',
      operator: 'Ramesh Singh',
      field: 'South Field - Mohan Lal',
      implement: 'Disc Plow 3ft',
      status: 'working',
      fuelLevel: 82
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl">Fleet Owner Dashboard</h1>
          <button onClick={() => navigate('/notifications')} className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">5</span>
          </button>
        </div>
        <p className="text-sm text-purple-100">Welcome, Anil Sharma</p>
      </div>

      <div className="p-4">
        {/* Fleet Overview */}
        <div className="bg-white rounded-lg p-4 shadow mb-4">
          <h2 className="text-lg mb-3">Fleet Overview</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Active Tractors</p>
              <p className="text-2xl text-green-700">{fleetStatus.activeTractors}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-600">Idle Tractors</p>
              <p className="text-2xl text-gray-700">{fleetStatus.idleTractors}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Total Tractors</p>
              <p className="text-2xl text-blue-700">{fleetStatus.totalTractors}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Implements</p>
              <p className="text-2xl text-orange-700">{fleetStatus.totalImplements}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate('/owner/fleet')}
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm"
            >
              Manage Fleet
            </button>
            <button
              onClick={() => navigate('/owner/add-tractor')}
              className="px-4 bg-purple-100 text-purple-700 py-2 rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Machines */}
        <div className="mb-4">
          <h2 className="text-lg mb-3">Active Machines</h2>
          <div className="space-y-3">
            {activeMachines.map((machine) => (
              <div
                key={machine.id}
                onClick={() => navigate(`/owner/machine/${machine.id}`)}
                className="bg-white rounded-lg p-4 shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start">
                    <Tractor className="w-5 h-5 text-purple-600 mr-2 mt-1" />
                    <div>
                      <h3 className="font-medium">{machine.name}</h3>
                      <p className="text-sm text-gray-600">{machine.reg}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    Working
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operator</span>
                    <span>{machine.operator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Field</span>
                    <span className="text-right">{machine.field}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Implement</span>
                    <span>{machine.implement}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fuel Level</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${machine.fuelLevel}%` }}
                        ></div>
                      </div>
                      <span>{machine.fuelLevel}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/owner/tracking');
                    }}
                    className="flex-1 bg-purple-50 text-purple-700 py-2 rounded-lg text-sm"
                  >
                    Track
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/owner/telemetry/${machine.id}`);
                    }}
                    className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-lg text-sm"
                  >
                    Telemetry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/owner/tracking')}
            className="bg-white p-4 rounded-lg shadow flex flex-col items-center"
          >
            <MapPin className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm">Fleet Tracking</span>
          </button>

          <button
            onClick={() => navigate('/owner/reports')}
            className="bg-white p-4 rounded-lg shadow flex flex-col items-center"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm">Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}
