<p align="center">
  <img width="128" alt="Taskflow logo" src="https://github.com/user-attachments/assets/f20fb3f4-992f-44e8-9167-d754a6f427a3" />
  <h1 align="center">Taskflow</h1>
</p>

A REST API for managing tasks and team responsibilities.

See the [Project Overview](docs/project.md) for the project's purpose, scenario, and system summary.

## Screenshots

<table>
  <tr>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/191e5071-aa68-40a4-bfc0-e4eba3068266" alt="Create task using Postman screenshot" width="480">
        <figcaption>Create a task using Postman.</figcaption>
      </figure>
    </td>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/1b0ba0e0-d88a-40c7-844e-6987d77bc74a" alt="List and filter tasks using Postman screenshot" width="480">
        <figcaption>List and filter tasks using Postman.</figcaption>
      </figure>
    </td>
  </tr>
  <tr>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/2bbe965e-735c-49a8-ae17-a9edaafbbc15" alt="View task by ID using Postman screenshot" width="480">
        <figcaption>View a task by ID using Postman.</figcaption>
      </figure>
    </td>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/316e2e99-de05-43a1-8605-fba76e68d434" alt="Update task using Postman screenshot" width="480">
        <figcaption>Update a task using Postman.</figcaption>
      </figure>
    </td>
  </tr>
  <tr>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/101f310b-3450-4244-bac3-75a406d33644" alt="Partially update task using Postman screenshot" width="480">
        <figcaption>Partially update a task using Postman.</figcaption>
      </figure>
    </td>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/db1186e0-0b95-4e59-a51d-a3bdf2253481" alt="Delete task using Postman screenshot" width="480">
        <figcaption>Delete a task using Postman.</figcaption>
      </figure>
    </td>
  </tr>
  <tr>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/a5cd05b6-6728-4933-8968-ebe5edba74eb" alt="Search tasks by title or description using Postman screenshot" width="480">
        <figcaption>Search tasks by title or description using Postman.</figcaption>
      </figure>
    </td>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/65f34720-315d-4cfc-a547-f37afe31edda" alt="Assign task using Postman screenshot" width="480">
        <figcaption>Assign a task using Postman.</figcaption>
      </figure>
    </td>
  </tr>
</table>

See [all Postman and Swagger UI screenshots](docs/screenshots.md).

## Requirements

- Node.js `v24.10.0` or a newer release in the `24.x` series
- `npm`
- Docker and Docker Compose (optional; only needed to run with Docker)

## Setup

### Clone the repository using one of these methods:

#### HTTPS
```sh
git clone https://github.com/Asim-Tahir/taskflow-be.git
```

#### SSH
```sh
git clone git@github.com:Asim-Tahir/taskflow-be.git
```

#### GitHub CLI
```sh
gh repo clone Asim-Tahir/taskflow-be
```

### Change to the project directory:
```sh
cd taskflow-be
```

### Install dependencies
```sh
npm install
```

### For environment variables that load each environment (test, dev, prod)
```sh
cp .env.example .env
```

### For environment variables that load only for development environment
```sh
cp .env.development.example .env.development
```

### For environment variables that load only for test environment (e2e, unit)
```sh
cp .env.test.example .env.test
```

### For environment variables that load only for production environment
```sh
cp .env.production.example .env.production
```

### Start the development server
```sh
npm run dev
```

By default, the server listens at [`http://localhost:3000`](http://localhost:3000). The API base path is `/api/v1`. Open Swagger UI at [`http://localhost:3000/swagger`](http://localhost:3000/swagger). For local runs, set `PORT` in `.env.development` to use a different port in development.

To run without automatically restarting when files change:
```sh
npm start
```

### Run with Docker Compose

Compose requires both `.env` and `.env.development`:

```sh
cp .env.example .env
```

```sh
cp .env.development.example .env.development
```

```sh
docker compose up --build -d
```

## Testing

### Health check

With the server running, check the health endpoint:

```sh
curl -H "Accept: application/json" http://localhost:3000/api/v1/health
```

### Automated tests

Run the tests with
```sh
npm test
```

## Data and API documentation

Tasks are loaded from `src/data/tasks.json`. Changes made through the API are written back to this file and persist when the server restarts.

View the OpenAPI JSON at [`http://localhost:3000/openapi.json`](http://localhost:3000/openapi.json).

View Swagger UI at [`http://localhost:3000/swagger`](http://localhost:3000/swagger).
