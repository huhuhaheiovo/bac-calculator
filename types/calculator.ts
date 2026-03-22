import type {Locale} from "@/i18n/config";

export type Sex = "male" | "female";
export type WeightUnit = "lbs" | "kg";
export type LocalizedLabel = Record<Locale, string>;

export type BACLevel =
  | "sober"
  | "minimal"
  | "mild"
  | "impaired"
  | "severe"
  | "danger";

export interface DrinkType {
  id: string;
  alcoholOz: number;
  label: LocalizedLabel;
  description: LocalizedLabel;
  iconSrc?: string;
  showInSimpleMode?: boolean;
}

export interface BACInput {
  sex: Sex;
  weightLbs: number;
  drinks: number;
  alcoholOzPerDrink: number;
  hoursElapsed: number;
  legalLimitPercent: number;
}

export interface BACResult {
  bac: number;
  startingBac: number;
  hoursElapsed: number;
  level: BACLevel;
  soberInHours: number;
  timeToLegalHours: number;
  isLegal: boolean;
}

export interface LegalLimit {
  id: string;
  code: string;
  name: LocalizedLabel;
  limitPercent: number;
  notes: LocalizedLabel;
}
