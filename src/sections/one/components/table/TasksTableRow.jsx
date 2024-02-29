import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { filterById } from '../filters';

export default function TasksTableRow({
  row,
  selected,
  setSelectedTaskDetail,
  applyFilterForComponent,
  table,
}) {
  const { Id, Due, TaskId, Task, Customer, TaskBy, Status, DateCompleted } = row;

  const quickEdit = useBoolean();
  return (
    <TableRow
      hover
      selected={selected}
      // onClick={() => {
      //   applyFilterForComponent(filterById(Id));
      //   table.onChangePage(null, 0);
      // }}
    >
      <TableCell
        onClick={() => {
          applyFilterForComponent(filterById(Id));
          table.onChangePage(null, 0);
        }}
        sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
      >
        {Id}
      </TableCell>
      <TableCell
        onClick={() => {
          applyFilterForComponent(filterById(Id));
          table.onChangePage(null, 0);
        }}
        sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
      >
        {Due}
      </TableCell>
      <TableCell
        onClick={() => {
          applyFilterForComponent(filterById(Id));
          table.onChangePage(null, 0);
        }}
        sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
      >
        {Customer}
      </TableCell>
      <TableCell
        onClick={() => {
          applyFilterForComponent(filterById(Id));
          table.onChangePage(null, 0);
        }}
        sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
      >
        {TaskId}
      </TableCell>
      <TableCell
        onClick={() => {
          applyFilterForComponent(filterById(Id));
          table.onChangePage(null, 0);
        }}
        sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
      >
        {Task}
      </TableCell>
      <TableCell
        onClick={() => {
          applyFilterForComponent(filterById(Id));
          table.onChangePage(null, 0);
        }}
        sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
      >
        {TaskBy}
      </TableCell>
      <TableCell>
        <Label
          variant="soft"
          color={
            (Status === 'completed' && 'success') ||
            (Status === 'ready to start' && 'success') ||
            (Status === 'in progress' && 'warning') ||
            (Status === 'on hold' && 'error') ||
            'default'
          }
        >
          {Status}
        </Label>
      </TableCell>
      <TableCell
        onClick={() => {
          applyFilterForComponent(filterById(Id));
          table.onChangePage(null, 0);
        }}
        sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
      >
        {DateCompleted}
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="View Detail" placement="top" arrow>
          <IconButton
            color={quickEdit.value ? 'inherit' : 'default'}
            onClick={() => {
              setSelectedTaskDetail({
                open: true,
                id: Id,
              });
            }}
          >
            <Iconify icon="carbon:view-filled" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

TasksTableRow.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
  selected: PropTypes.bool,
  setSelectedTaskDetail: PropTypes.func,
  applyFilterForComponent: PropTypes.func,
};
