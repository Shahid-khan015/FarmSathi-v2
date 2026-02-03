import { useNavigate } from 'react-router';
import { ArrowLeft, DollarSign, Calendar, TrendingUp } from 'lucide-react';

export function OperatorEarnings() {
  const navigate = useNavigate();

  const earnings = [
    {
      id: 1,
      date: 'Feb 3, 2026',
      field: 'North Field',
      farmer: 'Rajesh Kumar',
      operation: 'Soil Preparation',
      areaWorked: '8.2 acres',
      rate: '₹500/acre',
      amount: '₹4,100',
      status: 'ongoing'
    },
    {
      id: 2,
      date: 'Feb 2, 2026',
      field: 'South Field',
      farmer: 'Mohan Lal',
      operation: 'Plowing',
      areaWorked: '10.5 acres',
      rate: '₹450/acre',
      amount: '₹4,725',
      status: 'pending'
    },
    {
      id: 3,
      date: 'Feb 1, 2026',
      field: 'East Field',
      farmer: 'Suresh Yadav',
      operation: 'Seeding',
      areaWorked: '12.0 acres',
      rate: '₹550/acre',
      amount: '₹6,600',
      status: 'paid'
    },
    {
      id: 4,
      date: 'Jan 31, 2026',
      field: 'West Field',
      farmer: 'Ramesh Singh',
      operation: 'Fertilizing',
      areaWorked: '8.5 acres',
      rate: '₹400/acre',
      amount: '₹3,400',
      status: 'paid'
    }
  ];

  const totalPending = earnings
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + parseFloat(e.amount.replace('₹', '').replace(',', '')), 0);

  const totalPaid = earnings
    .filter(e => e.status === 'paid')
    .reduce((sum, e) => sum + parseFloat(e.amount.replace('₹', '').replace(',', '')), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/operator/dashboard')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Earnings & Work Summary</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4 shadow">
            <div className="flex items-center mb-2">
              <DollarSign className="w-5 h-5 mr-1" />
              <span className="text-sm">Total Paid</span>
            </div>
            <p className="text-2xl">₹{totalPaid.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4 shadow">
            <div className="flex items-center mb-2">
              <DollarSign className="w-5 h-5 mr-1" />
              <span className="text-sm">Pending</span>
            </div>
            <p className="text-2xl">₹{totalPending.toLocaleString()}</p>
          </div>
        </div>

        {/* Today's Earnings */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg">Today's Earnings</h2>
          </div>
          <p className="text-3xl text-green-600">₹4,100</p>
          <p className="text-sm text-gray-600 mt-1">From 1 active job</p>
        </div>

        {/* Earnings List */}
        <div>
          <h2 className="text-lg mb-3">Work History</h2>
          <div className="space-y-3">
            {earnings.map((earning) => (
              <div key={earning.id} className="bg-white rounded-lg p-4 shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{earning.field}</h3>
                    <p className="text-sm text-gray-600">{earning.operation}</p>
                    <p className="text-sm text-gray-600">{earning.farmer}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    earning.status === 'paid' ? 'bg-green-100 text-green-700' :
                    earning.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {earning.status === 'paid' ? 'Paid' :
                     earning.status === 'pending' ? 'Pending' :
                     'Ongoing'}
                  </span>
                </div>

                <div className="border-t pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area Worked</span>
                    <span>{earning.areaWorked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate</span>
                    <span>{earning.rate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount</span>
                    <span className="text-xl text-green-600">{earning.amount}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs mt-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{earning.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
