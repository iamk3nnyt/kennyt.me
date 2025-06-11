import { BaseDocument } from "@/lib/db/types";

export interface SeasonHistory extends BaseDocument {
  period: string;
  rank: string;
  hero: string;
  season: string;
}

export interface Hero extends BaseDocument {
  name: string;
  role: string;
  specialty: string;
  image: string;
  order: number;
}

export interface MLBBStats extends BaseDocument {
  matches: number;
  winRate: number;
  mvp: number;
  lastUpdated: Date;
}
