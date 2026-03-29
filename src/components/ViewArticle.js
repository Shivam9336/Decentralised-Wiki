import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { viewArticle } from "./Soroban";

export const ViewArticle = () => {
  const [articleId,   _setArticleId]   = useState("");
  const [articleData, _setArticleData] = useState();
  const [error,       setError]        = useState(null);
  const pubKey = useContext(pubKeyData);

  const handleViewArticle = async () => {
    try {
      setError(null);
      if (!articleId.trim()) {
        setError("Please enter an Article ID");
        return;
      }
      const data = await viewArticle(pubKey, Number(articleId));
      _setArticleData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch article");
    }
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg border border-amber-200 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 text-white">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" strokeWidth="1.5" stroke="currentColor" fill="none"/>
            <path d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          View Article
        </h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-lg border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-white placeholder-gray-500"
            placeholder="Article ID"
            value={articleId}
            onChange={(e) => _setArticleId(e.target.value)}
          />
          <button
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all hover:shadow-lg active:scale-95"
            onClick={handleViewArticle}
          >
            Fetch
          </button>
        </div>
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}
      </div>
      {articleData && (
        <div className="bg-gradient-to-r from-white to-gray-50 px-6 py-4 border-t border-amber-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Article Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-start bg-gray-100 p-3 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700">ID:</span>
              <span className="text-amber-600 font-bold">#{String(articleData.article_id)}</span>
            </div>
            <div className="flex justify-between items-start bg-gray-100 p-3 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700">Title:</span>
              <span className="text-gray-800">{articleData.title?.toString()}</span>
            </div>
            <div className="flex justify-between items-start bg-gray-100 p-3 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700">Content:</span>
              <span className="text-gray-800 max-w-xs text-right line-clamp-3">{articleData.content?.toString()}</span>
            </div>
            <div className="flex justify-between items-start bg-gray-100 p-3 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700">Created:</span>
              <span className="text-gray-600 text-sm">{new Date(Number(articleData.created_at) * 1000).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-start bg-gray-100 p-3 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700">Updated:</span>
              <span className="text-gray-600 text-sm">{new Date(Number(articleData.updated_at) * 1000).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-start bg-gray-100 p-3 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700">Status:</span>
              <span className={`px-3 py-1 rounded-full font-semibold text-sm ${
                String(articleData.is_archived) === 'true'
                  ? 'bg-red-200 text-red-800'
                  : 'bg-green-200 text-green-800'
              }`}>
                {String(articleData.is_archived) === 'true' ? 'Archived' : 'Active'}
              </span>
            </div>
          </div>
        </div>
      )}
      {!articleData && articleId && (
        <div className="bg-amber-50 px-6 py-4 border-t border-amber-200 text-amber-700">
          <p>Click "Fetch" to load article data</p>
        </div>
      )}
    </div>
  );
};
