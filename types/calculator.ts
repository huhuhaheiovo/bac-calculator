export type Sex = "male" | "female";
export type WeightUnit = "lbs" | "kg";

export type BACLevel =
  | "sober"
  | "minimal"
  | "mild"
  | "impaired"
  | "severe"
  | "danger";

export interface DrinkType {
  id: string;
  label: string;
  alcoholOz: number;
  description: string;
}

export interface BACInput {
  sex: Sex;
  weightLbs: number;
  drinks: number;
  alcoholOzPerDrink: number;
  hoursElapsed: number;
}

export interface BACResult {
  bac: number;
  level: BACLevel;
  soberInHours: number;
  isLegal: boolean;
}

export interface LegalLimit {
  id: string;
  country: string;
  nativeName: string;
  label: string;
  limitPercent: number;
  notes: string;
}
