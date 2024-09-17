export interface FieldPrivilegeDTO {
  privilegeID: number;
  name: string;
  add: boolean;
  delete: boolean;
  display: boolean;
  edit: boolean;
}


export interface FieldJob {
  id: number;
  name: string;
  dateAdding: Date;
  fieldPrivilegeDTO: FieldPrivilegeDTO[]; 
}