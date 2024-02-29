/* eslint-disable react/prop-types */
import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { Stack, Drawer, Divider, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import uuidv4 from 'src/utils/uuidv4';

import Label from 'src/components/label';
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
import TaskDetail from '../TaskDetail';
import ResetButton from '../ResetButton';
import TasksTableRow from './TasksTableRow';
import applyFilter from './table/apply-filter';
import useTaskStore from '../../store/task-store';
import TasksTableToolbar from './TasksTableToolbar';
import TasksTableFiltersResult from './TasksTableFiltersResult';

/*
  'default',
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error',
*/
const STATUS_OPTIONS = [
  { value: 'all', label: 'All', variant: 'default' },
  { value: 'completed', label: 'Completed', variant: 'primary' },
  { value: 'ready to start', label: 'Ready To Start', variant: 'secondary' },
  { value: 'other', label: 'Other', variant: 'info' },
  { value: 'customer reviewing', label: 'Customer Reviewing', variant: 'success' },
  { value: 'finshing up', label: 'Finshing Up', variant: 'warning' },
  { value: 'supervisor checking', label: 'Supervisor Checking', variant: 'error' },
];

const TABLE_HEAD = [
  { id: 'Id', label: 'Id' },
  { id: 'Due', label: 'Due' },
  { id: 'Customer', label: 'Customer' },
  { id: 'TaskId', label: 'TaskId' },
  { id: 'Task', label: 'Task' },
  { id: 'TaskBy', label: 'TaskBy' },
  { id: 'Status', label: 'Status' },
  { id: 'DateCompleted', label: 'DateCompleted' },
  { id: '' },
];

// const TABLE_HEAD = [
//   { id: 'Id', label: 'Id', width: 100 },
//   { id: 'Due', label: 'Due', width: 220 },
//   { id: 'Customer', label: 'Customer', width: 220 },
//   { id: 'TaskId', label: 'TaskId' },
//   { id: 'Task', label: 'Task', width: 180 },
//   { id: 'TaskBy', label: 'TaskBy', width: 180 },
//   { id: 'Status', label: 'Status', width: 100 },
//   { id: 'DateCompleted', label: 'DateCompleted', width: 100 },
//   { id: '', width: 88 },
// ];

const defaultFilters = {
  name: '',
  status: 'all',
};

export default function TasksTable() {
  const data = useTaskStore((state) => state.data);
  const table = useTable({ defaultDense: true });

  const confirm = useBoolean();

  const [tableData, setTableData] = useState([]);
  const [selectedTaskDetail, setSelectedTaskDetail] = useState({
    open: false,
    id: '',
  });

  const {
    applyFilter: applyFilterForComponent,
    removeFilterFromComp,
    canReset: canResetMan,
  } = useFilter();

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 56 : 56 + 20;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  return (
    <Card sx={{ m: 2 }}>
      <Stack direction="row" spacing={2} sx={{ m: 2 }}>
        <Typography variant="h4">Tasks</Typography>
        {canResetMan && <ResetButton handleReset={removeFilterFromComp} />}
      </Stack>
      <Card>
        <DrawerDetail
          selectedTaskDetail={selectedTaskDetail}
          setSelectedTaskDetail={setSelectedTaskDetail}
        />
        <Tabs
          value={filters.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                  }
                  color={
                    STATUS_OPTIONS.map((status) => status.value).includes(tab.value)
                      ? tab.variant
                      : 'default'
                  }
                >
                  {STATUS_OPTIONS.map((status) => status.value).includes(tab.value) &&
                  tab.value !== 'all'
                    ? tableData.filter((task) => task.Status === tab.value).length
                    : tableData.length}
                </Label>
              }
            />
          ))}
        </Tabs>

        <TasksTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <TasksTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            //
            onResetFilters={handleResetFilters}
            //
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

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
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
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
                  .map((row) => (
                    <TasksTableRow
                      table={table}
                      key={uuidv4()}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      setSelectedTaskDetail={setSelectedTaskDetail}
                      selectedTaskDetail={selectedTaskDetail}
                      applyFilterForComponent={applyFilterForComponent}
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
          //
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
    </Card>
  );
}

const DrawerDetail = ({ selectedTaskDetail, setSelectedTaskDetail }) => (
  <Drawer
    open={selectedTaskDetail?.open}
    onClose={() => {
      setSelectedTaskDetail({
        open: false,
        id: '',
      });
    }}
    anchor="right"
    slotProps={{
      backdrop: { invisible: true },
    }}
    PaperProps={{
      sx: {
        width: {
          xs: 1,
          sm: 480,
        },
      },
    }}
  >
    <Divider />

    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <TaskDetail id={selectedTaskDetail?.id} />
    </Scrollbar>
  </Drawer>
);
