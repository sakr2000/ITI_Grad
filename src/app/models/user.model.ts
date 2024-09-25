import { FieldPrivilegeDTO } from './FieldJob';

export interface User {
  id?: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}

export interface GetUser {
  role: string[];
  id: string;
  fieldJob?: {
    id: number;
    name: string;
    dateAdding: string;
    fieldPrivilegeDTO: FieldPrivilegeDTO[];
  };
  userName: string;
}
