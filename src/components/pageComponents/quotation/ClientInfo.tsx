import axios from "@/lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

const schema = yup
  .object({
    client_date: yup.string().required().label("Date"),
    reference_no: yup.string().required().label("Ref. No."),
    client_organization: yup.string().required().label("Organization"),
    client_name: yup.string().required().label("Name"),
    client_designation: yup.string().required().label("Designation"),
    client_address: yup.string().required().label("Address"),
  })
  .required();

const defaultValues = {
  client_date: "",
  reference_no: "",
  client_organization: "",
  client_name: "",
  client_designation: "",
  client_address: "",
};

const ClientInfo = ({
  skeleton,
  setSkeleton,
  setActiveStep,
  quotationData,
  setQuotationData,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const quotationId = searchParams.get("id");
  let { client_date, queryStep } = quotationData;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (client_date) {
      client_date = dayjs(client_date);
      const updateQuotationData = { ...quotationData, client_date };
      reset(updateQuotationData);
    }
  }, [quotationData]);

  const onSubmit = (data) => {
    setSkeleton(true);
    let { client_date } = data;
    client_date = dayjs(client_date).format("YYYY-MM-DD");
    let { user, step } = quotationData;
    const body = {
      ...data,
      user,
      client_date,
      step: queryStep ? step : 1,
    };
    if (!quotationId) {
      axios
        .post("/api/quote/quotation/", body)
        .then(({ data }) => {
          setQuotationData((prev) => ({ ...prev, ...data.data }));
          setSkeleton(false);
          toast.success(data.message);
          router.push(`${pathname}?id=${data.data.id}`);
          handleNext();
        })
        .catch((error) => {
          console.log("error", error);
          toast.error(error?.response?.data?.errors[0]);
        });
    } else {
      axios
        .put(`/api/quote/quotation/${quotationId}/`, body)
        .then(({ data }) => {
          let { client_date } = data.data;
          client_date = dayjs(client_date);
          let quotation = { ...data.data, client_date };
          setQuotationData((prev) => ({ ...prev, ...quotation }));
          setSkeleton(false);
          toast.success(data.message);
          if (queryStep) {
            router.push(`/quotation/preview/${data.data.id}`);
          } else {
            router.push(`${pathname}?id=${data.data.id}`);
            handleNext();
          }
        })
        .catch((error) => {
          console.log(error);
          setSkeleton(false);
          toast.error(error?.data?.errors[0]);
        });
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <Typography variant="h6" component="h1" className="h_style">
        Client Information
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={6}>
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
                    name="client_date"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            {...field}
                            label="Date *"
                            format="DD-MM-YYYY"
                            className="min-w-full"
                            slotProps={{
                              textField: {
                                size: "small",
                                fullWidth: true,
                                error: !!errors?.client_date?.message,
                                helperText: errors?.client_date?.message,
                                inputProps: { autoComplete: "off" },
                              },
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
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
                    name="reference_no"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Reference no (if any) *"
                        margin="dense"
                        size="small"
                        error={!!errors?.reference_no?.message}
                        helperText={errors?.reference_no?.message}
                        inputProps={{ autoComplete: "off" }}
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
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
                name="client_organization"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Organization *"
                    margin="dense"
                    size="small"
                    error={!!errors?.client_organization?.message}
                    helperText={errors?.client_organization?.message}
                    inputProps={{ autoComplete: "off" }}
                  />
                )}
              />
            )}
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
                name="client_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Name *"
                    margin="dense"
                    size="small"
                    error={!!errors?.client_name?.message}
                    helperText={errors?.client_name?.message}
                    inputProps={{ autoComplete: "off" }}
                  />
                )}
              />
            )}
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
                name="client_designation"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Designation *"
                    margin="dense"
                    size="small"
                    error={!!errors?.client_designation?.message}
                    helperText={errors?.client_designation?.message}
                    inputProps={{ autoComplete: "off" }}
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            {skeleton ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={120}
                className="mb-1 mt-2"
                key={uuidv4()}
              />
            ) : (
              <Controller
                name="client_address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Address *"
                    margin="dense"
                    size="small"
                    multiline
                    rows={4}
                    error={!!errors?.client_address?.message}
                    helperText={errors?.client_address?.message}
                    inputProps={{ autoComplete: "off" }}
                  />
                )}
              />
            )}
          </Grid>
        </Grid>
        <Box className="flex justify-between gap-x-10 mt-5">
          <Button startIcon={<SkipPreviousIcon />} disabled variant="outlined">
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

export default ClientInfo;
