import { useNavigate } from 'react-router';
import { ArrowLeft, AlertTriangle, AlertCircle, MapPin } from 'lucide-react';

export function FarmerAlerts() {
  const navigate = useNavigate();

  const alerts = [
    {
      id: 1,
      type: 'boundary',
      title: 'Boundary Crossing Detected',
      field: 'North Field',
      operator: 'Suresh Patel',
      time: '2 minutes ago',
      severity: 'high',
      description: 'Tractor crossed field boundary on north side'
    },
    {
      id: 2,
      type: 'overwork',
      title: 'Overworking Alert',
      field: 'South Field',
      operator: 'Ramesh Singh',
      time: '1 hour ago',
      severity: 'medium',
      description: 'Work exceeds approved area by 0.5 acres'
    },
    {
      id: 3,
      type: 'boundary',
      title: 'Boundary Crossing Detected',
      field: 'North Field',
      operator: 'Suresh Patel',
      time: '3 hours ago',
      severity: 'high',
      description: 'Tractor crossed field boundary on east side'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/farmer/dashboard')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Alerts</h1>
      </div>

      {/* Alerts List */}
      <div className="p-4 space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-lg p-4 border-l-4 shadow ${
              alert.severity === 'high' ? 'border-red-500' : 'border-orange-500'
            }`}
          >
            <div className="flex items-start mb-3">
              {alert.type === 'boundary' ? (
                <AlertCircle className={`w-6 h-6 mr-3 flex-shrink-0 ${
                  alert.severity === 'high' ? 'text-red-500' : 'text-orange-500'
                }`} />
              ) : (
                <AlertTriangle className={`w-6 h-6 mr-3 flex-shrink-0 ${
                  alert.severity === 'high' ? 'text-red-500' : 'text-orange-500'
                }`} />
              )}
              <div className="flex-1">
                <h3 className="font-medium mb-1">{alert.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{alert.field}</span>
                  </div>
                  <div className="text-gray-600">
                    <span>Operator: {alert.operator}</span>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {alert.time}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate('/farmer/map')}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm"
              >
                View on Map
              </button>
              <button className="flex-1 border border-gray-300 py-2 rounded-lg text-sm">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
