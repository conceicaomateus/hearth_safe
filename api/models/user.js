const db = require('../database/index');

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async create() {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [this.name, this.email, this.password],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, name: this.name, email: this.email });
        }
      );
    });
  }

  static async getByEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
  }

  static async hasEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT 1 FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return reject(err);
        resolve(!!row);
      });
    });
  }

  static async find() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static async remove(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  }
}

// Criação da tabela se não existir
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`
);

// Criação do usuário padrão admin
User.hasEmail('admin').then(exists => {
  if (!exists) {
    const admin = new User('admin', 'admin', 'admin');
    admin.create().then(() => {
      console.log('Usuário admin criado');
    }).catch(err => {
      console.error('Erro ao criar usuário admin:', err);
    });
  }
});

module.exports = User;
