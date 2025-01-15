export const dateKoreanFormat = (date: string): string => {
  const dateTypeFormat = date as unknown as Date
  const stringToDate = new Date(dateTypeFormat)

  const year = stringToDate.getFullYear()
  const month = String(stringToDate.getMonth() + 1).padStart(2, '0')
  const day = String(stringToDate.getDate()).padStart(2, '0')

  const formattedDate = `${year}년 ${month}월 ${day}일`

  return formattedDate
}
