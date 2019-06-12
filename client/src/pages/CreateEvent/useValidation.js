export function useValidation(fields) {
  let err = [];
  const now = new Date().getTime();
  const startDate = fields.startDate.getTime();
  const endDate = fields.endDate.getTime();

  if (Object.values(fields).some(f => !f)) {
    err.push('Fill all required fields');
  }

  if (startDate < now || endDate < now) {
    err.push('Start/End date should be after current date');
  }
  else if (startDate > endDate) {
    err.push('Start date cannot be after End date');
  }

  return err.join(', ');
}