import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { viewWikiStats } from "./Soroban";

export const ViewWikiStats = () => {
  const [statsData, _setStatsData] = useState();
  const [error,     setError]      = useState(null);
  const pubKey = useContext(pubKeyData);

  const handleViewWikiStats = async () => {
    try {
      setError(null);
      const data = await viewWikiStats(pubKey);
      _setStatsData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch stats");
    }
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg border border-purple-200 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 text-white">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          Wiki Statistics
        </h2>
      </div>
      <div className="p-6">
        <button
          onClick={handleViewWikiStats}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-lg transition-all hover:shadow-lg active:scale-95"
        >
          Fetch Statistics
        </button>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}
      </div>
      {statsData ? (
        <div className="bg-gradient-to-r from-white to-gray-50 px-6 py-4 border-t border-purple-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" strokeWidth="1.5" stroke="currentColor" fill="none"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2 4 4 0 00-4 4v10a4 4 0 004 4h8a4 4 0 004-4V5a1 1 0 00-1 0 2 2 0 01-2-2 1 1 0 00-1 0H9a1 1 0 00-1 0 2 2 0 01-2 2 1 1 0 00-1 0 4 4 0 00-4 4v10a4 4 0 004 4h8a4 4 0 004-4V5a1 1 0 00-2 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"/>
            </svg>
            Overview
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-lg border-2 border-blue-300">
              <p className="text-sm text-blue-600 font-semibold mb-1">Total</p>
              <p className="text-4xl font-bold text-blue-700">{String(statsData.total)}</p>
              <p className="text-xs text-blue-500 mt-1">Articles</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-lg border-2 border-green-300">
              <p className="text-sm text-green-600 font-semibold mb-1">Active</p>
              <p className="text-4xl font-bold text-green-700">{String(statsData.active)}</p>
              <p className="text-xs text-green-500 mt-1">Published</p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-4 rounded-lg border-2 border-orange-300">
              <p className="text-sm text-orange-600 font-semibold mb-1">Archived</p>
              <p className="text-4xl font-bold text-orange-700">{String(statsData.archived)}</p>
              <p className="text-xs text-orange-500 mt-1">Inactive</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 px-6 py-12 text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" strokeWidth="1" stroke="currentColor" fill="none"/>
          </svg>
          <p>Click "Fetch Statistics" to load wiki data</p>
        </div>
      )}
    </div>
  );
};
