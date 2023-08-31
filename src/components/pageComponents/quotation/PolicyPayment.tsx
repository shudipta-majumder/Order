import axios from "@/lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

const schema = yup.object({
  payment_mode: yup.string().required().label("Payment mode"),
  delivery_lead_time: yup.string().required().label("Delivery lead time"),
  price_validity: yup.string().required().label("Price validity"),
  vat_ait: yup.boolean(),
});

const PolicyPayment = ({
  skeleton,
  setSkeleton,
  setActiveStep,
  quotationData,
  setQuotationData,
  data,
}) => {
  let { queryStep, payment_mode, delivery_lead_time, price_validity, vat_ait } =
    quotationData;
  const router = useRouter();
  const {
    paymentModeData: { data: paymentMode },
    priceValidityData: { data: priceValidity },
  } = data;

  const defaultValues = {
    payment_mode: payment_mode ? payment_mode : "",
    delivery_lead_time: delivery_lead_time ? delivery_lead_time : "",
    price_validity: price_validity ? price_validity : "",
    vat_ait,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setSkeleton(true);
    const { id, user, step } = quotationData;
    const { delivery_lead_time, payment_mode, price_validity, vat_ait } = data;
    const body = {
      user,
      payment_mode,
      delivery_lead_time,
      price_validity,
      vat_ait,
      step: queryStep ? step : step + 1,
    };
    axios
      .put(`/api/quote/quotation/${id}/`, body)
      .then(({ data }) => {
        setQuotationData((prev) => ({ ...prev, ...data.data }));
        setSkeleton(false);
        toast.success(data.message);
        if (queryStep) {
          router.push(`/quotation/preview/${data.data.id}`);
        } else {
          handleNext();
        }
      })
      .catch((error) => {
        console.log(error);
        setSkeleton(false);
        toast.error(error?.data?.errors[0]);
      });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Typography variant="h6" component="h1" className="h_style">
        Policy and Payment
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="justify-center"
        >
          <Grid item xs={12} md={4}>
            {skeleton ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={38}
                className="mb-1"
                key={uuidv4()}
              />
            ) : (
              <Controller
                name="payment_mode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    id="payment_mode"
                    label="Payment Mode *"
                    margin="dense"
                    size="small"
                    error={!!errors?.payment_mode?.message}
                    //@ts-ignore
                    helperText={errors?.payment_mode?.message}
                  >
                    {paymentMode.map(({ mode }) => (
                      <MenuItem value={`${mode}`} key={uuidv4()}>
                        {`${mode}`}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            {skeleton ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={38}
                className="mb-1"
                key={uuidv4()}
              />
            ) : (
              <Controller
                name="delivery_lead_time"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Delivery Lead Time (Working Days) *"
                    margin="dense"
                    size="small"
                    type="number"
                    error={!!errors?.delivery_lead_time?.message}
                    //@ts-ignore
                    helperText={errors?.delivery_lead_time?.message}
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            {skeleton ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={38}
                className="mb-1"
                key={uuidv4()}
              />
            ) : (
              <Controller
                name="price_validity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="Price Validity *"
                    margin="dense"
                    size="small"
                    error={!!errors?.price_validity?.message}
                    //@ts-ignore
                    helperText={errors?.price_validity?.message}
                  >
                    {priceValidity.map(({ validity }) => (
                      <MenuItem key={uuidv4()} value={validity}>
                        {validity}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            {skeleton ? (
              <Skeleton
                variant="rectangular"
                width="20%"
                height={38}
                className="mb-1"
                key={uuidv4()}
              />
            ) : (
              <Controller
                name="vat_ait"
                control={control}
                render={({ field }) => (
                  <FormControl variant="standard">
                    <FormControlLabel
                      control={
                        <Checkbox {...field} defaultChecked={field.value} />
                      }
                      label={<Box>Is Aplicable VAT/AIT</Box>}
                    />
                  </FormControl>
                )}
              />
            )}
          </Grid>
        </Grid>
        <Box className="flex justify-between gap-x-10 mt-5">
          <Button
            variant="outlined"
            startIcon={<SkipPreviousIcon />}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button variant="contained" endIcon={<SkipNextIcon />} type="submit">
            Save & {queryStep ? "Preview" : "Next"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PolicyPayment;
