import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
  id,
  timestamp,
  merchant,
  transaction,
  user_id,
  source_id,
) {
  return { id, timestamp, merchant, transaction, user_id, source_id };
}

const rows = Array.from({ length: 30 }, (_, index) =>
  createData(
    `ID${index + 1}`,
    new Date().toISOString(),
    `Merchant ${index + 1}`,
    `Transaction ${index + 1}`,
    `User ID ${index + 1}`,
    `Source ID ${index + 1}`
  )
);

export function SamplesTable() {
  const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen(cur => !cur);


  return (<>
    {/* <div  className=" w-full flex justify-center">
        

          <Button variant="outlined" onClick={toggleOpen} endIcon={<KeyboardArrowDownIcon />}>
            Show Data Samples
          </Button>

    </div>
  <Collapse in={open}> */}
    <TableContainer component={Paper} style={{ maxHeight: 300 }}>
      <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Timestamp</TableCell>
            <TableCell align="right">Merchant</TableCell>
            <TableCell align="right">Transaction</TableCell>
            <TableCell align="right">User ID</TableCell>
            <TableCell align="right">Source ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.timestamp}</TableCell>
              <TableCell align="right">{row.merchant}</TableCell>
              <TableCell align="right">{row.transaction}</TableCell>
              <TableCell align="right">{row.user_id}</TableCell>
              <TableCell align="right">{row.source_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* </Collapse> */}
    </>
  );
}
