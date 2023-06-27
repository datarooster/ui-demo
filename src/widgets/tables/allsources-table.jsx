import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';

// Import Moment.js for date formatting
import moment from 'moment';

import {

  Avatar} from "@material-tailwind/react";

function createData(dataSource, name, lastUpdated, numberOfIssues) {
  return {
    dataSource,
    name,
    lastUpdated,
    numberOfIssues,
  };
}

const sparkIcon = (<Tooltip itle="Spark job">
<Avatar
  src="/img/sparklogo.png"
  size="l"
  variant="square"
  className="cursor-pointer border-2 border-white"
/>
</Tooltip>);

const kafkaIcon = (<Tooltip itle="Kafka group">
<Avatar
  src="/img/kafka.png"
  size="l"
  variant="square"
  className="cursor-pointer border-2 border-white"
/>
</Tooltip>);

const pyIcon = (<Tooltip itle="Kafka group">
<Avatar
  src="/img/py.png"
  size="l"
  variant="square"
  className="cursor-pointer border-2 border-white"
/>
</Tooltip>);

const flinkIcon = (<Tooltip itle="Kafka group">
<Avatar
  src="/img/flink.png"
  size="l"
  variant="square"
  className="cursor-pointer border-2 border-white"
/>
</Tooltip>);

const rows = [
  createData(sparkIcon, "spark-app-customers-agg", moment().subtract(5, 'minutes'), 10),
  createData(sparkIcon, "spark-api-sources", moment().subtract(8, 'minutes'), 5),
  createData(sparkIcon, 'spark-analytics-job', moment().subtract(12, 'minutes'), 2),
  createData(sparkIcon, 'spark-data-processing', moment().subtract(15, 'minutes'), 7),
  createData(sparkIcon, 'spark-machine-learning', moment().subtract(20, 'minutes'), 3),
  createData(sparkIcon, 'spark-data-visualization', moment().subtract(25, 'minutes'), 4),
  createData(flinkIcon, 'flink-click-streams-1', moment().subtract(12, 'minutes'), 2),
  createData(flinkIcon, 'flink-data-processing', moment().subtract(18, 'minutes'), 6),
  createData(flinkIcon, 'flink-real-time-analytics', moment().subtract(22, 'minutes'), 2),
  createData(flinkIcon, 'flink-event-stream-processing', moment().subtract(27, 'minutes'), 5),
  createData(flinkIcon, 'flink-ml-model-inference', moment().subtract(32, 'minutes'), 1),
  createData(kafkaIcon, 'kafka-topic-transactions-live', moment().subtract(15, 'minutes'), 7),
  createData(kafkaIcon, 'kafka-event-stream', moment().subtract(20, 'minutes'), 4),
  createData(kafkaIcon, 'kafka-data-replication', moment().subtract(25, 'minutes'), 8),
  createData(kafkaIcon, 'kafka-data-ingestion', moment().subtract(30, 'minutes'), 3),
  createData(kafkaIcon, 'kafka-stream-processing', moment().subtract(35, 'minutes'), 6),
  createData(pyIcon, 'pandas-data-cleansing', moment().subtract(12, 'minutes'), 1),
  createData(pyIcon, 'pandas-data-analysis', moment().subtract(15, 'minutes'), 2),
  createData(pyIcon, 'pandas-data-visualization', moment().subtract(20, 'minutes'), 5),
  createData(pyIcon, 'pandas-data-munging', moment().subtract(25, 'minutes'), 3),
  createData(pyIcon, 'pandas-data-aggregation', moment().subtract(30, 'minutes'), 2),
  createData(pyIcon, 'pandas-data-modeling', moment().subtract(35, 'minutes'), 4),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'dataSource',
    numeric: false,
    label: 'Data Source',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'lastUpdated',
    numeric: true,
    label: 'Last Updated',
  },
  {
    id: 'numberOfIssues',
    numeric: true,
    label: 'Number of Issues',
  },
];
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  
  export function AllSourcesTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('dataSource');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <div className="mb-12">
            <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }} >
              All Monitored Sources (35)
            </Typography>
            </div>
          
          <TableContainer>
            <Table sx={{ minWidth: 750 }} >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row.dataSource} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{row.dataSource}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="right">
                          {moment(row.lastUpdated).format('YYYY-MM-DD HH:mm:ss')}
                        </TableCell>
                        <TableCell align="right">{row.numberOfIssues}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  }
  