export function filterByTask(task) {
  // eslint-disable-next-line func-names
  return function (taskObject) {
    return taskObject.Task === task;
  };
}

export function filterById(id) {
  // eslint-disable-next-line func-names
  return function (taskObject) {
    return taskObject.Id === id;
  };
}

export function filterByCustomer(customer) {
  // eslint-disable-next-line func-names
  return function (taskObject) {
    return taskObject.Customer === customer;
  };
}

export function filterByMonth(customer) {
  // eslint-disable-next-line func-names
  return function (taskObject) {
    return taskObject.Customer === customer;
  };
}

export function filterByMonthAndYear(month, year) {
  // eslint-disable-next-line func-names
  return function (taskObject) {
    const dueDate = new Date(taskObject.Due);
    const dueMonth = dueDate.getMonth();
    const dueYear = dueDate.getFullYear();

    const filterMonth = parseInt(month, 10) - 1;
    const filterYear = parseInt(year, 10);
    return dueMonth === filterMonth && dueYear === filterYear;
  };
}
