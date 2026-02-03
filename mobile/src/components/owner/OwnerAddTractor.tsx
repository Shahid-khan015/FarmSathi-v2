import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';

export function OwnerAddTractor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    registration: '',
    hp: '',
    year: '',
    fuelType: 'diesel',
    purchaseDate: ''
  });

  const handleSubmit = () => {
    // Mock save
    navigate('/owner/fleet');
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/owner/fleet')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Add Tractor</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <div>
            <label className="block text-sm mb-2">Tractor Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="e.g., Mahindra 575 DI"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Brand</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => updateField('brand', e.target.value)}
              placeholder="e.g., Mahindra"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Model</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => updateField('model', e.target.value)}
              placeholder="e.g., 575 DI"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Registration Number</label>
            <input
              type="text"
              value={formData.registration}
              onChange={(e) => updateField('registration', e.target.value)}
              placeholder="e.g., MH-12-AB-1234"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Horsepower (HP)</label>
            <input
              type="number"
              value={formData.hp}
              onChange={(e) => updateField('hp', e.target.value)}
              placeholder="e.g., 50"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Year of Manufacture</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => updateField('year', e.target.value)}
              placeholder="e.g., 2020"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Fuel Type</label>
            <select
              value={formData.fuelType}
              onChange={(e) => updateField('fuelType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            >
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
              <option value="electric">Electric</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Purchase Date</label>
            <input
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => updateField('purchaseDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center mt-6"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Tractor
          </button>
        </div>
      </div>
    </div>
  );
}
