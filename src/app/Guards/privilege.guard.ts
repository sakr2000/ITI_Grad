import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../Services/userData.service';
import { FieldPrivilegeDTO } from '../Models/FieldJob';

export const privilegeGuard: CanActivateFn = (route, state) => {
  const userData = inject(UserDataService);
  if (userData.getUserData()?.role.includes('Admin')) return true;
  const router = inject(Router);
  const entity = route.data['entity'];
  const action = route.data['action'];
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
  } else if (
    userData.getUserData()?.role.includes('Seller') &&
    entity === 'الطلبات'
  ) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
