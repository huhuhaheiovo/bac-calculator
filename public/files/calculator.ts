// types/calculator.ts

export type Sex = 'male' | 'female'
export type WeightUnit = 'lbs' | 'kg'

export type BACLevel =
  | 'sober'
  | 'minimal'
  | 'mild'
  | 'impaired'
  | 'severe'
  | 'danger'

export interface DrinkType {
  id: string
  label: string
  alcoholOz: number // pure alcohol in fl oz per drink
  description: string
}

export interface BACInput {
  sex: Sex
  weightLbs: number
  drinks: number
  alcoholOzPerDrink: number
  hoursElapsed: number
}

export interface BACResult {
  bac: number           // e.g. 0.082
  level: BACLevel
  soberInHours: number  // hours until BAC = 0
  isLegal: boolean      // below 0.08% US federal limit
}

export interface LegalLimit {
  country: string
  flag: string
  limitPercent: number
  notes: string
}
