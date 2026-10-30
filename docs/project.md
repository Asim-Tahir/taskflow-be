# Taskflow Project Overview

## Purpose

Taskflow is a REST API for tracking a software team's tasks and team members' responsibilities. The project brings together hands-on server development, API design, routing, middleware, and CRUD operations using Node.js and Express.js.

## Scenario

A software company needs to track work and responsibilities across its team. Team members should be able to create tasks, assign them to a person responsible, track status and priority, view task details, and update or delete tasks when needed.

## System Summary

Taskflow is a Node.js and Express.js API that uses JSON requests and responses. Tasks can be created, listed, viewed, updated, assigned, and deleted. A task has a title, description, status, priority, and optional assignee. Status and priority values are limited to defined options.

## Features

### Core Scope

- Create, list, view, assign, update, and delete tasks (CRUD).
- Logger middleware that records the request method, URL, and timestamp.

### Additional Features

- Health check endpoint.
- Filter tasks by status, priority, title, description, and assignee.
- Search task titles and descriptions.
- Sort tasks by field and direction.
- Input validation middleware.
- Reports grouped by status, priority, and assignee.
- Summary reports.
- Pagination for tasks responses.
- Logger middleware also records the response status code and status text.
