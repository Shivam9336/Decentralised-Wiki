import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { createArticle } from "./Soroban";

export const CreateArticle = () => {
  const [title,     _setTitle]     = useState("");
  const [content,   _setContent]   = useState("");
  const [articleId, _setArticleId] = useState();
  const [error,     setError]      = useState(null);
  const pubKey = useContext(pubKeyData);

  const handleCreateArticle = async () => {
    try {
      setError(null);
      if (!title.trim() || !content.trim()) {
        setError("Please fill in both title and content");
        return;
      }
      const id = await createArticle(pubKey, title, content);
      _setArticleId(id);
      _setTitle("");
      _setContent("");
    } catch (err) {
      setError(err.message || "Failed to create article");
    }
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-lg border border-emerald-200 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 text-white">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5m-11-5v5m0 0h5M5.5 10h9m-9 4h9" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          Create Article
        </h2>
      </div>
      <div className="p-6 space-y-4">
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white placeholder-gray-500"
          placeholder="Article Title"
          value={title}
          onChange={(e) => _setTitle(e.target.value)}
        />
        <textarea
          className="w-full px-4 py-3 rounded-lg border border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white placeholder-gray-500 min-h-32 resize-vertical"
          placeholder="Article Content"
          value={content}
          onChange={(e) => _setContent(e.target.value)}
        />
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}
        <button
          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-lg transition-all hover:shadow-lg active:scale-95"
          onClick={handleCreateArticle}
        >
          Create Article
        </button>
      </div>
      {articleId && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-t border-emerald-200">
          <p className="text-sm text-gray-600 font-semibold mb-2">Article ID</p>
          <div className="text-3xl font-bold text-emerald-600 bg-white p-4 rounded-lg border-2 border-emerald-300 text-center">
            #{articleId}
          </div>
        </div>
      )}
    </div>
  );
};
