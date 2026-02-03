import { useState } from 'react';
import { useNavigate } from 'react-router';

export function RegistrationScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'farmer' | 'operator' | 'owner'>('farmer');

  const handleRegister = () => {
    // Mock registration
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <div className="flex-1 flex flex-col px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">Register</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

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

          <div>
            <label className="block text-sm mb-2">User Role</label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-gray-300 rounded-lg">
                <input
                  type="radio"
                  name="role"
                  value="farmer"
                  checked={role === 'farmer'}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="mr-3"
                />
                <span>Farmer</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-lg">
                <input
                  type="radio"
                  name="role"
                  value="operator"
                  checked={role === 'operator'}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="mr-3"
                />
                <span>Operator</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-lg">
                <input
                  type="radio"
                  name="role"
                  value="owner"
                  checked={role === 'owner'}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="mr-3"
                />
                <span>Owner (Fleet Owner)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Register
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full border border-green-600 text-green-600 py-3 rounded-lg"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
