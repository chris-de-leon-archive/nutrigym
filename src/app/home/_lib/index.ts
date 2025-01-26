// TODO: fetch data using server actions
export const randVals = () =>
  Array.from({ length: 100 })
    .map((_, i) => {
      return {
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        value: Math.random() * 1000,
      }
    })
    .reverse()
