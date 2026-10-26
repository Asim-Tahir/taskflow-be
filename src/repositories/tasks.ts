import type { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node";

import { TASKS_DATA_PATH } from "#constants";
import type { TaskCreateSchema, TaskPartialUpdateSchema, TaskSchema, TaskUpdateSchema } from "#schema";
import { Serializers } from '#utils';

import { FileSystemRepository, LowDBRepository } from "./base/index.ts";

export class TasksLowDBRepository extends LowDBRepository<TaskSchema> {
  static instance: TasksLowDBRepository;
  static db: Low<TaskSchema[]>;

  static async open() {
    if (!this.db) {
      this.db = await JSONFilePreset<TaskSchema[]>(TASKS_DATA_PATH, []);
    }

    this.instance = this.instance ?? new this(this.db);

    return this.instance;
  }

  async createAsync(entityOrEntityFactory: TaskCreateSchema | (() => TaskSchema)): Promise<TaskSchema> {
    const createdEntity = typeof entityOrEntityFactory === "function" ? entityOrEntityFactory() : entityOrEntityFactory;
    
    return super.createAsync(() => ({
      ...createdEntity,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
      status: "pending"
    }));
  }

  async updateAsync(
    id: TaskSchema["id"],
    entityOrEntityFactory: TaskUpdateSchema | ((updatingTask: TaskSchema) => TaskSchema)
  ): Promise<TaskSchema> {
    return super.updateAsync(id, (updatingEntity) => {
      const updatedEntity = typeof entityOrEntityFactory === "function" ? entityOrEntityFactory(updatingEntity) : entityOrEntityFactory;

      return {
        ...updatedEntity,
        id,
        updatedAt: new Date().toISOString(),
        createdAt: updatingEntity.createdAt
      }
    });
  }

  async partialUpdateAsync(
    id: TaskSchema["id"],
    entity: TaskPartialUpdateSchema
  ): Promise<TaskSchema> {
    return super.partialUpdateAsync(id, (updatingEntity) => ({
      ...updatingEntity,
      ...entity,
      id,
      updatedAt: new Date().toISOString(),
    }))
  }

  async getAllByAssigneeAsync(assignee: TaskSchema["assignee"]): Promise<TaskSchema[]> {
    const assigneeTasks = this.db.data.filter((task) => task.assignee === assignee);

    return assigneeTasks;
  }

  async assignAsync(
    id: TaskSchema["id"],
    assignee: TaskSchema["assignee"]
  ): Promise<TaskSchema> {
    return super.partialUpdateAsync(id, (updatingEntity) => ({
      ...updatingEntity,
      assignee,
      id,
      updatedAt: new Date().toISOString(),
    }))
  }
}

export class TasksFileSystemRepository extends FileSystemRepository<TaskSchema> {
  static instance: TasksFileSystemRepository;

  static open() {
    this.instance = this.instance ?? new this(TASKS_DATA_PATH, [], Serializers.object);

    return this.instance;
  }

  async createAsync(entityOrEntityFactory: TaskCreateSchema | (() => TaskSchema)): Promise<TaskSchema> {
    const createdEntity = typeof entityOrEntityFactory === "function" ? entityOrEntityFactory() : entityOrEntityFactory;
    
    return super.createAsync(() => ({
      ...createdEntity,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
      status: "pending"
    }));
  }

  async updateAsync(
    id: TaskSchema["id"],
    entityOrEntityFactory: TaskUpdateSchema | ((updatingTask: TaskSchema) => TaskSchema)
  ): Promise<TaskSchema> {
    return super.updateAsync(id, (updatingEntity) => {
      const updatedEntity = typeof entityOrEntityFactory === "function" ? entityOrEntityFactory(updatingEntity) : entityOrEntityFactory;

      return {
        ...updatedEntity,
        id,
        updatedAt: new Date().toISOString(),
        createdAt: updatingEntity.createdAt
      }
    });
  }

  async partialUpdateAsync(
    id: TaskSchema["id"],
    entity: TaskPartialUpdateSchema
  ): Promise<TaskSchema> {
    return super.partialUpdateAsync(id, (updatingEntity) => ({
      ...updatingEntity,
      ...entity,
      id,
      updatedAt: new Date().toISOString(),
    }))
  }

  async getAllByAssigneeAsync(assignee: TaskSchema["assignee"]): Promise<TaskSchema[]> {
    const assigneeTasks = this.data.filter((task) => task.assignee === assignee);

    return assigneeTasks;
  }

  async assignAsync(
    id: TaskSchema["id"],
    assignee: TaskSchema["assignee"]
  ): Promise<TaskSchema> {
    return super.partialUpdateAsync(id, (updatingEntity) => ({
      ...updatingEntity,
      assignee,
      id,
      updatedAt: new Date().toISOString(),
    }))
  }
}