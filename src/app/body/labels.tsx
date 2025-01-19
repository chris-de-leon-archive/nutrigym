export type BodyLabelsKeys = ReturnType<
  ReturnType<typeof BodyLabels.keys>["toArray"]
>[number]

export const BodyLabels = new (class {
  private readonly data = new Map([
    ["steps", "Steps"],
    ["weightInPounds", "Weight (lbs)"],
    ["heightInInches", "Height (inches)"],
    ["waterInMilliliters", "Water (ml)"],
    ["sleepInHours", "Sleep (hours)"],
    ["waistInInches", "Waist (inches)"],
    ["hipsInInches", "Hips (inches)"],
    ["chestInInches", "Chest (inches)"],
    ["armsInInches", "Arms (inches)"],
    ["thighsInInches", "Thighs (inches)"],
    ["shouldersInInches", "Shoulders (inches)"],
    ["forearmsInInches", "Forearms (inches)"],
    ["calvesInInches", "Calves (inches)"],
    ["neckInInches", "Neck (inches)"],
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
      throw new Error("failed to retrieve body label")
    } else {
      return v
    }
  }
})()
