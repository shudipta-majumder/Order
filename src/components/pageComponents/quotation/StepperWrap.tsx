"use client";
import axios from "@/lib/axios";
import {
  Container,
  Grid,
  Step,
  StepButton,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ClientInfo from "./ClientInfo";
import PolicyPayment from "./PolicyPayment";
import ProductInfo from "./ProductInfo";
import RepresentativeInfo from "./RepresentativeInfo";

const steps = [
  "Client Info",
  "Product Info",
  "Policy & Payment",
  "Representative Info",
];

const StepperWrap = ({ data }) => {
  const [skeleton, setSkeleton] = useState(true);
  const [quotationData, setQuotationData] = useState({});
  const searchParams = useSearchParams();
  const queryStep = parseInt(searchParams.get("step"));
  const [activeStep, setActiveStep] = useState(0);

  const { data: session, status } = useSession();
  const quotationId = searchParams.get("id");
  useEffect(() => {
    //@ts-ignore
    let user = session?.user?.data?.id;
    setQuotationData((prev) => ({ ...prev, user }));
    if (quotationId) {
      axios
        .get(`/api/quote/quotation/${quotationId}/`)
        .then(({ data }) => {
          let { step } = data.data;
          let quotation = { ...data.data, queryStep };
          if (queryStep) {
            setActiveStep(queryStep);
          } else {
            setActiveStep(step);
          }
          setQuotationData(quotation);
          setSkeleton(false);
        })
        .catch((error) => {
          console.log("catch", error);
          setSkeleton(false);
          toast.error(error.message);
        });
    } else {
      setSkeleton(false);
    }
  }, [quotationId, session]);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const stepProps = {
    skeleton,
    setSkeleton,
    setActiveStep,
    quotationData,
    setQuotationData,
  };

  const policyPaymentProps = {
    skeleton,
    setSkeleton,
    setActiveStep,
    quotationData,
    setQuotationData,
    data,
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className="my-6 md:my-10"
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    <StepLabel>{label}</StepLabel>
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              className="justify-center"
            >
              <Grid item xs={12} lg={11}>
                {activeStep == 0 && <ClientInfo {...stepProps} />}
                {activeStep == 1 && <ProductInfo {...stepProps} />}
                {activeStep == 2 && <PolicyPayment {...policyPaymentProps} />}
                {activeStep == 3 && <RepresentativeInfo {...stepProps} />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default StepperWrap;
