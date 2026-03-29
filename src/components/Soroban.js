import {
  Contract,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
  scValToNative,
  rpc as StellarRpc,
} from "@stellar/stellar-sdk";

import { userSignTransaction } from "./Freighter";

/* ================= Config ================= */

const RPC_URL = "https://soroban-testnet.stellar.org:443";
const NETWORK = Networks.TESTNET;

const CONTRACT_ADDRESS =
  "CBYP7IH4FNCRMY5DV2TSJXKZTFF7HRZX57GPP73AUSLUVIUV6REJKVHZ"; // Replace after deployment

const server = new StellarRpc.Server(RPC_URL);

const TX_PARAMS = {
  fee: BASE_FEE,
  networkPassphrase: NETWORK,
};

/* ================= Helpers ================= */

const stringToScVal = (value) => nativeToScVal(value);
const numberToU64   = (value) => nativeToScVal(value, { type: "u64" });

/* ================= Core Contract Interaction ================= */

async function contractInt(caller, fnName, values) {
  // 1. Load account
  const sourceAccount = await server.getAccount(caller);
  const contract = new Contract(CONTRACT_ADDRESS);

  // 2. Build transaction
  const builder = new TransactionBuilder(sourceAccount, TX_PARAMS);

  if (Array.isArray(values)) {
    builder.addOperation(contract.call(fnName, ...values));
  } else if (values !== undefined && values !== null) {
    builder.addOperation(contract.call(fnName, values));
  } else {
    builder.addOperation(contract.call(fnName));
  }

  const tx = builder.setTimeout(30).build();

  // 3. Prepare transaction
  const preparedTx = await server.prepareTransaction(tx);

  // 4. Convert to XDR
  const xdr = preparedTx.toXDR();

  // 5. Sign with Freighter
  const signed = await userSignTransaction(xdr, caller);

  const signedTx = TransactionBuilder.fromXDR(signed.signedTxXdr, NETWORK);

  // 6. Send transaction
  const send = await server.sendTransaction(signedTx);

  // 7. Poll for result
  for (let i = 0; i < 10; i++) {
    const res = await server.getTransaction(send.hash);

    if (res.status === "SUCCESS") {
      if (res.returnValue) {
        return scValToNative(res.returnValue);
      }
      return null;
    }

    if (res.status === "FAILED") {
      throw new Error("Transaction failed");
    }

    await new Promise((r) => setTimeout(r, 1000));
  }

  throw new Error("Transaction timeout");
}

/* ================= Contract Functions ================= */

// WRITE: Creates a new wiki article on-chain. Returns the new article_id (u64).
async function createArticle(caller, title, content) {
  try {
    const values = [stringToScVal(title), stringToScVal(content)];
    const result = await contractInt(caller, "create_article", values);

    console.log("Article created with ID:", Number(result));
    return Number(result);
  } catch (error) {
    console.error("createArticle failed:", error);
    throw error;
  }
}

// WRITE: Updates the title and content of an existing non-archived article.
async function updateArticle(caller, articleId, newTitle, newContent) {
  try {
    const values = [
      numberToU64(articleId),
      stringToScVal(newTitle),
      stringToScVal(newContent),
    ];
    await contractInt(caller, "update_article", values);

    console.log("Article updated:", articleId);
    return true;
  } catch (error) {
    console.error("updateArticle failed:", error);
    throw error;
  }
}

// WRITE: Archives an active article by its article_id.
async function archiveArticle(caller, articleId) {
  try {
    const value = numberToU64(articleId);
    await contractInt(caller, "archive_article", value);

    console.log("Article archived:", articleId);
    return true;
  } catch (error) {
    console.error("archiveArticle failed:", error);
    throw error;
  }
}

// READ: Fetches a single article struct by article_id.
async function viewArticle(caller, articleId) {
  try {
    const value  = numberToU64(articleId);
    const result = await contractInt(caller, "view_article", value);

    console.log("Fetched article:", result);
    return result;
  } catch (error) {
    console.error("viewArticle failed:", error);
    throw error;
  }
}

// READ: Fetches the global WikiStats (total, active, archived counts).
async function viewWikiStats(caller) {
  try {
    const result = await contractInt(caller, "view_wiki_stats", null);

    console.log("Wiki stats:", result);
    return result;
  } catch (error) {
    console.error("viewWikiStats failed:", error);
    throw error;
  }
}

/* ================= Exports ================= */

export {
  createArticle,
  updateArticle,
  archiveArticle,
  viewArticle,
  viewWikiStats,
};
