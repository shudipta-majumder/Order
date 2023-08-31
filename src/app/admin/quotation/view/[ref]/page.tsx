"use client";
import CoverLetter from "@/components/pageComponents/quotation/view/CoverLetter";
import ProductSpec from "@/components/pageComponents/quotation/view/ProductSpec";
import TermsCondition from "@/components/pageComponents/quotation/view/TermsCondition";
import axios from "@/lib/axios";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SimpleBackdrop from "@/components/common/SimpleBackdrop";
import PDFMake from "@/components/pageComponents/quotation/PDFMake/PDFMake";
type Props = {
  params: { ref: string };
};

export default function SimplePaper({ params }: Props) {
  const [quotationDetails, setQuotationDetails] = useState({
    product_details: [],
  });
  const [backdropOpen, setBackdropOpen] = useState(true);

  const { product_details } = quotationDetails;

  useEffect(() => {
    axios
      .get(`/api/quote/quotation/${params.ref}/`)
      .then(({ data }) => {
        setQuotationDetails(data.data);
        setBackdropOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let totalProductQuantity = 0;
  let totalProductPrice = 0;
  let additionalWarrantyCharge = 0;

  return (
    <>
      {backdropOpen ? (
        <SimpleBackdrop />
      ) : (
        <Container maxWidth="lg">
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Paper className="px-16 py-20 my-8">
                <CoverLetter quotationDetails={quotationDetails} />
              </Paper>
              {product_details?.map((product, index) => {
                const {
                  quantity,
                  price,
                  discount_pct,
                  additional_warranty_charge,
                } = product;
                additionalWarrantyCharge += additional_warranty_charge;
                totalProductQuantity += quantity;
                totalProductPrice +=
                  quantity * price -
                  (quantity * price * discount_pct) / 100 +
                  additionalWarrantyCharge;
                const grandTotal = { totalProductQuantity, totalProductPrice };
                return (
                  <Paper className="px-16 py-20 my-8" key={uuidv4()}>
                    <ProductSpec
                      product={product}
                      grandTotal={
                        product_details.length === ++index
                          ? grandTotal
                          : undefined
                      }
                    />
                  </Paper>
                );
              })}
              <Paper className="px-16 py-20 my-8">
                <TermsCondition quotationDetails={quotationDetails} />
              </Paper>
              <PDFMake quotationDetails={quotationDetails} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
