import type { BaseEntitySchema } from "#schema";

export default interface IBaseRepository<T extends BaseEntitySchema = BaseEntitySchema> {
  /**
   * Generate identifier for {@link T entity}
   * @returns generated identifier for {@link T entity}
   */
  generateId(): T["id"];

  /**
   * Get all {@link T entity}
   * @returns all {@link T entities}
   */
  getAllAsync(): Promise<T[]>;

  /**
   * Get {@link T entity} by {@link id}
   * @param id {@link T entity} identifier
   * @returns entity by {@link id}
   */
  getByIdAsync(id: T["id"]): Promise<T | undefined>;

  /**
   * Create {@link T entity}
   * @param entityOrEntityFactory entity to create or entity factory to create
   * @returns created {@link T entity}
   */
  createAsync(entityOrEntityFactory: Omit<T, keyof BaseEntitySchema> | (() => T)): Promise<T>;

  /**
   * Update {@link T entity}
   * @param id {@link T entity} identifier
   * @param entityOrEntityFactory entity to update or entity factory to update
   * @returns updated {@link T entity}
   */
  updateAsync(id: T["id"], entityOrEntityFactory: Omit<T, keyof BaseEntitySchema> | ((updatingEntity: T) => T)): Promise<T>;

  /**
   * Partially update {@link T entity}
   * @param id {@link T entity} identifier
   * @param entityOrEntityFactory entity to partially update or entity factory to partially update
   * @returns partially updated {@link T entity}
   */
  partialUpdateAsync(id: T["id"], entityOrEntityFactory: Partial<Omit<T, keyof BaseEntitySchema>> | ((updatingEntity: T) => T)): Promise<T>;

  /**
   * Delete {@link T entity} by {@link id}
   * @param id {@link T entity} identifier
   * @returns deleted {@link T entity}
   */
  deleteAsync(id: T["id"]): Promise<T>;
}
