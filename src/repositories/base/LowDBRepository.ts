// oxlint-disable typescript/no-unsafe-type-assertion
import { randomUUID } from "node:crypto";

import type { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node";

import type { BaseEntitySchema } from "#schema";

import type IBaseRepository from "./IBaseRepository.ts";

export default class LowDBRepository<T extends BaseEntitySchema = BaseEntitySchema>
  implements IBaseRepository<T>, AsyncDisposable
{
  protected db: Low<T[]>;

  /**
   * Create {@link Low `lowdb`} backed repository
   * @param db {@link Low `lowdb`} instance
   */
  constructor(db: Low<T[]>) {
    this.db = db;
  }

  // @ts-ignore
  static db: Low<T[]>;
  // @ts-ignore
  static instance: LowDBRepository<T>;

  static async open(filename: string, defaultData: BaseEntitySchema[] = []) {
    if (!this.db) {
      this.db = await JSONFilePreset<BaseEntitySchema[]>(filename, defaultData);
    }

    this.instance ??= new this(this.db);

    return this.instance;
  }

  async [Symbol.asyncDispose]() {
    await this.writeFileAsync();
  }

  async readFileAsync() {
    await this.db.read();
  }

  async writeFileAsync() {
    await this.db.write();
  }

  async updateFileAsync(fn: (data: T[]) => unknown) {
    await this.db.update(fn);
  }

  generateId(): T["id"] {
    return randomUUID();
  }

  async getAllAsync(): Promise<T[]> {
    try {
      return this.db.data ?? [];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return [];
      }

      throw error;
    }
  }

  async getByIdAsync(id: T["id"]): Promise<T | undefined> {
    const entity = this.db.data.find((e) => e.id === id);

    return entity;
  }

  async createAsync(
    entityOrEntityFactory: Omit<T, keyof BaseEntitySchema> | (() => T),
  ): Promise<T> {
    let createdEntity: T;

    if (typeof entityOrEntityFactory === "function") {
      createdEntity = entityOrEntityFactory();
    } else {
      createdEntity = {
        ...entityOrEntityFactory,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: undefined,
      } as T;
    }

    this.db.data.push(createdEntity);

    return createdEntity;
  }

  async updateAsync(
    id: T["id"],
    entityOrEntityFactory: Omit<T, keyof BaseEntitySchema> | ((updatingEntity: T) => T),
  ): Promise<T> {
    const entityIndex = this.db.data.findIndex((entity) => entity.id === id);

    if (entityIndex < 0) {
      throw new Error(`Entity with ID "${id}" not found`);
    }

    const updatingEntity = this.db.data[entityIndex];
    let updatedEntity: T;

    if (typeof entityOrEntityFactory === "function") {
      updatedEntity = entityOrEntityFactory(updatingEntity);
    } else {
      updatedEntity = {
        ...entityOrEntityFactory,
        id,
        createdAt: updatingEntity.createdAt,
        updatedAt: new Date().toISOString(),
      } as T;
    }

    this.db.data[entityIndex] = updatedEntity;

    return updatedEntity;
  }

  async partialUpdateAsync(
    id: T["id"],
    entityOrEntityFactory: Partial<Omit<T, keyof BaseEntitySchema>> | ((updatingEntity: T) => T),
  ): Promise<T> {
    const entityIndex = this.db.data.findIndex((entity) => entity.id === id);

    if (entityIndex < 0) {
      throw new Error(`Entity with ID "${id}" not found`);
    }

    const partialUpdatingEntity = this.db.data[entityIndex];
    let partialUpdatedEntity: T;

    if (typeof entityOrEntityFactory === "function") {
      partialUpdatedEntity = entityOrEntityFactory(partialUpdatingEntity);
    } else {
      partialUpdatedEntity = {
        ...partialUpdatingEntity,
        ...entityOrEntityFactory,
        id,
        updatedAt: new Date().toISOString(),
      };
    }

    this.db.data[entityIndex] = partialUpdatedEntity;

    return partialUpdatedEntity;
  }

  async deleteAsync(id: T["id"]): Promise<T> {
    const entityIndex = this.db.data.findIndex((entity) => entity.id === id);

    if (entityIndex < 0) {
      throw new Error(`Entity with ID "${id}" not found`);
    }

    const [deletedEntity] = this.db.data.splice(entityIndex, 1);

    return deletedEntity;
  }
}
