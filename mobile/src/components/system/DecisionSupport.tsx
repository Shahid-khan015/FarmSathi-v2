import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp, Tractor, Wrench, MapPin } from 'lucide-react';

export function DecisionSupport() {
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState('');
  const [selectedTractor, setSelectedTractor] = useState('');

  const fields = [
    { id: 1, name: 'North Field', area: '12.5 acres', soilType: 'Clay Loam' },
    { id: 2, name: 'South Field', area: '10.0 acres', soilType: 'Sandy Loam' },
    { id: 3, name: 'East Field', area: '8.0 acres', soilType: 'Silt Loam' }
  ];

  const tractorRecommendations = [
    {
      id: 1,
      name: 'Mahindra 575 DI',
      hp: 50,
      score: 95,
      reasons: ['Optimal power for field size', 'Good fuel efficiency', 'Currently available']
    },
    {
      id: 2,
      name: 'John Deere 5310',
      hp: 55,
      score: 88,
      reasons: ['Slightly overpowered', 'Higher fuel consumption', 'Available']
    },
    {
      id: 3,
      name: 'Swaraj 855',
      hp: 60,
      score: 75,
      reasons: ['Overpowered for field', 'Not cost-effective', 'Available']
    }
  ];

  const implementRecommendations = [
    {
      id: 1,
      name: 'Rotavator 8ft',
      type: 'Rotavator',
      score: 92,
      reasons: ['Perfect width for tractor', 'Suitable for soil type', 'Available']
    },
    {
      id: 2,
      name: 'Disc Plow 3ft',
      type: 'Plow',
      score: 85,
      reasons: ['Compatible with tractor', 'Good for heavy soil', 'Available']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Decision Support</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg flex items-start">
          <TrendingUp className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            Get AI-powered recommendations for optimal tractor and implement selection based on field characteristics.
          </p>
        </div>

        {/* Field Selection */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg mb-3">Select Field</h3>
          <div className="space-y-2">
            {fields.map((field) => (
              <label
                key={field.id}
                className={`flex items-start p-3 border rounded-lg cursor-pointer ${
                  selectedField === field.name
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="field"
                  value={field.name}
                  checked={selectedField === field.name}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="mr-3 mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="font-medium">{field.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Area: {field.area}</p>
                    <p>Soil: {field.soilType}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {selectedField && (
          <>
            {/* Tractor Recommendations */}
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center mb-3">
                <Tractor className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg">Recommended Tractors</h3>
              </div>

              <div className="space-y-3">
                {tractorRecommendations.map((tractor) => (
                  <div
                    key={tractor.id}
                    onClick={() => setSelectedTractor(tractor.name)}
                    className={`border rounded-lg p-3 cursor-pointer ${
                      selectedTractor === tractor.name
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{tractor.name}</h4>
                        <p className="text-sm text-gray-600">{tractor.hp} HP</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-green-600">{tractor.score}</div>
                        <div className="text-xs text-gray-600">Match Score</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {tractor.reasons.map((reason, index) => (
                        <div key={index} className="flex items-start text-sm">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-gray-600">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Implement Recommendations */}
            {selectedTractor && (
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center mb-3">
                  <Wrench className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg">Recommended Implements</h3>
                </div>

                <div className="space-y-3">
                  {implementRecommendations.map((implement) => (
                    <div
                      key={implement.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{implement.name}</h4>
                          <p className="text-sm text-gray-600">{implement.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl text-green-600">{implement.score}</div>
                          <div className="text-xs text-gray-600">Match Score</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {implement.reasons.map((reason, index) => (
                          <div key={index} className="flex items-start text-sm">
                            <span className="text-green-600 mr-2">✓</span>
                            <span className="text-gray-600">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Soil Data */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg mb-3">Soil Analysis Data</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Soil Type</p>
                  <p>Clay Loam</p>
                </div>
                <div>
                  <p className="text-gray-600">pH Level</p>
                  <p>6.8</p>
                </div>
                <div>
                  <p className="text-gray-600">Moisture</p>
                  <p>Medium</p>
                </div>
                <div>
                  <p className="text-gray-600">Organic Matter</p>
                  <p>3.2%</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}