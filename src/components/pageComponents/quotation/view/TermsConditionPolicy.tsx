import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  TableCell,
  Container,
} from "@mui/material";

const TermsCondition = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h6" className="font-semibold mb-5 text-center">
        Terms & Condition
      </Typography>
      <Table className="border border-[#e0e0e0]">
        <TableBody className="[&>tr>td]:border-l  [&>tr>td]:border-[#e0e0e0] [&>tr>td]:font-semibold">
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Product Transport Facility</TableCell>
            <TableCell>Single Point Transport Only</TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={2}>2</TableCell>
            <TableCell rowSpan={2}>Payment Terms</TableCell>
            <TableCell>As per selection</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Payment Mode : A/C Pay Cheque in favor of “Walton Digi-Tech
              Industries Limited”
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>Delivery Deadline</TableCell>
            <TableCell>As per selection </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>Price Validity</TableCell>
            <TableCell>As per selection</TableCell>
          </TableRow>

          <TableRow>
            <TableCell rowSpan={2}>5</TableCell>
            <TableCell rowSpan={2}>VAT & AIT</TableCell>
            <TableCell>As per Selection</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Payment Mode : A/C Pay Cheque in favor of “Walton Digi-Tech
              Industries Limited”
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default TermsCondition;
