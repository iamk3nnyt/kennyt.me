import { BaseDocument } from "@/lib/db/types";

export interface SeasonHistory extends BaseDocument {
  period: string;
  rank: string;
  hero: string;
  season: string;
}

export interface MLBBStats extends BaseDocument {
  matches: number;
  winRate: number;
  mvp: number;
  lastUpdated: Date;
}
