export interface EquipmentAuthorizationDTO {
  ultramarineId: number;
  supplyAuthorizations: { [category: string]: string };
  weightAuthorizations: { [category: string]: string };
}
