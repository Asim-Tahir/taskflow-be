// oxlint-disable typescript/no-unsafe-type-assertion
import { randomUUID } from "node:crypto";

import type { BaseEntitySchema } from "#schema";
import { type Serializer, Serializers, readFile, writeFile } from "#utils";

import type IBaseRepository from "./IBaseRepository.ts";

export default class FileSystemRepository<T extends BaseEntitySchema = BaseEntitySchema> implements IBaseRepository<T>, AsyncDisposable {
  #filename: string;
  #defaultData: T[] = [];
  #serializer: Serializer<T[]>;

  protected data: T[] = [];

  /**
   * Creates a file-system backed repository.
   */
  constructor(
    filename: string,
    defaultData: T[],
    serializer: Serializer<T[]> = Serializers.object
  ) {
    this.#filename = filename;
    this.#defaultData = defaultData;
    this.#serializer = serializer;
  }

  // @ts-ignore
  static instance: FileSystemRepository<T>;

  static open<T extends BaseEntitySchema = BaseEntitySchema>(
    filename: string,
    defaultData: T[],
    serializer: Serializer<T[]> = Serializers.object
  ) {
    this.instance ??= new this(filename, defaultData, serializer);

    return this.instance;
  }

  async [Symbol.asyncDispose](): Promise<void> {
    if (!(await this.writeFileAsync())) {
      throw new Error(`Failed to write repository file "${this.#filename}"`);
    }
  }

  async readFileAsync(): Promise<T[]> {
    try {
      const content = await readFile(this.#filename);
      const data = this.#serializer.read(content);
      this.data = data;

      return this.data;
    } catch {
      this.data = structuredClone(this.#defaultData);
      return this.data;
    }
  };

  async writeFileAsync(): Promise<boolean> {
    try {
      const content = this.#serializer.write(this.data);
      return await writeFile(this.#filename, content);
    } catch {
      try {
        const content = this.#serializer.write(this.#defaultData);
        return await writeFile(this.#filename, content);
      } catch {
        return false;
      }
    }
  };

  generateId(): T["id"] {
    return randomUUID();
  }

  async getAllAsync(): Promise<T[]> {
    return this.data;
  }

  async getByIdAsync(id: T["id"]): Promise<T | undefined> {
    const entity = this.data.find((e) => e.id === id);

    return entity;
  }

  async createAsync(entityOrEntityFactory: Omit<T, keyof BaseEntitySchema> | (() => T)): Promise<T> {
    let createdEntity: T;
    
    if (typeof entityOrEntityFactory === "function") {
      createdEntity = entityOrEntityFactory();
    } else {
      createdEntity = {
        ...entityOrEntityFactory,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: undefined
      } as T;
    }

    this.data.push(createdEntity);

    return createdEntity;
  }

  async updateAsync(id: T["id"], entityOrEntityFactory: Omit<T, keyof BaseEntitySchema> | ((updatingEntity: T) => T)): Promise<T> {
    const entityIndex = this.data.findIndex((entity) => entity.id === id);

    if (entityIndex < 0) {
      throw new Error(`Entity with ID "${id}" not found`);
    }

    const updatingEntity = this.data[entityIndex];
    let updatedEntity: T;
    
    if (typeof entityOrEntityFactory === "function") {
      updatedEntity = entityOrEntityFactory(updatingEntity);
    } else {
      updatedEntity = {
        ...entityOrEntityFactory,
        id,
        createdAt: updatingEntity.createdAt,
        updatedAt: new Date().toISOString()
      } as T;
    }

    this.data[entityIndex] = updatedEntity;

    return updatedEntity;
  }

  async partialUpdateAsync(id: T["id"], entityOrEntityFactory: Partial<Omit<T, keyof BaseEntitySchema>> | ((updatingEntity: T) => T)): Promise<T> {
    const entityIndex = this.data.findIndex((entity) => entity.id === id);

    if (entityIndex < 0) {
      throw new Error(`Entity with ID "${id}" not found`);
    }

    const partialUpdatingEntity = this.data[entityIndex];
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

    this.data[entityIndex] = partialUpdatedEntity;

    return partialUpdatedEntity;
  }

  async deleteAsync(id: T["id"]): Promise<T> {
    const entityIndex = this.data.findIndex((entity) => entity.id === id);

    if (entityIndex < 0) {
      throw new Error(`Entity with ID "${id}" not found`);
    }

    const [deletedEntity] = this.data.splice(entityIndex, 1);

    return deletedEntity;
  }
;}