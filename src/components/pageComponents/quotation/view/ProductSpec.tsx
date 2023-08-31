import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  product: {
    details: [{ title; details: [] }];
    quantity: string;
    price: number;
    discount_pct: number;
    additional_warranty: number;
    additional_warranty_charge: number;
  };
  grandTotal?: {
    totalProductQuantity: number;
    totalProductPrice: number;
  };
};

const ProductSpec = ({ product, grandTotal }: Props) => {
  const {
    price,
    quantity,
    discount_pct,
    additional_warranty,
    additional_warranty_charge,
  } = product;
  const discount = (price * parseInt(quantity) * discount_pct) / 100;
  const total = price * parseInt(quantity);
  return (
    <Table className="border border-[#e0e0e0]">
      <TableHead className="[&>tr>th]:text-center [&>tr>th]:border-l [&>tr>th]:border-[#e0e0e0] [&>tr>th]:border-t">
        <TableRow>
          <TableCell className="font-semibold text-left !important">
            Product Specification &amp; Description
          </TableCell>
          <TableCell className="font-semibold">Qty</TableCell>
          <TableCell className="font-semibold">UnitPrice</TableCell>
          <TableCell className="font-semibold">Discount</TableCell>
          <TableCell className="font-semibold border-r">Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className="[&>tr>td]:border-l [&>tr>td]:border-b-0 [&>tr>td]:border-[#e0e0e0]">
        <TableRow>
          <TableCell className="p-0">
            <Table className="[&>tr>td]:border-b-0">
              <TableBody>
                {product?.details.map(({ title, details }) => (
                  <TableRow key={uuidv4()}>
                    <TableCell>{title}</TableCell>
                    <TableCell>
                      {details.map((item, index) => (
                        <Fragment key={uuidv4()}>
                          {item}
                          {details.length !== ++index && ","}{" "}
                        </Fragment>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
          <TableCell className="text-center">{product.quantity}</TableCell>
          <TableCell>{product.price}</TableCell>
          <TableCell>
            {discount} ({product.discount_pct}%)
          </TableCell>
          <TableCell>{total - discount}</TableCell>
        </TableRow>
        {additional_warranty && additional_warranty_charge && (
          <TableRow>
            <TableCell className="p-0">
              <Table className="[&>tr>td]:border-b-0">
                <TableBody>
                  <TableRow>
                    <TableCell className="w-[150px]">
                      ADDITIONAL WARRANTY
                    </TableCell>
                    <TableCell>{additional_warranty} Years</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{additional_warranty_charge}</TableCell>
          </TableRow>
        )}
        {grandTotal && (
          <TableRow className="[&>td]:border-t [&>tr>td]:border-[#e0e0e0]">
            <TableCell className="font-bold !border-t-0">
              Grand Total (Including VAT &amp; AIT)
            </TableCell>
            <TableCell className="font-bold">
              {grandTotal.totalProductQuantity}
            </TableCell>
            <TableCell className="font-bold">-</TableCell>
            <TableCell className="font-bold">-</TableCell>
            <TableCell className="font-bold">
              {grandTotal.totalProductPrice}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProductSpec;
