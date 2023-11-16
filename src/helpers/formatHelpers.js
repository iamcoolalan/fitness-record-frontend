const getDayOfWeek = (date) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return daysOfWeek[date.getDay()]
}

const toDateString = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

const getMonthAbbreviation = (month) => {
  const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthAbbreviations[month - 1];
}

const getQuarter = (month) => {
  return Math.floor(month / 3) * 3
}

const formatWorkoutTime = (min) => {
  const hour = Math.floor(min / 60)
  const restMin = min % 60

  return `${hour}hr${restMin}min`
}

export { getDayOfWeek, toDateString, getMonthAbbreviation, getQuarter, formatWorkoutTime}