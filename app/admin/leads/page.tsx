"use client"

import { useState, useEffect } from 'react'

export default function LeadsPage() {
  const [leads, setLeads] = useState([])

  // This is a simple demo - in production you'd want proper authentication
  // and store leads in a database instead of browser storage

  useEffect(() => {
    // Load leads from localStorage (demo purposes)
    const savedLeads = localStorage.getItem('goodcode_leads')
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead Dashboard</h1>
          <p className="text-gray-600">View and manage your website leads</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Leads ({leads.length})</h2>
          </div>
          
          {leads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="text-4xl mb-4">📧</div>
              <p className="text-lg mb-2">No leads yet</p>
              <p className="text-sm">Leads will appear here when people submit forms on your website.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead: any, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(lead.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {lead.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          lead.serviceType === 'trial' ? 'bg-green-100 text-green-800' :
                          lead.serviceType === 'premium' ? 'bg-purple-100 text-purple-800' :
                          lead.serviceType === 'standard' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.serviceType || lead.age || 'Contact'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.source || 'booking-modal'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Demo Mode</h3>
          <p className="text-yellow-700 mb-4">
            This is a demo dashboard. For production use, you should:
          </p>
          <ul className="list-disc list-inside text-yellow-700 space-y-1">
            <li>Set up proper authentication</li>
            <li>Use a real database instead of localStorage</li>
            <li>Implement email notifications</li>
            <li>Add lead management features</li>
          </ul>
          <p className="text-sm text-yellow-600 mt-4">
            Check the console (F12) to see leads being captured in real-time, or see the LEAD_MANAGEMENT.md file for setup instructions.
          </p>
        </div>
      </div>
    </div>
  )
}