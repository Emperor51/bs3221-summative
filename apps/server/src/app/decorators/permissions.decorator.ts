import { SetMetadata } from '@nestjs/common';

/**
 * Decorator for checking permissions.
 * @param permissions - The required permissions.
 */
export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions);

/**
 * Decorator for checking self-permissions dynamically.
 * @param permission - The required permission.
 * @param entity - The entity name (as registered in TypeORM).
 * @param field - The field that links the entity to the user.
 */
export const SelfPermission = (permission: string, entity: string, field: string) =>
  SetMetadata('selfPermission', { permission, entity, field });
