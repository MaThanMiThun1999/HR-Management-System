const calculateSalary = (baseSalary, workingDays, casualLeave, medicalLeave, extraLeave) => {
  // Calculate total leave taken
  const totalLeave = casualLeave + medicalLeave + extraLeave;

  // Calculate salary per day
  const salaryPerDay = baseSalary / workingDays;

  // Calculate deductions
  let deductions = 0;

  // Deduct for leave beyond the allowed limit
  if (casualLeave > 2) {
    deductions += salaryPerDay * (casualLeave - 2);
  }
  if (medicalLeave > 2) {
    deductions += salaryPerDay * (medicalLeave - 2);
  }

  // Deduct for consecutive leave beyond the limit
  const consecutiveLeave = Math.max(totalLeave - 2, 0);
  deductions += salaryPerDay * consecutiveLeave;
  
  // Calculate final salary
  const finalSalary = baseSalary - deductions;

  return Math.round(finalSalary * 100) / 100;
};

module.exports = calculateSalary;

// new Date(year, month, 0).getDate()
