import { EquipmentDTO } from './equipment.dto';

export interface UltramarineDTO {
  id?: number;
  name: string | null;
  grade: string | null;
  equipments?: EquipmentDTO[] | null;
}
