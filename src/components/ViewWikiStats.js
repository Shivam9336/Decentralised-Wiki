import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { viewWikiStats } from "./Soroban";

export const ViewWikiStats = () => {
  const [statsData, _setStatsData] = useState();
  const pubKey = useContext(pubKeyData);

  const handleViewWikiStats = async () => {
    await viewWikiStats(pubKey).then((data) => _setStatsData(data));
  };

  return (
    <div className="flex flex-wrap flex-col font-semibold bg-purple-300 rounded-lg my-4 items-center border p-4">
      <div className="flex-wrap bg-purple-400 w-full p-2 rounded-md sm:text-2xl font-bold text-center flex justify-between gap-3 items-center">
        Wiki Stats
        <button
          className="text-lg hover:bg-violet-500 bg-orange-700 rounded-md p-1 font-bold text-white"
          onClick={handleViewWikiStats}
        >
          Fetch Stats
        </button>
      </div>
      <div className="w-full mt-4">
        <div className="text-2xl">Statistics</div>
        <div className="text-lg bg-cyan-300 p-4 border-4 border-black space-y-1">
          {statsData ? (
            <>
              <div><span className="font-bold">Total Articles:</span> {String(statsData.total)}</div>
              <div><span className="font-bold">Active Articles:</span> {String(statsData.active)}</div>
              <div><span className="font-bold">Archived Articles:</span> {String(statsData.archived)}</div>
            </>
          ) : (
            <div>No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
};
