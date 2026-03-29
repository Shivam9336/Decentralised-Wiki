import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { updateArticle } from "./Soroban";

export const UpdateArticle = () => {
  const [articleId,  _setArticleId] = useState("");
  const [newTitle,   _setNewTitle]  = useState("");
  const [newContent, _setNewContent]= useState("");
  const [status,     _setStatus]    = useState();
  const [error,      setError]      = useState(null);
  const pubKey = useContext(pubKeyData);

  const handleUpdateArticle = async () => {
    try {
      setError(null);
      if (!articleId.trim() || !newTitle.trim() || !newContent.trim()) {
        setError("Please fill in all fields");
        return;
      }
      await updateArticle(pubKey, Number(articleId), newTitle, newContent);
      _setStatus("Article updated successfully!");
      _setArticleId("");
      _setNewTitle("");
      _setNewContent("");
    } catch (err) {
      setError(err.message || "Failed to update article");
    }
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg border border-blue-200 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4 text-white">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          Update Article
        </h2>
      </div>
      <div className="p-6 space-y-4">
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white placeholder-gray-500"
          placeholder="Article ID"
          value={articleId}
          onChange={(e) => _setArticleId(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white placeholder-gray-500"
          placeholder="New Title"
          value={newTitle}
          onChange={(e) => _setNewTitle(e.target.value)}
        />
        <textarea
          className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white placeholder-gray-500 min-h-32 resize-vertical"
          placeholder="New Content"
          value={newContent}
          onChange={(e) => _setNewContent(e.target.value)}
        />
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}
        <button
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-lg transition-all hover:shadow-lg active:scale-95"
          onClick={handleUpdateArticle}
        >
          Update Article
        </button>
      </div>
      {status && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-t border-blue-200">
          <p className="text-sm text-gray-600 font-semibold mb-2">Status</p>
          <div className="text-lg text-green-700 bg-white p-4 rounded-lg border-2 border-green-300 flex items-center gap-2">
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
