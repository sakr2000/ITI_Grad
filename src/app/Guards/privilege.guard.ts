import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../Services/userData.service';
import { FieldPrivilegeDTO } from '../Models/FieldJob';

export const privilegeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = inject(UserDataService);
  const entity = route.data['entity'];
  const action = route.data['action'];
  if (userData.getUserData()?.role.includes('Admin')) return true;
  const permissions: FieldPrivilegeDTO[] | undefined =
    userData.getUserData()?.fieldJob?.fieldPrivilegeDTO;
  console.log(permissions, entity, action);

  if (permissions) {
    const hasPermission: boolean = Boolean(
      permissions.find((permission) => permission.name === entity)?.[
        action as keyof FieldPrivilegeDTO
      ]
    );
    return hasPermission;
  }

  router.navigate(['/unauthorized']);
  return false;
};
