export type NutritionLabelsKeys = ReturnType<
  ReturnType<typeof NutritionLabels.keys>["toArray"]
>[number]

export const NutritionLabels = new (class {
  private readonly data = new Map([
    ["name", "Name"],
    ["brand", "Brand"],
    ["servingSize", "Serving Size"],
    ["servingUnit", "Serving Unit"],
    ["calories", "Calories"],
    ["totalProteinInGrams", "Protein (g)"],
    ["totalCarbsInGrams", "Carbs (g)"],
    ["totalFatInGrams", "Fat (g)"],
    ["polyunsaturatedFatInGrams", "Poly. Fat (g)"],
    ["monounsaturatedFatInGrams", "Mono. Fat (g)"],
    ["saturatedFatInGrams", "Sat. Fat (g)"],
    ["potassiumInMilligrams", "Potassium (mg)"],
    ["sodiumInMilligrams", "Sodium (mg)"],
    ["dietaryFiberInGrams", "Fiber (g)"],
    ["sugarsInGrams", "Sugars (g)"],
    ["cholesterolInMilligrams", "Cholesterol (mg)"],
    ["calciumInMilligrams", "Calcium (mg)"],
    ["ironInMilligrams", "Iron (mg)"],
  ] as const)

  entries() {
    return this.data.entries()
  }

  values() {
    return this.data.values()
  }

  keys() {
    return this.data.keys()
  }

  get(...args: Parameters<typeof this.data.get>) {
    const v = this.data.get(...args)
    if (v == null) {
      throw new Error("failed to retrieve nutrition label")
    } else {
      return v
    }
  }
})()
