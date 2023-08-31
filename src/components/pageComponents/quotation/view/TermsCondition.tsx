import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  TableCell,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

type Props = { quotationDetails: {} };

const TermsCondition = ({ quotationDetails }: Props) => {
  // prettier-ignore
  //@ts-ignore
  const {price_validity,delivery_lead_time,payment_mode,vat_ait} = quotationDetails;
  return (
    <>
      <Typography variant="h6" className="font-semibold mb-5 text-center">
        Terms & Condition
      </Typography>
      <Table className="border border-[#e0e0e0]">
        <TableBody className="[&>tr>td]:border-l  [&>tr>td]:border-[#e0e0e0] ">
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Product Transport Facility</TableCell>
            <TableCell>Single Point Transport Only</TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={2}>2</TableCell>
            <TableCell rowSpan={2}>Payment Terms</TableCell>
            <TableCell>{payment_mode}</TableCell>
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
            <TableCell>{delivery_lead_time} days</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>Price Validity</TableCell>
            <TableCell>{price_validity}</TableCell>
          </TableRow>
          {vat_ait && (
            <>
              <TableRow>
                <TableCell rowSpan={2}>5</TableCell>
                <TableCell rowSpan={2}>VAT & AIT</TableCell>
                <TableCell>
                  As per NBR order no. 08.01.0000.034.02.375.2020-173 Dated:
                  22-06-2023 (Tax Exemption Wing) the invoice amount is exempted
                  for Tax.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  As per NBR order no. 08.01.0000.068.018.002.21/177 Dated:
                  26-07-2023 (VAT Policy & Rules Wing) the invoice amount is
                  exempted for VAT.
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TermsCondition;
