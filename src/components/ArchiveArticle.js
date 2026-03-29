import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { archiveArticle } from "./Soroban";

export const ArchiveArticle = () => {
  const [articleId, _setArticleId] = useState("");
  const [status,    _setStatus]    = useState();
  const [error,     setError]      = useState(null);
  const pubKey = useContext(pubKeyData);

  const handleArchiveArticle = async () => {
    try {
      setError(null);
      if (!articleId.trim()) {
        setError("Please enter an Article ID");
        return;
      }
      await archiveArticle(pubKey, Number(articleId));
      _setStatus(`Article #${articleId} archived successfully!`);
      _setArticleId("");
    } catch (err) {
      setError(err.message || "Failed to archive article");
    }
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-lg border border-red-200 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="bg-gradient-to-r from-red-500 to-orange-600 px-6 py-4 text-white">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          Archive Article
        </h2>
      </div>
      <div className="p-6 space-y-4">
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-white placeholder-gray-500"
          placeholder="Article ID to Archive"
          value={articleId}
          onChange={(e) => _setArticleId(e.target.value)}
        />
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}
        <button
          className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all hover:shadow-lg active:scale-95"
          onClick={handleArchiveArticle}
        >
          Archive Article
        </button>
      </div>
      {status && (
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-6 py-4 border-t border-red-200">
          <p className="text-sm text-gray-600 font-semibold mb-2">Status</p>
          <div className="text-lg text-orange-700 bg-white p-4 rounded-lg border-2 border-orange-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            {status}
          </div>
        </div>
      )}
    </div>
  );
};
