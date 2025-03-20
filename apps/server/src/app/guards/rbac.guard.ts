import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException('Unauthorized access');

    // Standard RBAC Check
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (requiredPermissions) {
      const foundUser = await this.userRepository.findOne({
        where: { id: user.id },
        relations: ['role', 'role.permissions'],
      });

      if (!foundUser) throw new ForbiddenException('User not found');

      const userPermissions = foundUser.role.permissions.map((p) => p.name);
      const hasAllPermissions = requiredPermissions.every((perm) => userPermissions.includes(perm));

      if (hasAllPermissions) {
        return true;
      }
    }

    // Self-Permission Check
    const selfPermissionMetadata = this.reflector.get<{ permission: string, entity: string, field: string }>('selfPermission', context.getHandler());
    if (selfPermissionMetadata) {
      const { permission, entity, field } = selfPermissionMetadata;

      const foundUser = await this.userRepository.findOne({
        where: { id: user.id },
        relations: ['role', 'role.permissions'],
      });

      if (!foundUser) throw new ForbiddenException('User not found');

      const userPermissions = foundUser.role.permissions.map((p) => p.name);
      const hasPermission = userPermissions.includes(permission);

      if (hasPermission) {
        // Get entity repository dynamically
        const repository = this.dataSource.getRepository(entity);

        // Get entity ID from request parameters (assumes entity ID is in :id param)
        const entityId = request.params.id;
        if (!entityId) throw new ForbiddenException('Entity ID is required');

        // Fetch entity from the database
        const entityInstance = await repository.findOne({
          where: { id: entityId },
          select: [field], // Only fetch the ownership field
        });

        if (!entityInstance) throw new ForbiddenException(`${entity} not found`);

        // Compare the entity's field value with the logged-in user's ID
        if (entityInstance[field] !== user.id) {
          throw new ForbiddenException('You do not have permission to update this resource');
        }

        return true;
      }
    }

    throw new ForbiddenException('Insufficient permissions');
  }
}
