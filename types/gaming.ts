import { BaseDocument } from "@/lib/db/types";

export interface SeasonHistory extends BaseDocument {
  period: string;
  rank: string;
  hero: string;
  season: string;
}
