export const CALORIES_PER_GRAM_OF_PROTEIN = 4
export const CALORIES_PER_GRAM_OF_CARB = 4
export const CALORIES_PER_GRAM_OF_FAT = 9

export class Conversion {
  static proteinInGrams = (calories: number, percentage: number) => {
    return (calories * (percentage / 100)) / CALORIES_PER_GRAM_OF_PROTEIN
  }

  static carbsInGrams = (calories: number, percentage: number) => {
    return (calories * (percentage / 100)) / CALORIES_PER_GRAM_OF_CARB
  }

  static fatInGrams = (calories: number, percentage: number) => {
    return (calories * (percentage / 100)) / CALORIES_PER_GRAM_OF_FAT
  }
}
