import assert from "node:assert/strict";
import { test } from "node:test";

import { PORT } from "#env";

const baseUrl = `http://127.0.0.1:${PORT}`;

void test("serves an OpenAPI document for the task routes", async () => {
  const response = await fetch(`${baseUrl}/openapi.json`);
  const document = await response.json();

  assert.equal(response.status, 200);
  assert.equal(document.openapi, "3.2.1");
  assert.equal(document.info.title, "Taskflow API");
  assert.deepEqual(document.servers, [{ url: "/", name: "v1" }]);
  assert.deepEqual(Object.keys(document.paths).toSorted(), [
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

test("documents response contracts and request examples", async () => {
  const response = await fetch(`${baseUrl}/openapi.json`);
  const document = await response.json();
  const healthSchema = document.paths["/api/v1/health"].get.responses["200"].content["application/json"].schema;

  assert.deepEqual(healthSchema.properties.data, { type: "null" });
  assert.equal(
    document.components.schemas.TaskListResponse.properties.total.description,
    "Number of stored tasks before filtering for task list, search, and assignee routes; number of tasks in the returned page for reports by status."
  );
  assert.equal(
    document.components.responses.InternalServerError.content["application/json"].schema.$ref,
    "#/components/schemas/InternalServerErrorResponse"
  );

  const methods = ["get", "post", "put", "patch", "delete"] as const;
  const paths = document.paths as Record<string, Partial<Record<(typeof methods)[number], {
    responses: Record<string, { $ref?: string }>;
  }>>>;
  const operations = Object.values(paths).flatMap((pathItem) =>
    methods.flatMap((method) => pathItem[method] ? [pathItem[method]] : [])
  );

  for (const operation of operations) {
    assert.equal(operation.responses["500"].$ref, "#/components/responses/InternalServerError");
  }

  assert.deepEqual(
    document.paths["/api/v1/tasks"].post.requestBody.content["application/json"].examples.createTask.value,
    {
      title: "Prepare release notes",
      description: "Collect the changes and prepare notes for the next release.",
      status: "pending",
      priority: "medium"
    }
  );
  assert.equal(
    document.components.responses.Task.content["application/json"].examples.task.value.data.id,
    "7138f7d9-bb6c-4fc3-a631-7a8ba0108784"
  );
});

void test("serves Swagger UI", async () => {
  const response = await fetch(`${baseUrl}/swagger`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /id="swagger-ui"/);
  assert.match(html, /\/swagger\/swagger-ui-bundle\.js/);
  assert.match(html, /url: "\/openapi\.json"/);

  const assetResponse = await fetch(`${baseUrl}/swagger/swagger-ui-bundle.js`, {
    headers: { Range: "bytes=0-1023" }
  });
  assert.equal(assetResponse.status, 206);
  assert.match(assetResponse.headers.get("content-type") ?? "", /javascript/);
  await assetResponse.arrayBuffer();
});
