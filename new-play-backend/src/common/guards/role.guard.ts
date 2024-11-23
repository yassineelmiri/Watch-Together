import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }


    // function toncheck if user role matches role
    matchRoles(roles: string[], userRole: string) {
        return roles.some((role) => role === userRole);
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const role = request.role;

        // check if user role matches role
        console.log(this.matchRoles(roles, role))
        if (this.matchRoles(roles, role)) {

            return true;
        }
        throw new UnauthorizedException('You do not have permission to only ' + roles + ' can')
    }
}