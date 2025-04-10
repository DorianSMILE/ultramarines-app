import { EquipmentDTO } from './equipment.dto';

export interface NewUltramarineDTO {
  id?: number;
  name: string;
  grade: string;
  equipments?: EquipmentDTO[];
}
