import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, FileText, Download } from 'lucide-react';

export function OwnerReports() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState<'field' | 'tractor' | 'implement'>('field');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center">
        <button onClick={() => navigate('/owner/dashboard')} className="mr-3">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Reports</h1>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setReportType('field')}
            className={`flex-1 py-3 text-sm ${
              reportType === 'field'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            Field-wise
          </button>
          <button
            onClick={() => setReportType('tractor')}
            className={`flex-1 py-3 text-sm ${
              reportType === 'tractor'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            Tractor-wise
          </button>
          <button
            onClick={() => setReportType('implement')}
            className={`flex-1 py-3 text-sm ${
              reportType === 'implement'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            Implement-wise
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Date Filter */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg mb-3">Filter Period</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">From</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">To</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Field-wise Reports */}
        {reportType === 'field' && (
          <div className="space-y-3">
            {['North Field - Rajesh Kumar', 'South Field - Mohan Lal', 'East Field - Suresh Yadav'].map((field) => (
              <div key={field} className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <FileText className="w-5 h-5 text-purple-600 mr-2 mt-1" />
                    <div>
                      <h3 className="font-medium">{field}</h3>
                      <p className="text-sm text-gray-600">Last 30 days</p>
                    </div>
                  </div>
                  <button className="text-purple-600">
                    <Download className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Total Area</p>
                    <p>45.5 acres</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Fuel</p>
                    <p>185 liters</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Time</p>
                    <p>24h 30m</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Operations</p>
                    <p>8 jobs</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tractor-wise Reports */}
        {reportType === 'tractor' && (
          <div className="space-y-3">
            {['Mahindra 575 DI', 'John Deere 5310', 'Swaraj 855'].map((tractor) => (
              <div key={tractor} className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <FileText className="w-5 h-5 text-purple-600 mr-2 mt-1" />
                    <div>
                      <h3 className="font-medium">{tractor}</h3>
                      <p className="text-sm text-gray-600">Last 30 days</p>
                    </div>
                  </div>
                  <button className="text-purple-600">
                    <Download className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Area Covered</p>
                    <p>125.5 acres</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fuel Consumed</p>
                    <p>342 liters</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Working Hours</p>
                    <p>68h 15m</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Jobs Completed</p>
                    <p>15</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg Efficiency</p>
                    <p>5.0 L/hr</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Utilization</p>
                    <p>78%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Implement-wise Reports */}
        {reportType === 'implement' && (
          <div className="space-y-3">
            {['Rotavator 8ft', 'Disc Plow 3ft', 'Seed Drill 9ft'].map((implement) => (
              <div key={implement} className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <FileText className="w-5 h-5 text-purple-600 mr-2 mt-1" />
                    <div>
                      <h3 className="font-medium">{implement}</h3>
                      <p className="text-sm text-gray-600">Last 30 days</p>
                    </div>
                  </div>
                  <button className="text-purple-600">
                    <Download className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Area Covered</p>
                    <p>95.0 acres</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Working Hours</p>
                    <p>42h 30m</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Jobs Completed</p>
                    <p>12</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Utilization</p>
                    <p>65%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Card */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="text-lg mb-3">Overall Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Area Covered</span>
              <span>425 acres</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Fuel Consumed</span>
              <span>832 liters</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Working Hours</span>
              <span>156 hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Jobs</span>
              <span>48</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
