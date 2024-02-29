export const countStatus = (array, status) =>
  array.filter((obj) => obj.Status === status).reduce((count) => count + 1, 0);

export const filterTasksByDateRange = (tasksdata, startDate, endDate) =>
  tasksdata.filter((task) => {
    const dueDate = new Date(task.Due);
    return dueDate >= startDate && dueDate <= endDate;
  });

export const filterArray = (array, filters) =>
  array.filter((item) => filters.every((filter) => filter(item)));

export const groupTasksByMonth = (tasks) => {
  const groupedTasks = {};

  tasks.forEach((task) => {
    const monthName = new Date(task.Due).toLocaleString('default', {
      month: '2-digit',
      year: 'numeric',
    });

    if (!groupedTasks[monthName]) {
      groupedTasks[monthName] = 1;
    } else {
      groupedTasks[monthName] += 1;
    }
  });

  return groupedTasks;
};

export function processDataForPie(data, sliceAmount) {
  const taskCounts = {};

  data.forEach((task) => {
    const { Task } = task;
    taskCounts[Task] = taskCounts[Task] ? taskCounts[Task] + 1 : 1;
  });

  const sortedTasks = Object.entries(taskCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, sliceAmount);

  const otherCount = Object.entries(taskCounts)
    .slice(sliceAmount)
    .reduce((acc, [, count]) => acc + count, 0);

  const newData =
    otherCount === 0
      ? [...sortedTasks.map(([task, count]) => ({ x: task, y: count }))]
      : [
          ...sortedTasks.map(([task, count]) => ({ x: task, y: count })),
          { x: 'Other', y: otherCount },
        ];

  return newData;
}

export const colours = [
  '#00111c',
  '#00331c',
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
  '#ffcc00',
];
