import database from 'infra/database.js';

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const postgresVersion = await database.query("SHOW server_version;");
  const resultVersion = postgresVersion.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections;");
  const resultMaxConnections = maxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const actualConnections = await database.query({
    text:"SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const resultActualConnections = actualConnections.rows[0].count;

  res.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        postgres_version: resultVersion,
        max_connections: resultMaxConnections,
        actual_connections: resultActualConnections,
      },
    },
  });
}

export default status;