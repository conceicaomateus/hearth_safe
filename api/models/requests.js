const db = require("../database/index");

class Requests {
  static async create({ date, status, duration }) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO requests (date, status, duration) VALUES (?, ?, ?)",
        [date, status, duration],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, date, status, duration });
        }
      );
    });
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM requests ORDER BY date DESC", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = Requests;
