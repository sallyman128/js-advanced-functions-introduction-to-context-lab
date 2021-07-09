// Your code here

function createEmployeeRecord(employeeDetailsArray) {
  let employeeRecord = {
    firstName: employeeDetailsArray[0],
    familyName: employeeDetailsArray[1],
    title: employeeDetailsArray[2],
    payPerHour: employeeDetailsArray[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employeeRecord;
};

function createEmployeeRecords(employeesArray) {
  return employeesArray.map( (employee) => {
    return createEmployeeRecord(employee);
  });
};

function createTimeInEvent(employeeRecord, dateTimeString) {
  employeeRecord.timeInEvents.push({
    date: dateTimeString.slice(0, 10),
    hour: parseInt(dateTimeString.slice(-4)),
    type: "TimeIn"
  });
  return employeeRecord;
};

function createTimeOutEvent(employeeRecord, dateTimeString) {
  employeeRecord.timeOutEvents.push({
    date: dateTimeString.slice(0, 10),
    hour: parseInt(dateTimeString.slice(-4)),
    type: "TimeOut"
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find( (day) =>  day.date === date);
  const timeOut = employeeRecord.timeOutEvents.find( (day) =>  day.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  function sumHours(total, day) {
    return total + wagesEarnedOnDate(employeeRecord, day.date); 
  }
  return employeeRecord.timeInEvents.reduce(sumHours, 0)
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce( (allPayroll, employee) => {
    return allPayroll + allWagesFor(employee);
  }, 0)
}

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find( (employee) => employee.firstName === firstName)
}