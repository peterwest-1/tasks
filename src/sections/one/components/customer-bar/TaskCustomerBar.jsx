import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import { Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/sections/one/components/table/table';

import useFilter from '../useFilter';
import ResetButton from '../ResetButton';
import TaskCustomerBarRow from './TaskCustomerBarRow';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 60 },
  { id: 'name', label: 'Customer', width: 150 },
  { id: 'tasks', label: 'Tasks', width: 50 },
  { id: '', label: '', width: 80 },
];

const defaultFilters = {};

// eslint-disable-next-line react/prop-types
export default function TaskCustomerBar() {
  const {
    data: extern,
    applyFilter: applyFilterForComponent,
    removeFilterFromComp,
    canReset,
  } = useFilter();
  const table = useTable({ defaultOrder: 'desc', defaultOrderBy: 'tasks', defaultDense: true });
  const confirm = useBoolean();

  const denseHeight = table.dense ? 56 : 56 + 20;

  const [filters] = useState(defaultFilters);

  const [tableData, setTableData] = useState([]);

  const [data, setData] = useState(() => extern);

  const notFound = !data?.length;
  const [hasClicked, setHasClicked] = useState(false);

  const handleApplyFilter = (filterFunction) => {
    console.log('sdsdsds');
    setHasClicked(true);
    applyFilterForComponent(filterFunction);
  };

  useEffect(() => {
    if (!hasClicked) {
      setData(() => extern);
    }
  }, [hasClicked, extern]);

  useEffect(() => {
    const grouped = groupDataByCustomer(data);
    setTableData(grouped);
  }, [data]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  return (
    <Card sx={{ width: '100%', m: 2 }}>
      <Stack direction="row" spacing={2} sx={{ m: 2 }}>
        <Typography variant="h4">Tasks</Typography>
        {canReset && (
          <ResetButton
            handleReset={() => {
              removeFilterFromComp();
              setHasClicked(false);
            }}
          />
        )}
      </Stack>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={dataFiltered.length}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              dataFiltered.map((row) => row.id)
            )
          }
          action={
            <Tooltip title="Delete">
              <IconButton color="primary" onClick={confirm.onTrue}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          }
        />

        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 600 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row, index) => (
                  <TaskCustomerBarRow
                    key={index}
                    row={row}
                    table={table}
                    applyFilterForComponent={handleApplyFilter}
                  />
                ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Card>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}

const groupDataByCustomer = (data) => {
  const groupedData = {};

  data.forEach((item) => {
    const customerName = item.Customer;

    if (!groupedData[customerName]) {
      groupedData[customerName] = { name: customerName, tasks: [] };
    }

    groupedData[customerName].tasks.push({
      id: item.Id,
      due: item.Due,
      taskId: item.TaskId,
      task: item.Task,
    });
  });

  const newData = Object.values(groupedData);

  const maxValues = newData.map((row) => Math.max(row?.tasks?.length));

  const formattedData = newData.map((row, index) => ({
    id: index + 1,
    name: row?.name,
    tasks: row?.tasks,
    // eslint-disable-next-line no-unsafe-optional-chaining
    width: Number(((row?.tasks?.length / Math.max(...maxValues)) * 100).toFixed(2)),
  }));
  return formattedData;
};
