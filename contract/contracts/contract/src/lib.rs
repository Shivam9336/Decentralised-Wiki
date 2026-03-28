#![allow(non_snake_case)]
#![no_std]
use soroban_sdk::{contract, contracttype, contractimpl, log, Env, Symbol, String, symbol_short};


// Tracks overall stats of all wiki articles on the platform
#[contracttype]
#[derive(Clone)]
pub struct WikiStats {
    pub total: u64,    // Total number of articles ever created
    pub active: u64,   // Number of currently active (non-archived) articles
    pub archived: u64, // Number of archived articles
}

// Symbol key for accessing the global WikiStats struct
const ALL_WIKI: Symbol = symbol_short!("ALL_WIKI");

// Counter key for generating unique article IDs
const COUNT_ART: Symbol = symbol_short!("C_ART");

// Enum to map each article to its unique ID in storage
#[contracttype]
pub enum Wikibook {
    Article(u64),
}

// Represents a single wiki article
#[contracttype]
#[derive(Clone)]
pub struct Article {
    pub article_id: u64,      // Unique ID of the article
    pub title: String,        // Title of the article
    pub content: String,      // Body / content of the article
    pub created_at: u64,      // Ledger timestamp when the article was created
    pub updated_at: u64,      // Ledger timestamp of the last update
    pub is_archived: bool,    // Whether the article has been archived
}


#[contract]
pub struct DecentralisedWikiContract;

#[contractimpl]
impl DecentralisedWikiContract {

    // -----------------------------------------------------------------------
    // FUNCTION 1: create_article
    // Creates a brand-new wiki article and stores it on-chain.
    // Returns the unique article_id of the newly created article.
    // -----------------------------------------------------------------------
    pub fn create_article(env: Env, title: String, content: String) -> u64 {

        // Increment the global article counter to get a fresh unique ID
        let mut count_art: u64 = env.storage().instance().get(&COUNT_ART).unwrap_or(0);
        count_art += 1;

        // Fetch current global stats (defaults to all-zero if first article)
        let mut stats = Self::view_wiki_stats(env.clone());

        // Capture the current ledger timestamp for created_at / updated_at
        let time = env.ledger().timestamp();

        // Build the new Article struct
        let article = Article {
            article_id: count_art,
            title: title.clone(),
            content: content.clone(),
            created_at: time,
            updated_at: time,
            is_archived: false,
        };

        // Update the global stats
        stats.total  += 1;
        stats.active += 1;

        // Persist everything to instance storage
        env.storage().instance().set(&Wikibook::Article(count_art), &article);
        env.storage().instance().set(&ALL_WIKI, &stats);
        env.storage().instance().set(&COUNT_ART, &count_art);

        // Extend TTL so data stays live
        env.storage().instance().extend_ttl(5000, 5000);

        log!(&env, "Article created with ID: {}", count_art);

        count_art // Return the new article's unique ID
    }


    // -----------------------------------------------------------------------
    // FUNCTION 2: update_article
    // Updates the content (and optionally the title) of an existing,
    // non-archived article identified by its article_id.
    // -----------------------------------------------------------------------
    pub fn update_article(env: Env, article_id: u64, new_title: String, new_content: String) {

        let mut article = Self::view_article(env.clone(), article_id);

        // Guard: article must exist and must not be archived
        if article.article_id == 0 {
            log!(&env, "Article ID {} not found!", article_id);
            panic!("Article not found!");
        }

        if article.is_archived {
            log!(&env, "Article ID {} is archived and cannot be updated!", article_id);
            panic!("Cannot update an archived article!");
        }

        // Apply the updates
        article.title      = new_title;
        article.content    = new_content;
        article.updated_at = env.ledger().timestamp();

        // Persist the updated article
        env.storage().instance().set(&Wikibook::Article(article_id), &article);
        env.storage().instance().extend_ttl(5000, 5000);

        log!(&env, "Article ID {} has been updated.", article_id);
    }


    // -----------------------------------------------------------------------
    // FUNCTION 3: archive_article
    // Marks an active article as archived so it can no longer be edited.
    // This is the decentralised equivalent of "deleting" — data stays on-chain
    // but is flagged as inactive.
    // -----------------------------------------------------------------------
    pub fn archive_article(env: Env, article_id: u64) {

        let mut article = Self::view_article(env.clone(), article_id);

        // Guard: article must exist and must not already be archived
        if article.article_id == 0 {
            log!(&env, "Article ID {} not found!", article_id);
            panic!("Article not found!");
        }

        if article.is_archived {
            log!(&env, "Article ID {} is already archived!", article_id);
            panic!("Article is already archived!");
        }

        // Flag the article as archived
        article.is_archived = true;
        article.updated_at  = env.ledger().timestamp();

        // Update the global stats
        let mut stats = Self::view_wiki_stats(env.clone());
        stats.active   -= 1;
        stats.archived += 1;

        // Persist changes
        env.storage().instance().set(&Wikibook::Article(article_id), &article);
        env.storage().instance().set(&ALL_WIKI, &stats);
        env.storage().instance().extend_ttl(5000, 5000);

        log!(&env, "Article ID {} has been archived.", article_id);
    }


    // -----------------------------------------------------------------------
    // FUNCTION 4 (view): view_article
    // Returns the full Article struct for the given article_id.
    // Returns a default "Not_Found" article if the ID does not exist.
    // -----------------------------------------------------------------------
    pub fn view_article(env: Env, article_id: u64) -> Article {

        let key = Wikibook::Article(article_id);

        env.storage().instance().get(&key).unwrap_or(Article {
            article_id:  0,
            title:       String::from_str(&env, "Not_Found"),
            content:     String::from_str(&env, "Not_Found"),
            created_at:  0,
            updated_at:  0,
            is_archived: false,
        })
    }


    // -----------------------------------------------------------------------
    // FUNCTION 5 (view): view_wiki_stats
    // Returns the global WikiStats (total, active, archived article counts).
    // -----------------------------------------------------------------------
    pub fn view_wiki_stats(env: Env) -> WikiStats {

        env.storage().instance().get(&ALL_WIKI).unwrap_or(WikiStats {
            total:    0,
            active:   0,
            archived: 0,
        })
    }
}