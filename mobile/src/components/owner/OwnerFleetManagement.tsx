import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Tractor, Wrench, Plus, Edit, Trash2 } from 'lucide-react';

export function OwnerFleetManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tractors' | 'implements'>('tractors');

  const tractors = [
    { id: 1, name: 'Mahindra 575 DI', reg: 'MH-12-AB-1234', brand: 'Mahindra', hp: 50, status: 'active' },
    { id: 2, name: 'John Deere 5310', reg: 'MH-12-CD-5678', brand: 'John Deere', hp: 55, status: 'active' },
    { id: 3, name: 'Swaraj 855', reg: 'MH-12-EF-9012', brand: 'Swaraj', hp: 60, status: 'idle' },
    { id: 4, name: 'Mahindra Arjun', reg: 'MH-12-GH-3456', brand: 'Mahindra', hp: 45, status: 'idle' }
  ];

  const implementsList = [
    { id: 1, name: 'Rotavator 8ft', type: 'Rotavator', brand: 'Shaktiman', width: '8 ft', status: 'active' },
    { id: 2, name: 'Disc Plow 3ft', type: 'Plow', brand: 'Lemken', width: '3 ft', status: 'active' },
    { id: 3, name: 'Seed Drill 9ft', type: 'Seeder', brand: 'Mahindra', width: '9 ft', status: 'idle' },
    { id: 4, name: 'Cultivator 7ft', type: 'Cultivator', brand: 'Fieldking', width: '7 ft', status: 'idle' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/owner/dashboard')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Fleet Management</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('tractors')}
            className={`flex-1 py-3 ${
              activeTab === 'tractors'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            <Tractor className="w-5 h-5 inline mr-2" />
            Tractors
          </button>
          <button
            onClick={() => setActiveTab('implements')}
            className={`flex-1 py-3 ${
              activeTab === 'implements'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            <Wrench className="w-5 h-5 inline mr-2" />
            Implements
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Add Button */}
        <button
          onClick={() => navigate(activeTab === 'tractors' ? '/owner/add-tractor' : '/owner/add-implement')}
          className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center mb-4"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add {activeTab === 'tractors' ? 'Tractor' : 'Implement'}
        </button>

        {/* Tractors List */}
        {activeTab === 'tractors' && (
          <div className="space-y-3">
            {tractors.map((tractor) => (
              <div
                key={tractor.id}
                className="bg-white rounded-lg p-4 shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start flex-1">
                    <Tractor className="w-5 h-5 text-purple-600 mr-2 mt-1" />
                    <div>
                      <h3 className="font-medium">{tractor.name}</h3>
                      <p className="text-sm text-gray-600">{tractor.reg}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    tractor.status === 'active' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {tractor.status === 'active' ? 'Active' : 'Idle'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-gray-600">Brand</p>
                    <p>{tractor.brand}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Power</p>
                    <p>{tractor.hp} HP</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/owner/machine/${tractor.id}`)}
                    className="flex-1 bg-purple-50 text-purple-700 py-2 rounded-lg text-sm"
                  >
                    View Details
                  </button>
                  <button className="px-3 bg-blue-50 text-blue-700 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="px-3 bg-red-50 text-red-700 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Implements List */}
        {activeTab === 'implements' && (
          <div className="space-y-3">
            {implementsList.map((implement) => (
              <div
                key={implement.id}
                className="bg-white rounded-lg p-4 shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start flex-1">
                    <Wrench className="w-5 h-5 text-purple-600 mr-2 mt-1" />
                    <div>
                      <h3 className="font-medium">{implement.name}</h3>
                      <p className="text-sm text-gray-600">{implement.type}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    implement.status === 'active' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {implement.status === 'active' ? 'Active' : 'Idle'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-gray-600">Brand</p>
                    <p>{implement.brand}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Width</p>
                    <p>{implement.width}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/owner/machine/${implement.id}`)}
                    className="flex-1 bg-purple-50 text-purple-700 py-2 rounded-lg text-sm"
                  >
                    View Details
                  </button>
                  <button className="px-3 bg-blue-50 text-blue-700 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="px-3 bg-red-50 text-red-700 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}