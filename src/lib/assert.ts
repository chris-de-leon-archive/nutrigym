export const AssertUnreachable = (v: never) => {
  throw new Error(`unreachable check failed: ${v}`)
}
