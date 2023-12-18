export const countTotalTrainingVolume = (recordList) => {
  let totalWorkoutVolume = 0

  recordList.forEach(workout => {
    totalWorkoutVolume = totalWorkoutVolume + Number(workout.totalSets) * Number(workout.repetitions) * Number(workout.weight)
  });

  return totalWorkoutVolume
}