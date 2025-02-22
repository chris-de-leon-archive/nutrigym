export class Fmt {
  static formatNumber(val: number | string) {
    const formatter = (value: number) => {
      return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(value)
    }

    if (typeof val === "string") {
      const v = parseFloat(val)
      if (Number.isNaN(v)) {
        return "NaN"
      } else {
        return formatter(v)
      }
    } else {
      return formatter(val)
    }
  }
}
