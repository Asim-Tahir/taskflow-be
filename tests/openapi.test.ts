import assert from "node:assert/strict";
import { test } from "node:test";

import { PORT } from "#env";

const baseUrl = `http://127.0.0.1:${PORT}`;

test("serves an OpenAPI document for the task routes", async () => {
  const response = await fetch(`${baseUrl}/openapi.json`);
  const document = await response.json();

  assert.equal(response.status, 200);
  assert.equal(document.openapi, "3.2.1");
  assert.equal(document.info.title, "Taskflow API");
  assert.deepEqual(document.servers, [{ url: "/", name: "v1" }]);
  assert.deepEqual(Object.keys(document.paths).sort(), [
    "/api/v1/health",
    "/api/v1/reports/summary",
    "/api/v1/reports/{status}",
    "/api/v1/tasks",
    "/api/v1/tasks/assignee/{assignee}",
    "/api/v1/tasks/search",
    "/api/v1/tasks/{id}",
    "/api/v1/tasks/{id}/assign/{assignee}"
  ]);
  assert.ok(document.paths["/api/v1/tasks/{id}"].patch);
});

test("serves Swagger UI", async () => {
  const response = await fetch(`${baseUrl}/swagger`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /id="swagger-ui"/);
  assert.match(html, /\/swagger\/assets\/swagger-ui-bundle\.js/);
  assert.match(html, /url: "\/openapi\.json"/);

  const assetResponse = await fetch(`${baseUrl}/swagger/assets/swagger-ui-bundle.js`, {
    headers: { Range: "bytes=0-1023" }
  });
  assert.equal(assetResponse.status, 206);
  assert.match(assetResponse.headers.get("content-type") ?? "", /javascript/);
  await assetResponse.arrayBuffer();
});
