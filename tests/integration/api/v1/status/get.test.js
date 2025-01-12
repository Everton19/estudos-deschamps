test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3002/api/v1/status")
  expect(response.status).toBe(200)

  const responseBody = await response.json();

  expect(responseBody.update_at).toBeDefined();
  const parsedUpadateAt = new Date(responseBody.update_at).toISOString();
  expect(parsedUpadateAt).toEqual(responseBody.update_at);
  
  const postgreVersion = responseBody.dependencies.database.postgres_version;
  expect(postgreVersion).toBeDefined();
  expect(postgreVersion).toEqual('9.3.25');

  const maxConnections = parseInt(responseBody.dependencies.database.max_connections);
  expect(maxConnections).toBeGreaterThan(0);
  expect(maxConnections).toEqual(100);

  const actual_connections = responseBody.dependencies.database.actual_connections;
  expect(actual_connections).toEqual(1);
})