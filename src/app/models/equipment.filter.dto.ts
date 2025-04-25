import { EquipmentTypeEnum } from '@models/enum/equipment.enums';
import { SupplyEnum } from '@models/enum/equipment.enums';
import { WeightEnum } from '@models/enum/equipment.enums';

export interface EquipmentFilterDTO {
  equipmentType?: EquipmentTypeEnum[];
  supply?: SupplyEnum[];
  weight?: WeightEnum[];
}
