module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/events.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/events.db3',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {directory: './data/seeds'},
  },
};
