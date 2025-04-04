import { EquipmentDTO } from './equipment.dto';

export interface UltramarineDTO {
  id?: number;
  name: string;
  grade: string;
  equipments?: EquipmentDTO[];
}
