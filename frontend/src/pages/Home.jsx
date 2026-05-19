import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, MapPin, Tag } from 'lucide-react';

const Home = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, [searchTerm, categoryFilter]);

  const fetchComplaints = async () => {
    try {
      let url = '/complaints';
      if (searchTerm || categoryFilter) {
        url = `/complaints/search?location=${searchTerm}&category=${categoryFilter}`;
      }
      const response = await api.get(url);
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.put(`/complaints/${id}`, { status: newStatus });
      fetchComplaints();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by location..." 
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-[200px] relative">
          <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select 
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Roads">Roads</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Complaints List */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm text-gray-500">
          No complaints found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-1" title={complaint.title}>{complaint.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{complaint.description}</p>
              <div className="text-sm text-gray-500 mb-4 flex flex-col gap-1">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/> {complaint.location}</span>
                <span className="flex items-center gap-1"><Tag className="h-3 w-3"/> {complaint.category}</span>
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <select 
                  className="text-sm border-gray-300 rounded-md focus:ring-blue-500 bg-gray-50"
                  value={complaint.status}
                  onChange={(e) => handleStatusUpdate(complaint._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
