import React, { useState } from 'react';
import api from '../services/api';
import { Bot, AlertTriangle, Building, MessageSquare, CheckCircle } from 'lucide-react';

const AIAnalysis = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Water',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await api.post('/ai/analyze', formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Bot className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">AI Complaint Analyzer</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Input Data</h2>
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Title</label>
              <input 
                type="text" required
                placeholder="E.g., Continuous water leakage"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                required rows="5"
                placeholder="Describe the issue to let AI analyze it..."
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Roads">Roads</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Bot className="h-5 w-5" />
              {loading ? 'Analyzing...' : 'Analyze with AI'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">AI Results</h2>
          
          {result ? (
            <div className="space-y-6 flex-1">
              <div className={`p-4 rounded-lg flex items-start gap-3 ${result.urgency === 'High' ? 'bg-red-50 text-red-800 border border-red-100' : result.urgency === 'Medium' ? 'bg-yellow-50 text-yellow-800 border border-yellow-100' : 'bg-green-50 text-green-800 border border-green-100'}`}>
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Detected Urgency</h3>
                  <p>{result.urgency}</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 text-blue-800 border border-blue-100 rounded-lg flex items-start gap-3">
                <Building className="h-5 w-5 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Suggested Department</h3>
                  <p>{result.department}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg flex items-start gap-3">
                <CheckCircle className="h-5 w-5 mt-0.5 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">AI Summary</h3>
                  <p className="text-gray-600 text-sm">{result.summary}</p>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-start gap-3">
                <MessageSquare className="h-5 w-5 mt-0.5 text-indigo-600" />
                <div>
                  <h3 className="font-semibold text-indigo-800">Auto Response Generated</h3>
                  <p className="text-indigo-700 text-sm italic">"{result.autoResponse}"</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <Bot className="h-16 w-16 mb-4 opacity-50" />
              <p>Submit a complaint to see AI analysis results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
