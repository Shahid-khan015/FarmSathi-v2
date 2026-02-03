import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

export function NotificationsScreen() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Boundary Crossing Detected',
      message: 'Mahindra 575 DI crossed field boundary at North Field',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Vibration Alert',
      message: 'Vibration level exceeds threshold on John Deere 5310',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Work Approved',
      message: 'Your work at South Field has been approved by Mohan Lal',
      time: '1 hour ago',
      read: false
    },
    {
      id: 4,
      type: 'info',
      title: 'New Job Assigned',
      message: 'You have been assigned to East Field for plowing operation',
      time: '2 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'alert',
      title: 'Low Fuel Warning',
      message: 'Fuel level below 20% on Swaraj 855',
      time: '3 hours ago',
      read: true
    },
    {
      id: 6,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of ₹4,725 received for South Field work',
      time: '5 hours ago',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <XCircle className="w-6 h-6 text-orange-500" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Notifications</h1>
        </div>
        <button className="text-sm">Mark all read</button>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 ${
              notification.read ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">{notification.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
