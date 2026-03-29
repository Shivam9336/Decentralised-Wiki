import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { viewArticle } from "./Soroban";

export const ViewArticle = () => {
  const [articleId,   _setArticleId]   = useState("");
  const [articleData, _setArticleData] = useState();
  const pubKey = useContext(pubKeyData);

  const handleViewArticle = async () => {
    await viewArticle(pubKey, Number(articleId)).then((data) =>
      _setArticleData(data)
    );
  };

  return (
    <div className="flex flex-wrap flex-col font-semibold bg-orange-300 rounded-lg my-4 items-center border p-4">
      <div className="flex-wrap bg-orange-400 w-full p-2 rounded-md sm:text-2xl font-bold text-center flex justify-between gap-3 items-center">
        View Article
        <input
          type="text"
          className="sm:w-full p-2 rounded-md"
          placeholder="Enter Article ID"
          onChange={(e) => _setArticleId(e.target.value)}
        />
        <button
          className="text-lg hover:bg-violet-500 bg-orange-700 rounded-md p-1 font-bold text-white"
          onClick={handleViewArticle}
        >
          Fetch
        </button>
      </div>
      <div className="w-full mt-4">
        <div className="text-2xl">Article Data</div>
        <div className="text-lg bg-cyan-300 p-4 border-4 border-black space-y-1">
          {articleData ? (
            <>
              <div><span className="font-bold">ID:</span> {String(articleData.article_id)}</div>
              <div><span className="font-bold">Title:</span> {articleData.title?.toString()}</div>
              <div><span className="font-bold">Content:</span> {articleData.content?.toString()}</div>
              <div><span className="font-bold">Created At:</span> {String(articleData.created_at)}</div>
              <div><span className="font-bold">Updated At:</span> {String(articleData.updated_at)}</div>
              <div><span className="font-bold">Archived:</span> {String(articleData.is_archived)}</div>
            </>
          ) : (
            <div>No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
};
