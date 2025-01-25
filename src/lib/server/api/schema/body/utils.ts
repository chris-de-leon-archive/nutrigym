export const isBirthdayInFuture = (
  today: Date,
  birthday: { year: number; month: number; day: number },
) => {
  return Date.UTC(birthday.year, birthday.month, birthday.day) > today.getTime()
}
