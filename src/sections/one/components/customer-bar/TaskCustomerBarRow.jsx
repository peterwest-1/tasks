import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import { TableCell, LinearProgress } from '@mui/material';

import { filterByCustomer } from '../filters';

export default function TaskCustomerBarRow({ row, table, applyFilterForComponent }) {
  const { id, tasks, name, width } = row;

  return (
    <TableRow
      hover
      onClick={() => {
        applyFilterForComponent(filterByCustomer(name));
        table.onChangePage(null, 0);
      }}
    >
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{id}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{tasks.length}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <LinearProgress
          value={width}
          variant="determinate"
          color="inherit"
          sx={{
            my: 2,
            height: 6,
            '&:before': {
              bgcolor: 'divider',
              opacity: 1,
            },
          }}
        />
      </TableCell>
    </TableRow>
  );
}

TaskCustomerBarRow.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
  id: PropTypes.number,
  applyFilterForComponent: PropTypes.func,
};
