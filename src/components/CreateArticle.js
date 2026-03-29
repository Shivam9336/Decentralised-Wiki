import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { createArticle } from "./Soroban";

export const CreateArticle = () => {
  const [title,     _setTitle]     = useState("");
  const [content,   _setContent]   = useState("");
  const [articleId, _setArticleId] = useState();
  const pubKey = useContext(pubKeyData);

  const handleCreateArticle = async () => {
    await createArticle(pubKey, title, content).then((id) =>
      _setArticleId(id)
    );
  };

  return (
    <div className="flex flex-col font-semibold bg-green-300 rounded-lg my-4 items-center border p-4 w-full">
      <div className="flex-wrap bg-emerald-400 w-full p-2 rounded-md sm:text-2xl font-bold text-center flex justify-between gap-3 items-center">
        Create Article
        <input
          type="text"
          className="sm:w-full p-2 rounded-md"
          placeholder="Enter Article Title"
          onChange={(e) => _setTitle(e.target.value)}
        />
        <input
          type="text"
          className="sm:w-full p-2 rounded-md"
          placeholder="Enter Article Content"
          onChange={(e) => _setContent(e.target.value)}
        />
        <button
          className="text-lg hover:bg-violet-500 bg-orange-700 rounded-md p-1 font-bold text-white"
          onClick={handleCreateArticle}
        >
          Create
        </button>
      </div>
      <div>
        <div className="text-2xl">Article ID</div>
        <div className="text-2xl bg-cyan-300 p-4 border-4 border-black">
          {articleId}
        </div>
      </div>
    </div>
  );
};
