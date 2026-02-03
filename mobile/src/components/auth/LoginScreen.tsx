import { useState } from 'react';
import { useNavigate } from 'react-router';

export function LoginScreen() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login - redirect based on role
    // For demo: farmer number starts with 9, operator with 8, owner with 7
    if (mobile.startsWith('9')) {
      navigate('/farmer/dashboard');
    } else if (mobile.startsWith('8')) {
      navigate('/operator/dashboard');
    } else if (mobile.startsWith('7')) {
      navigate('/owner/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">AgriTrack</h1>
          <p className="text-gray-600">Field Operations Monitor</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => navigate('/register')}
            className="w-full border border-green-600 text-green-600 py-3 rounded-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
