import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Home, FileText, Activity } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
          <Activity className="h-6 w-6" />
          Smart Complaint System
        </Link>
        
        {user ? (
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
              <Home className="h-4 w-4" /> Dashboard
            </Link>
            <Link to="/register-complaint" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
              <FileText className="h-4 w-4" /> New Complaint
            </Link>
            <Link to="/ai-analysis" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
              <Activity className="h-4 w-4" /> AI Analysis
            </Link>
            <div className="flex items-center gap-4 ml-4 border-l pl-4">
              <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
