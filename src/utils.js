export function getValue(list, maxMinute = 60) {
  const now = new Date();
  let minute = now.getMinutes();
  const n = list.length;
  const index = Math.floor(((minute - 1) / maxMinute) * n);
  return list[index >= n ? n - 1 : index];
}

export function getPatientStatus(age, heartRate, bloodPressure, temperature) {
  var count = 0;

  // Heart rate
  if (age < 18 && (heartRate < 80 || heartRate > 120)) count++;
  else if (age < 65 && (heartRate < 60 || heartRate > 80)) count++;
  else if (age >= 65 && (heartRate < 70 || heartRate > 90)) count++;

  // Blood pressure
  if (
    age < 18 &&
    (bloodPressure.systolic < 120 ||
      bloodPressure.systolic > 140 ||
      bloodPressure.diastolic < 60 ||
      bloodPressure.diastolic > 80)
  )
    count++;
  else if (
    age >= 18 &&
    (bloodPressure.systolic < 150 || bloodPressure.systolic > 170 || bloodPressure.diastolic != 90)
  )
    count++;

  // Temperature
  if (temperature < 36.3 || temperature > 37.5) count++;
  if (temperature < 29 || temperature > 42.6) count++;

  return count == 0 ? 'stable' : count == 1 ? 'instable' : 'critical';
}
