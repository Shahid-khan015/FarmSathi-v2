import { useNavigate } from 'react-router';
import { ArrowLeft, FileText, Calendar } from 'lucide-react';

export function FarmerReports() {
  const navigate = useNavigate();

  const reports = [
    {
      id: 1,
      field: 'South Field',
      operation: 'Soil Preparation',
      date: 'Feb 2, 2026',
      areaWorked: '10.5 acres',
      timeSpent: '4h 30m',
      tractor: 'Mahindra 575 DI',
      implement: 'Rotavator 8ft',
      operator: 'Ramesh Singh',
      status: 'pending'
    },
    {
      id: 2,
      field: 'East Field',
      operation: 'Plowing',
      date: 'Feb 1, 2026',
      areaWorked: '8.2 acres',
      timeSpent: '3h 45m',
      tractor: 'John Deere 5310',
      implement: 'Disc Plow 3ft',
      operator: 'Suresh Patel',
      status: 'pending'
    },
    {
      id: 3,
      field: 'West Field',
      operation: 'Seeding',
      date: 'Jan 30, 2026',
      areaWorked: '12.0 acres',
      timeSpent: '5h 15m',
      tractor: 'Mahindra 575 DI',
      implement: 'Seed Drill 9ft',
      operator: 'Ramesh Singh',
      status: 'approved'
    },
    {
      id: 4,
      field: 'North Field',
      operation: 'Fertilizer Application',
      date: 'Jan 28, 2026',
      areaWorked: '15.5 acres',
      timeSpent: '6h 20m',
      tractor: 'Swaraj 855',
      implement: 'Fertilizer Spreader',
      operator: 'Mohan Kumar',
      status: 'approved'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/farmer/dashboard')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Work Reports</h1>
      </div>

      {/* Reports List */}
      <div className="p-4 space-y-3">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() => navigate(`/farmer/approval/${report.id}`)}
            className="bg-white rounded-lg p-4 shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-green-600 mr-2 mt-1" />
                <div>
                  <h3 className="font-medium">{report.field}</h3>
                  <p className="text-sm text-gray-600">{report.operation}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${
                report.status === 'approved' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {report.status === 'approved' ? 'Approved' : 'Pending'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <p className="text-gray-600">Area Worked</p>
                <p>{report.areaWorked}</p>
              </div>
              <div>
                <p className="text-gray-600">Time Spent</p>
                <p>{report.timeSpent}</p>
              </div>
            </div>

            <div className="border-t pt-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tractor</span>
                <span>{report.tractor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Implement</span>
                <span>{report.implement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Operator</span>
                <span>{report.operator}</span>
              </div>
              <div className="flex items-center text-gray-500 text-xs mt-2">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{report.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
