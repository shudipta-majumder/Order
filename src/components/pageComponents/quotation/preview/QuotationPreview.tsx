"use client";
import axios from "@/lib/axios";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ClientInfo from "./ClientInfo";
import PolicyPayment from "./PolicyPayment";
import ProductInfo from "./ProductInfo";
import RepresentativeInfo from "./RepresentativeInfo";
import UndoIcon from "@mui/icons-material/Undo";
import { redirect } from "next/navigation";
import SimpleBackdrop from "@/components/common/SimpleBackdrop";

const QuotationPreview = ({ params }) => {
  const [quotData, setQuotData] = useState({ id: "", quotation_reference: "" });
  const [isDisabled, setIsDisabled] = useState(true);
  const [backdropOpen, setBackdropOpen] = useState(true);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/quote/quotation/${params.id}`)
      .then(({ data }) => {
        setQuotData(data.data);
        setBackdropOpen(false);
      })
      .catch((error) => {
        setBackdropOpen(false);
        if (error.code === "ECONNABORTED" || error.code === "ECONNREFUSED") {
          redirect("/404");
        }
      });
  }, []);

  const hdlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisabled(!isDisabled);
  };

  const hdlClickSubmit = () => {
    setBackdropOpen(true);
    axios
      .put(`/api/quote/quotation/${quotData.id}/`, { is_submitted: true })
      .then(({ data }) => {
        if (data.code == "200") {
          toast.success(data.message);
          router.push("/quotation");
          setBackdropOpen(false);
        }
      })
      .catch((error) => {
        setBackdropOpen(false);
        console.log(error);
        toast.error(error?.data?.errors[0]);
      });
  };

  return (
    <>
      {backdropOpen ? (
        <SimpleBackdrop />
      ) : (
        <Container maxWidth="lg">
          <Box className="h_style flex flex-wrap gap-x-4 justify-between">
            <Typography variant="h5" component="h1" className="font-bold">
              Quotation (Preview) : {quotData.quotation_reference}
            </Typography>
            <Box>
              <Button
                variant="contained"
                size="small"
                startIcon={<UndoIcon />}
                component={NextLink}
                href="/quotation"
              >
                Back Quotations
              </Button>
            </Box>
          </Box>
          <ClientInfo quotData={quotData} />
          <ProductInfo quotData={quotData} />
          <PolicyPayment quotData={quotData} />
          <RepresentativeInfo quotData={quotData} />
          <Box className="mt-10">
            <FormControlLabel
              control={<Checkbox onChange={hdlChange} />}
              label={
                <Box>
                  I accept all the{" "}
                  <NextLink href="/terms-condition" className="text-info">
                    Terms & Condition
                  </NextLink>
                  .
                </Box>
              }
            />

            <Box className="text-center mt-5">
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                disabled={isDisabled}
                onClick={hdlClickSubmit}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default QuotationPreview;
