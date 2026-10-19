CREATE TABLE IF NOT EXISTS study_records (
  username TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
