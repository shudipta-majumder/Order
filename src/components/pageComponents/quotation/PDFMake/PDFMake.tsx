"use client";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { logoDataURI } from "./logoDataURI";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
dayjs.extend(LocalizedFormat);
pdfMake.vfs = pdfFonts.pdfMake.vfs;
type Props = { quotationDetails: {} };

const PDFMake = ({ quotationDetails }: Props) => {
  // prettier-ignore
  //@ts-ignore
  const {quotation_reference,client_date,client_name,client_designation,client_address,product_details,rep_name,rep_designation,rep_mobile,rep_email,delivery_lead_time,payment_mode,price_validity,vat_ait,reference_no} = quotationDetails;

  let productDetailsLength = product_details.length;
  let totalProductQuantity = 0;
  let totalProductPrice = 0;
  let additionalWarrantyCharge = 0;
  let productDetails = product_details.map((product, index) => {
    const {
      quantity,
      price,
      discount_pct,
      additional_warranty,
      additional_warranty_charge,
    } = product;

    additionalWarrantyCharge += additional_warranty_charge;
    totalProductQuantity += quantity;
    totalProductPrice +=
      quantity * price -
      (quantity * price * discount_pct) / 100 +
      additionalWarrantyCharge;
    const table = {
      headerRows: 1,
      widths: ["*", 30, 53, "auto", "auto"],
      body: [
        [
          {
            text: "Product Specification & Description",
            alignment: "center",
          },
          { text: "Qty", alignment: "center" },
          { text: "Unit Price", alignment: "center" },
          { text: "Discount", alignment: "center" },
          { text: "Total", alignment: "center" },
        ],
        [
          product.details.map(({ title, details }) => ({
            columnGap: 5,
            margin: [0, 8, 0, 8],
            columns: [
              {
                lineHeight: 1.25,
                width: 90,
                text: title,
              },
              {
                lineHeight: 1.25,
                width: "*",
                text: details.join(","),
              },
            ],
          })),
          { text: quantity, alignment: "center" },
          { text: price, alignment: "center" },
          {
            stack: [
              {
                text: (price * discount_pct) / 100,
                alignment: "center",
              },
              { text: `(${discount_pct}%)`, alignment: "center" },
            ],
          },
          {
            text: quantity * price - (quantity * price * discount_pct) / 100,
            alignment: "center",
          },
        ],
      ],
    };
    if (additional_warranty && additional_warranty_charge) {
      table.body.push([
        {
          columnGap: 5,
          margin: [0, 8, 0, 8],
          columns: [
            {
              lineHeight: 1.25,
              width: "*",
              text: "Additional Warranty",
            },
            {
              lineHeight: 1.25,
              width: "*",
              text: `${additional_warranty} Year`,
            },
          ],
        },
        { text: "" },
        { text: "" },
        {
          text: "",
        },
        {
          text: additional_warranty_charge,
          alignment: "center",
        },
      ]);
    }
    return {
      table,
      pageBreak: "after",
    };
  });

  productDetails[productDetailsLength - 1].table.body.push([
    {
      text: "Grand Total (Including VAT & AIT)",
      alignment: "center",
      bold: true,
    },
    { text: totalProductQuantity, alignment: "center", bold: true },
    { text: "-", alignment: "center", bold: true },
    { text: "-", alignment: "center", bold: true },
    { text: totalProductPrice, alignment: "center", bold: true },
  ]);

  let termsConditionsBody = [
    [
      {
        text: "1",
        alignment: "center",
      },
      { text: "Product Transport Facility" },
      { text: "Single Point Transport Only" },
    ],
    [
      {
        rowSpan: 2,
        text: "2",
        alignment: "center",
      },
      { rowSpan: 2, text: "Payment Terms" },
      { text: payment_mode },
    ],
    [
      "",
      "",
      {
        text: "Payment Mode : A/C Pay Cheque in favor of “Walton Digi-Tech Industries Limited”",
      },
    ],
    [
      {
        text: "3",
        alignment: "center",
      },
      { text: "Delivery Deadline" },
      { text: `${delivery_lead_time} Days` },
    ],
    [
      {
        text: "4",
        alignment: "center",
      },
      { text: "Price Validity" },
      { text: price_validity },
    ],
  ];

  vat_ait &&
    termsConditionsBody.push(
      [
        {
          rowSpan: 2,
          text: "5",
          alignment: "center",
        },
        { rowSpan: 2, text: "VAT & AIT" },
        {
          text: "As per NBR order no. 08.01.0000.034.02.375.2020-173 Dated: 22-06-2023 (Tax Exemption Wing) the invoice amount is exempted for Tax.",
        },
      ],
      [
        "",
        "",
        {
          text: "As per NBR order no. 08.01.0000.068.018.002.21/177 Dated: 26-07-2023 (VAT Policy & Rules Wing) the invoice amount is exempted for VAT.",
        },
      ]
    );

  var docDefinition = {
    pageMargins: [50, 80, 50, 90],
    header: {
      margin: [0, 10, 0, 10],
      image: logoDataURI,
      fit: [595, 43],
    },
    content: [
      {
        lineHeight: 1.1,
        alignment: "justify",
        stack: [
          {
            text: quotation_reference,
            alignment: "right",
          },
          {
            text: `Date: ${dayjs(client_date).format("LL")}`,
          },
          {
            text: `Reference No (if any): ${reference_no}`,
            margin: [0, 16, 0, 0],
          },
          {
            text: `${client_name}`,
            margin: [0, 16, 0, 0],
            style: { bold: true },
          },
          {
            text: `${client_designation}`,
          },
          {
            text: `${client_address}`,
          },
          {
            text: `Technical Specification & Price Offer for "Supply of Digital Products"`,
            margin: [0, 12, 0, 0],
            style: { bold: true },
          },
          {
            text: `Dear Sir`,
            margin: [0, 12, 0, 0],
          },
          {
            text: `Greetings from WALTON Digi-Tech Industries Limited!`,
            margin: [0, 8, 0, 0],
          },
          {
            text: `We are sending this technical specification and price after as per your requirement. You have stated the need for IT products for your reputed organization.`,
            margin: [0, 8, 0, 0],
          },
          {
            text: `Our company is ons of the most reliable and credible entities to provide IT, IOT and Digital Products along with related Services. The quality of products and services we deliver to our customers is the best in the market.`,
            margin: [0, 8, 0, 0],
          },
          {
            text: `We are providing this business proposal along with the technical specification for your kind acknowledgement Hence we are grateful to you for allowing us to submit the business proposal and we are looking forward to serve you.`,
            margin: [0, 8, 0, 0],
          },
          {
            text: `Sincerely yours`,
            margin: [0, 15, 0, 0],
          },
          {
            text: `-----------------------------`,
            margin: [0, 35, 0, 0],
          },
          {
            text: `Name : ${rep_name}`,
          },
          {
            text: `Designation : ${rep_designation}`,
          },
          {
            text: `Mobile :${rep_mobile}`,
          },
          {
            text: `E-mail : ${rep_email}`,
            pageBreak: "after",
          },
        ],
      },
      ...productDetails,
      [
        {
          text: "TERMS & CONDITIONS",
          alignment: "center",
          bold: true,
          margin: [0, 0, 0, 20],
          fontSize: 16,
        },
        {
          table: {
            headerRows: 0,
            widths: ["auto", 170, "*"],
            body: termsConditionsBody,
          },
        },
      ],
    ],
    footer: {
      margin: [20, 10, 20, 10],
      alignment: "center",
      fontSize: 9.4,
      stack: [
        {
          text: "*This is computer generated Application, No Signature Required",
          style: { color: "red" },
          alignment: "right",
          margin: [0, 0, 0, 25],
        },
        {
          text: [
            {
              text: "Corporate Office:",
              style: { bold: true },
            },
            {
              text: " Plot No.:1088, Block:I, Road: Sabrina Sobhan 5th Avenue, Bashundhara, Dhaka-1229, Bangladesh.",
            },
          ],
        },
        {
          text: "Tel:+8809606555555, Mob: +8801678860002, e-mail:digitech@waltonbd.com, digicom@waltonbd.com, www.waltondigitech.com",
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 1,
              x2: 550,
              y2: 2,
              lineWidth: 1,
              lineColor: "#276fb8",
            },
          ],
        },
        {
          text: [
            {
              text: "Headquarters:",
              style: { bold: true },
            },
            {
              text: " Chandra, Kaliakoir, Gazipur, Bangladesh, Mob: +8801678860001, e-mail: digitech@waltonbd.com, www.waltonbd.com",
            },
          ],
        },
      ],
    },
  };
  const hdlDownloadPDF = () => {
    pdfMake.createPdf(docDefinition).download();
  };
  return (
    <Box className="text-center">
      <Button
        variant="contained"
        onClick={hdlDownloadPDF}
        startIcon={<DownloadForOfflineIcon />}
      >
        Download PDF
      </Button>
    </Box>
  );
};

export default PDFMake;
