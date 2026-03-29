import React, { useState } from "react";
import {
  checkConnection,
  retrievePublicKey,
  getBalance,
} from "./Freighter";

const Header = ({ pubKey, setPubKey }) => {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance]     = useState("0");

  const connectWallet = async () => {
    try {
      const allowed = await checkConnection();

      if (!allowed) return alert("Permission denied");

      const key = await retrievePublicKey();
      const bal = await getBalance();

      setPubKey(key);
      setBalance(Number(bal).toFixed(2));
      setConnected(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 h-24 flex justify-between items-center px-6 md:px-10 shadow-2xl border-b border-slate-700">
      <div className="flex items-center gap-2">
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">D·WIKI</div>
        <div className="text-xs text-slate-400 font-semibold tracking-widest">Decentralised</div>
      </div>

      <div className="flex items-center gap-6">
        {pubKey && (
          <>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg text-slate-200 text-sm hover:bg-opacity-70 transition-all">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              {`${pubKey.slice(0, 6)}...${pubKey.slice(-4)}`}
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-opacity-20 border border-cyan-500 rounded-lg text-cyan-200 text-sm hover:bg-opacity-30 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5m-11-5v5m0 0h5M5.5 10h9m-9 4h9"/>
              </svg>
              <span>{balance} XLM</span>
            </div>
          </>
        )}

        <button
          onClick={connectWallet}
          disabled={connected}
          className={`px-6 py-3 rounded-lg font-bold text-white text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
            connected
              ? "bg-gradient-to-r from-emerald-500 to-green-600 cursor-not-allowed opacity-80"
              : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 hover:scale-105 active:scale-95"
          }`}
        >
          {connected ? "✓ Connected" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Header;
