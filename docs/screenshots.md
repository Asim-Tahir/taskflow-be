# Taskflow Screenshots

## Swagger UI

### Health

![Swagger UI health check endpoint screenshot](https://github.com/user-attachments/assets/adb3aa9e-b74a-49ff-815c-261e63a776e5)

### Tasks

![Swagger UI tasks endpoints screenshot](https://github.com/user-attachments/assets/4b7ac4f5-a45a-470a-90d4-35c70263fde3)

### Reports

![Swagger UI reports endpoints screenshot](https://github.com/user-attachments/assets/bc88873e-c58a-4648-ba63-3939f4bc24ed)

### Schemas

![Swagger UI schemas screenshot](https://github.com/user-attachments/assets/72e7c02b-c47b-4b12-87c9-5a9447790fb0)

## Postman

### Health Check

`GET` `/api/v1/health`

![Postman health check screenshot](https://github.com/user-attachments/assets/26e980c4-a1c6-49dc-81a1-e24749956e44)

### List and filter tasks (Paginated)

`GET` `/api/v1/tasks`

![Postman list and filter tasks screenshot](https://github.com/user-attachments/assets/1b0ba0e0-d88a-40c7-844e-6987d77bc74a)

### Get task by id

`GET` `/api/v1/tasks/:id`

![Postman task by id screenshot](https://github.com/user-attachments/assets/2bbe965e-735c-49a8-ae17-a9edaafbbc15)

### Create task

`POST` `/api/v1/tasks`

![Postman create task screenshot](https://github.com/user-attachments/assets/191e5071-aa68-40a4-bfc0-e4eba3068266)

### Update task

`PUT` `/api/v1/tasks/:id`

![Postman update task screenshot](https://github.com/user-attachments/assets/316e2e99-de05-43a1-8605-fba76e68d434)

### Partial update task

`PATCH` `/api/v1/tasks/:id`

![Postman partial update task screenshot](https://github.com/user-attachments/assets/101f310b-3450-4244-bac3-75a406d33644)

### Delete task

`DELETE` `/api/v1/tasks/:id`

![Postman delete task screenshot](https://github.com/user-attachments/assets/db1186e0-0b95-4e59-a51d-a3bdf2253481)

### Search tasks by title or description (Paginated)

`GET` `/api/v1/tasks/search?keyword=<keyword>`

![Postman search task by title or description screenshot](https://github.com/user-attachments/assets/a5cd05b6-6728-4933-8968-ebe5edba74eb)

### Filter tasks by assignee (Paginated)

`GET` `/api/v1/tasks/assignee/:assignee`

![Postman filter tasks by assignee screenshot](https://github.com/user-attachments/assets/2df84547-d9ec-4b27-8df8-ae400509d876)

### Assign task to assignee

`PATCH` `/api/v1/tasks/:id/assign/:assignee`

![Postman assign task to assignee screenshot](https://github.com/user-attachments/assets/65f34720-315d-4cfc-a547-f37afe31edda)
