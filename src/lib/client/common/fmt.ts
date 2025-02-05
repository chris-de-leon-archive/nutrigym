export class Fmt {
  static formatNumber(val: number) {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(val)
  }
}
