import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

class BookTable extends React.Component {
  render() {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.books.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.author}</TableCell>
                  <TableCell>{row.isbn}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>
                    <Button onClick={() => this.props.openForm(row)}>
                      <Edit />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => this.props.delete(row.id)}>
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default BookTable;
