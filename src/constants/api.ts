/**
 * Constants for CRUD methods used in API requests
 */
export const CRUD_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const
export type CrudMethod = (typeof CRUD_METHODS)[keyof typeof CRUD_METHODS]
