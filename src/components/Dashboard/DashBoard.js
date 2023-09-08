import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

export default function Dashboard({ data }) {
    console.log(data)
  // Используйте данные из пропсов для создания строк таблицы
  const rows = Array.isArray(data) ? data : []; // Если данные не являются массивом, установите пустой массив

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="medium">
            <TableHead>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell align="right">Clicks</TableCell>
                <TableCell align="right">Impressions</TableCell>
                <TableCell align="right">CTR</TableCell>
                <TableCell align="right">Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.keys[0]}
                  </TableCell>
                  <TableCell align="right">{row.clicks}</TableCell>
                  <TableCell align="right">{row.impressions}</TableCell>
                  <TableCell align="right">{row.ctr}</TableCell>
                  <TableCell align="right">{row.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}