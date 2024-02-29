export default function applyFilter({ inputData, comparator, filters }) {
  const { name, status } = filters;
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name && name?.length > 2) {
    inputData = inputData.filter(
      (task) => task?.Customer?.toLowerCase()?.indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    if (status === 'not completed') {
      inputData = inputData.filter((task) => !task.DateCompleted);
      // }
      //  else if (status === 'overdue') {
      //   inputData = inputData.filter((task) => task.Due);
    } else {
      inputData = inputData.filter((task) => task.Status === status);
    }
  }

  return inputData;
}
