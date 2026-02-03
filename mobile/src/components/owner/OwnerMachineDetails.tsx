import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Tractor, MapPin, Activity, Calendar, Fuel } from 'lucide-react';

export function OwnerMachineDetails() {
  const navigate = useNavigate();
  const { machineId } = useParams();

  // Mock data
  const machineData = {
    id: machineId,
    name: 'Mahindra 575 DI',
    type: 'tractor',
    brand: 'Mahindra',
    model: '575 DI',
    registration: 'MH-12-AB-1234',
    hp: 50,
    year: 2020,
    fuelType: 'Diesel',
    purchaseDate: 'Jan 15, 2020',
    status: 'active',
    currentOperator: 'Suresh Patel',
    currentField: 'North Field - Rajesh Kumar',
    currentImplement: 'Rotavator 8ft',
    totalHours: 2345,
    fuelLevel: 68,
    lastService: 'Jan 20, 2026',
    nextService: 'Mar 20, 2026'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/owner/fleet')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Machine Details</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Basic Info */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-start mb-4">
            <Tractor className="w-8 h-8 text-purple-600 mr-3" />
            <div className="flex-1">
              <h2 className="text-xl mb-1">{machineData.name}</h2>
              <p className="text-sm text-gray-600">{machineData.registration}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs ${
              machineData.status === 'active' 
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {machineData.status === 'active' ? 'Active' : 'Idle'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-600">Brand</p>
              <p>{machineData.brand}</p>
            </div>
            <div>
              <p className="text-gray-600">Model</p>
              <p>{machineData.model}</p>
            </div>
            <div>
              <p className="text-gray-600">Power</p>
              <p>{machineData.hp} HP</p>
            </div>
            <div>
              <p className="text-gray-600">Year</p>
              <p>{machineData.year}</p>
            </div>
            <div>
              <p className="text-gray-600">Fuel Type</p>
              <p>{machineData.fuelType}</p>
            </div>
            <div>
              <p className="text-gray-600">Purchase Date</p>
              <p>{machineData.purchaseDate}</p>
            </div>
          </div>
        </div>

        {/* Current Status */}
        {machineData.status === 'active' && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 shadow">
            <h3 className="text-lg mb-3">Current Assignment</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-100">Operator</span>
                <span>{machineData.currentOperator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-100">Field</span>
                <span>{machineData.currentField}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-100">Implement</span>
                <span>{machineData.currentImplement}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate('/owner/tracking')}
                className="flex-1 bg-white text-green-600 py-2 rounded-lg text-sm"
              >
                Track on Map
              </button>
              <button
                onClick={() => navigate(`/owner/telemetry/${machineData.id}`)}
                className="flex-1 bg-green-700 text-white py-2 rounded-lg text-sm"
              >
                View Telemetry
              </button>
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg mb-3">Performance Metrics</h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Total Hours Run</span>
                <span>{machineData.totalHours} hrs</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Fuel Level</span>
                <span>{machineData.fuelLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${machineData.fuelLevel}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Schedule */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg mb-3">Maintenance Schedule</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-gray-600">Last Service</span>
              </div>
              <span>{machineData.lastService}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-gray-600">Next Service</span>
              </div>
              <span className="text-orange-600">{machineData.nextService}</span>
            </div>
          </div>

          <button className="w-full mt-4 bg-purple-50 border border-purple-200 text-purple-700 py-2 rounded-lg text-sm">
            Schedule Maintenance
          </button>
        </div>
      </div>
    </div>
  );
}
