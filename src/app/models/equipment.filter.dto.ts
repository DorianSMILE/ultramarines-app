export enum WeightEnum {
  LIGHT = 'LIGHT',
  MEDIUM = 'AVERAGE',
  HEAVY = 'HEAVY'
}

export enum SupplyEnum {
  ENERGY = 'ENERGY',
  FUEL = 'FUEL',
  NONE = 'NONE'
}

export enum EquipmentTypeEnum {
  GUN = 'GUN',
  SWORD = 'SWORD',
  ARMOR = 'ARMOR'
}

export interface EquipmentFilterDTO {
  weight?: WeightEnum;
  supply?: SupplyEnum;
  equipmentType?: EquipmentTypeEnum;
}
