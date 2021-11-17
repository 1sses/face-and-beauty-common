export function splitEmployees (employees) {
  const resultedEmployees = []

  if (employees.length === 1) resultedEmployees.push([employees[0]])
  else {
    for (let i = 0; i < employees.length;) {
      if (employees.length - i > 4 || employees.length - i === 3) {
        resultedEmployees.push([employees[i], employees[i + 1], employees[i + 2]])
        i += 3
      } else if (employees.length - i === 4) {
        resultedEmployees.push([employees[i], employees[i + 1]])
        resultedEmployees.push([employees[i + 2], employees[i + 3]])
        break
      } else {
        resultedEmployees.push([employees[i], employees[i + 1]])
        break
      }
    }
  }
  return resultedEmployees
}
