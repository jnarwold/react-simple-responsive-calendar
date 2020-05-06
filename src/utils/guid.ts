import { v4 } from 'uuid';

/**
 * Returns a new Guid when executed
 *
 * @export function
 * @returns string
 */
export function guid() {
  return v4();
}