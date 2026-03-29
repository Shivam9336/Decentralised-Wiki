# Decentralised WIKI

---

## Table of Contents

- [Project Title](#decentralised-wiki)
- [Project Description](#project-description)
- [Project Vision](#project-vision)
- [Key Features](#key-features)
- [Future Scope](#future-scope)
- [Contract Functions](#contract-functions)
- [Data Structures](#data-structures)
- [Getting Started](#getting-started)

---

## Project Description

**Decentralised WIKI** is a blockchain-based knowledge management platform built on the **Stellar network** using the **Soroban smart contract SDK**. It enables anyone to create, update, and archive wiki-style articles that are stored immutably on-chain — without relying on any central authority, server, or database.

Unlike traditional wikis (e.g., Wikipedia) where content is controlled by a centralised organisation and can be censored, taken down, or altered without community consensus, Decentralised WIKI puts content ownership directly in the hands of contributors. Every article, edit, and archival action is recorded transparently on the Stellar ledger, making the entire knowledge base auditable, tamper-resistant, and permanently accessible.

---
## Screenshots 

- Create Article  
<img width="2128" height="1051" alt="Screenshot 2026-03-29 155842" src="https://github.com/user-attachments/assets/912dd600-a4c7-4e37-aa98-242181aba1c7" />

- Update Article 
<img width="2104" height="783" alt="Screenshot 2026-03-29 160011" src="https://github.com/user-attachments/assets/b4cb6db7-0503-4282-abee-389194947488" />

- Archive Article 
<img width="2157" height="632" alt="image" src="https://github.com/user-attachments/assets/0a5927b6-fcc7-481c-a7ad-438d4285c421" />

- View Article 
<img width="2159" height="1098" alt="Screenshot 2026-03-29 160335" src="https://github.com/user-attachments/assets/6aa2b020-18e0-44cf-83b8-b0135c326e0e" />

- Wiki Statistics 
<img width="2159" height="641" alt="Screenshot 2026-03-29 160403" src="https://github.com/user-attachments/assets/928a3ffd-2fe5-465c-8c03-287ece5bb3a2" />

---

## Project Vision

The vision of Decentralised WIKI is to create a **censorship-resistant, community-owned encyclopedia** for the decentralised web — where knowledge is a public good that no single entity can control, suppress, or monetise without contributor consent.

We believe that:

- **Information should be free and permanently accessible** — not subject to server outages, corporate decisions, or government censorship.
- **Contributors deserve transparency** — every change to an article should be traceable on a public ledger.
- **Trust should be earned through consensus, not authority** — the community, not a central editor, should govern what knowledge is preserved.

By anchoring wiki content to the Stellar blockchain via Soroban smart contracts, Decentralised WIKI lays the foundation for a new generation of open-knowledge platforms where truth is verified by code, not by institutions.

---

## Key Features

- **On-Chain Article Creation** — Any user can publish a new wiki article directly to the Stellar blockchain. Each article is assigned a unique, auto-incremented ID and timestamped using the ledger clock.

- **Immutable Edit History** — Article updates record the `updated_at` ledger timestamp alongside the new content, providing a transparent audit trail of changes without storing a full history (upgradeable in future scope).

- **Decentralised Archival** — Instead of deleting articles (impossible on a blockchain), articles can be *archived* — flagged as inactive while their content remains permanently readable on-chain. This preserves the historical record.

- **Global Wiki Statistics** — A real-time stats tracker (`WikiStats`) keeps count of total, active, and archived articles across the entire platform, giving anyone a bird's-eye view of the knowledge base.

- **No Central Authority** — There is no admin key, owner wallet, or privileged role in this contract. Any address can create or update articles, embodying the true spirit of open-source knowledge.

- **Soroban-Native Storage with TTL Management** — All data is stored using Soroban's instance storage with TTL extension (`extend_ttl`), ensuring data persistence across ledger epochs.

---

## Future Scope

The current contract is a minimal, functional foundation. The following enhancements are planned for future versions:

| Feature | Description |
|---|---|
| **Version History** | Store a full edit history for each article so readers can browse previous versions, similar to Wikipedia's revision log. |
| **Contributor Identity** | Link articles and edits to Stellar wallet addresses, enabling contributor reputation scores and attribution. |
| **Voting & Governance** | Introduce a community voting mechanism (via token-weighted or one-address-one-vote models) to approve or reject edits to high-importance articles. |
| **Category & Tag System** | Allow articles to be tagged with categories stored on-chain, enabling decentralised search and discovery. |
| **Cross-Contract Linking** | Enable articles to reference other on-chain articles or external Stellar assets, creating a rich, interconnected knowledge graph. |
| **Tokenised Incentives** | Reward contributors with platform tokens (Stellar custom assets) for creating high-quality articles that receive community upvotes. |
| **IPFS / Off-Chain Content Anchoring** | For large articles, store content on IPFS and anchor only the content hash on-chain — reducing storage costs while preserving verifiability. |
| **Multi-Language Support** | Allow multiple language variants of the same article to coexist under a single article ID. |

---

## Contract Functions

| Function | Type | Description |
|---|---|---|
| `create_article(title, content)` | Write | Creates a new on-chain wiki article; returns its unique `article_id`. |
| `update_article(article_id, new_title, new_content)` | Write | Updates the title and/or content of an existing, non-archived article. |
| `archive_article(article_id)` | Write | Marks an active article as archived; it remains readable but cannot be edited. |
| `view_article(article_id)` | Read | Returns the full `Article` struct for the given ID. |
| `view_wiki_stats()` | Read | Returns global `WikiStats` (total, active, archived counts). |

---

## Data Structures

### `Article`
```rust
pub struct Article {
    pub article_id:  u64,    // Unique auto-incremented ID
    pub title:       String, // Article title
    pub content:     String, // Article body/content
    pub created_at:  u64,    // Ledger timestamp of creation
    pub updated_at:  u64,    // Ledger timestamp of last update
    pub is_archived: bool,   // Whether the article is archived
}
```

### `WikiStats`
```rust
pub struct WikiStats {
    pub total:    u64, // Total articles ever created
    pub active:   u64, // Currently active articles
    pub archived: u64, // Archived articles
}
```

---

## Getting Started

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) with `wasm32-unknown-unknown` target
- [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup)
- A Stellar Testnet account funded via [Friendbot](https://friendbot.stellar.org)

### Build

```bash
cargo build --target wasm32-unknown-unknown --release
```

### Deploy to Testnet

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/decentralised_wiki.wasm \
  --network testnet \
  --source <YOUR_SECRET_KEY>
```

### Invoke: Create an Article

```bash
soroban contract invoke \
  --id <CONTRACT_ID> \
  --network testnet \
  --source <YOUR_SECRET_KEY> \
  -- create_article \
  --title "Blockchain Basics" \
  --content "Blockchain is a distributed ledger technology..."
```

### Invoke: View an Article

```bash
soroban contract invoke \
  --id <CONTRACT_ID> \
  --network testnet \
  -- view_article \
  --article_id 1
```

---



## Contract details
Contract id:CBYP7IH4FNCRMY5DV2TSJXKZTFF7HRZX57GPP73AUSLUVIUV6REJKVHZ
<img width="2143" height="1219" alt="image" src="https://github.com/user-attachments/assets/1002881b-7e84-47b0-a57d-3cc1de8b60dd" />
