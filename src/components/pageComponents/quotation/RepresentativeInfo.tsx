"use client";
import axios from "@/lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import PreviewIcon from "@mui/icons-material/Preview";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Box, Button, Grid, TextField, Typography, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const schema = yup.object({
  rep_name: yup.string().required().label("Name"),
  rep_designation: yup.string().required().label("Designation"),
  rep_mobile: yup.string().required().label("Mobile"),
  rep_email: yup.string().email().required().label("Email"),
});

const RepresentativeInfo = ({
  skeleton,
  setSkeleton,
  setActiveStep,
  quotationData,
  setQuotationData,
}) => {
  let { queryStep, rep_name, rep_designation, rep_mobile, rep_email } =
    quotationData;
  const router = useRouter();

  const defaultValues = {
    rep_name: rep_name ? rep_name : "",
    rep_designation: rep_designation ? rep_designation : "",
    rep_mobile: rep_mobile ? rep_mobile : "",
    rep_email: rep_email ? rep_email : "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setSkeleton(true);
    const { id, user, step } = quotationData;
    const { rep_name, rep_designation, rep_email, rep_mobile } = data;
    const body = {
      user,
      rep_name,
      rep_designation,
      rep_email,
      rep_mobile,
      step: queryStep ? step : step + 1,
    };
    axios
      .put(`/api/quote/quotation/${id}/`, body)
      .then(({ data }) => {
        setQuotationData((prev) => ({ ...prev, ...data.data }));
        toast.success(data.message);
        router.push(`/quotation/preview/${id}`);
        setSkeleton(false);
      })
      .catch((error) => {
        console.log(error);
        setSkeleton(false);
        toast.error(error?.data?.errors[0]);
      });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Typography variant="h6" component="h1" className="h_style">
        Representative information
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
          <Grid item xs={12} md={6}>
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
              name="rep_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name *"
                  margin="dense"
                  size="small"
                  error={!!errors?.rep_name?.message}
                  //@ts-ignore
                  helperText={errors?.rep_name?.message}
                />
              )}
            />
            ) }
          </Grid>
          <Grid item xs={12} md={6}>
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
              name="rep_designation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Designation *"
                  margin="dense"
                  size="small"
                  error={!!errors?.rep_designation?.message}
                  //@ts-ignore
                  helperText={errors?.rep_designation?.message}
                />
              )}
            />
            ) }
          </Grid>
          <Grid item xs={12} md={6}>
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
              name="rep_mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mobile *"
                  margin="dense"
                  size="small"
                  error={!!errors?.rep_mobile?.message}
                  //@ts-ignore
                  helperText={errors?.rep_mobile?.message}
                />
              )}
            />
            ) }
          </Grid>
          <Grid item xs={12} md={6}>
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
              name="rep_email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email *"
                  margin="dense"
                  size="small"
                  error={!!errors?.rep_email?.message}
                  //@ts-ignore
                  helperText={errors?.rep_email?.message}
                />
              )}
            />
            ) }
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
          <Button variant="contained" endIcon={<PreviewIcon />} type="submit">
            Save & Preview
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default RepresentativeInfo;
