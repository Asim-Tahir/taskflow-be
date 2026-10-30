# Agent Instructions

## Project

Taskflow is a Node.js 24 and Express REST API for managing tasks. The API base path is `/api/v1`; task routes currently use the LowDB-backed `TasksLowDBRepository`.

## Development

- Use Node.js 24.x, version 24.10.0 or newer.
- Install dependencies with `npm install`.
- Start development with `npm run dev`.
- Run tests with `npm test`.
- Tests start the app in-process through `tests/setup-tests.ts`; they do not require a separate running server.
- Check lint with `npm run lint`.
- Check formatting with `npm run fmt`.
- Use the existing npm scripts; there is no separate type-check script.

## Code Organization

- Keep changes within the existing structure: routes in `src/routers`, middleware in `src/middlewares`, validation in `src/validators`, schemas in `src/schema`, and persistence in `src/repositories`.
- Follow nearby patterns before introducing a new abstraction or layer.
- Use the project's `#...` import aliases where they already apply.
- Keep request validation and schema definitions consistent with the API behavior.

## API and Tests

- Preserve existing REST response and error contracts.
- The OpenAPI document is `public/openapi.json`, served at `/openapi.json`; keep it in sync with endpoint or schema changes.
- When changing an endpoint or schema, update the relevant tests.
- Add or update focused tests for behavior changes.
- Avoid adding dependencies when existing project utilities are sufficient.
