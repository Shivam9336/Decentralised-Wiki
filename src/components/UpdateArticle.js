import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { updateArticle } from "./Soroban";

export const UpdateArticle = () => {
  const [articleId, _setArticleId] = useState("");
  const [newTitle,  _setNewTitle]  = useState("");
  const [newContent,_setNewContent]= useState("");
  const [status,    _setStatus]    = useState();
  const pubKey = useContext(pubKeyData);

  const handleUpdateArticle = async () => {
    await updateArticle(pubKey, Number(articleId), newTitle, newContent).then(
      () => _setStatus("Article updated successfully!")
    );
  };

  return (
    <div className="flex flex-wrap flex-col font-semibold bg-blue-300 rounded-lg my-4 items-center border p-4">
      <div className="flex-wrap bg-blue-400 w-full p-2 rounded-md sm:text-2xl font-bold text-center flex justify-between gap-3 items-center">
        Update Article
        <input
          type="text"
          className="sm:w-full p-2 rounded-md"
          placeholder="Enter Article ID"
          onChange={(e) => _setArticleId(e.target.value)}
        />
        <input
          type="text"
          className="sm:w-full p-2 rounded-md"
          placeholder="Enter New Title"
          onChange={(e) => _setNewTitle(e.target.value)}
        />
        <input
          type="text"
          className="sm:w-full p-2 rounded-md"
          placeholder="Enter New Content"
          onChange={(e) => _setNewContent(e.target.value)}
        />
        <button
          className="text-lg hover:bg-violet-500 bg-orange-700 rounded-md p-1 font-bold text-white"
          onClick={handleUpdateArticle}
        >
          Update
        </button>
      </div>
      <div>
        <div className="text-2xl">Status</div>
        <div className="text-2xl bg-cyan-300 p-4 border-4 border-black">
          {status}
        </div>
      </div>
    </div>
  );
};
