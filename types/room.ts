import { BaseDocument } from "@/lib/db/types";

export interface RoomItem extends BaseDocument {
  name: string;
  category: string;
  order: number;
}

export type RoomCategory = {
  name: string;
  icon: string;
  order: number;
  items: RoomItem[];
};
