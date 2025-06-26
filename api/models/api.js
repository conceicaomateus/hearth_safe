const db = require("../database/index");

class Api {
  static generateKey() {
    return Math.random().toString(36).substring(2, 15);
  }

  static async create(userId) {
    const key = this.generateKey();
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO api_keys (key, userId) VALUES (?, ?)",
        [key, userId],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, key, userId });
        }
      );
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM api_keys WHERE userId = ?",
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static async findByKey(apiKey) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM api_keys WHERE key = ?", [apiKey], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
}

// Criação da tabela se não existir
db.run(
  `CREATE TABLE IF NOT EXISTS api_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`
);

db.run(
  `CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    status TEXT NOT NULL,
    duration REAL NOT NULL
  )`
);

module.exports = Api;
