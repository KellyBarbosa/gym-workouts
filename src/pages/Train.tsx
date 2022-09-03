import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IExercise } from '../shared/services/Structure';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Props {
  exercises: IExercise[];
}

export default function Train({exercises}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Exercício</StyledTableCell>
            <StyledTableCell align="right">Série</StyledTableCell>
            <StyledTableCell align="right">Repetições</StyledTableCell>
            <StyledTableCell align="right">Carga</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((exercise) => (
            <StyledTableRow key={exercise.id}>
              <StyledTableCell component="th" scope="row">
                {exercise.name}
              </StyledTableCell>
              <StyledTableCell align="right">{exercise.series}</StyledTableCell>
              <StyledTableCell align="right">{exercise.repeat}</StyledTableCell>
              <StyledTableCell align="right">{exercise.weight}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
