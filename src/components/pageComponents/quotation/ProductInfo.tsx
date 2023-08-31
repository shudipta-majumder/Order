import axios from "@/lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";
import mainAxios from "axios";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const schema = yup.object({
  productInfo: yup.array().of(
    yup.object().shape({
      product_category_id: yup.object().shape({
        id: yup
          .number()
          .required()
          .label("Category")
          .typeError("Category is a required field"),
        label: yup.string().required(),
      }),
      product_model_id: yup.object().shape({
        product_variant_id: yup
          .number()
          .required()
          .label("Model")
          .typeError("Category is a required field"),
        product_desc: yup.string().required(),
      }),
      quantity: yup.string().required().label("Quantity"),
      discount_pct: yup
        .number()
        .max(10, "Discount max limit 10")
        .label("Discount")
        .typeError("Discount is a required field"),
    })
  ),
});

const defaultValues = {
  productInfo: [
    {
      product_category_id: {},
      product_model_id: {},
      quantity: "",
      discount_pct: 0,
      additional_warranty: "",
      additional_warranty_charge: "",
      modelList: [],
    },
  ],
};

const ProductInfo = ({
  skeleton,
  setSkeleton,
  setActiveStep,
  quotationData,
  setQuotationData,
}) => {
  const { product_details, step, queryStep } = quotationData;
  const [category, setCategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    mainAxios
      .get("http://192.168.150.185:8000/api/menu/category/product")
      .then(({ data }) => {
        setCategory(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productInfo",
  });

  useEffect(() => {
    if (product_details && product_details.length) {
      const productInfo = product_details.map((product) => {
        const {
          additional_warranty,
          additional_warranty_charge,
          discount_pct,
          product_category_id,
          product_category_name,
          product_model_id,
          product_model_name,
          quantity,
        } = product;
        return {
          additional_warranty: additional_warranty ? additional_warranty : "",
          additional_warranty_charge: additional_warranty_charge
            ? additional_warranty_charge
            : "",
          discount_pct,
          product_category_id: {
            id: product_category_id,
            label: product_category_name,
          },
          product_model_id: {
            product_variant_id: product_model_id,
            product_desc: product_model_name,
          },
          quantity,
          modelList: [],
        };
      });
      reset({ productInfo });
    }
  }, [quotationData]);

  const hdlCategoryChange = (index, item) => {
    if (item) {
      mainAxios
        .get(`http://192.168.150.185:8000/api/menu/variant/${item.id}`)
        .then(({ data }) => {
          setValue(`productInfo.${index}.modelList`, data.data.product);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setValue(`productInfo.${index}.modelList`, []);
    }
  };

  const hdlAddMoreProduct = () => {
    append({
      product_category_id: "",
      product_model_id: "",
      quantity: "",
      discount_pct: 0,
      additional_warranty: "",
      additional_warranty_charge: "",
      modelList: [],
    });
  };

  const onSubmit = (data) => {
    setSkeleton(true);
    let { id } = quotationData;
    const updateProductInfo = data.productInfo.map((product) => {
      const {
        additional_warranty,
        additional_warranty_charge,
        discount_pct,
        product_category_id,
        product_model_id,
        quantity,
      } = product;
      return {
        additional_warranty: additional_warranty ? additional_warranty : null,
        additional_warranty_charge: additional_warranty_charge
          ? additional_warranty_charge
          : null,
        discount_pct,
        product_category_id: product_category_id.id,
        product_category_name: product_category_id.label,
        product_model_id: product_model_id.product_variant_id,
        product_model_name: product_model_id.product_desc,
        quantity,
        quotation: id,
      };
    });
    const body = {
      data: updateProductInfo,
      step: queryStep ? step : step + 1,
    };
    axios
      .post(`/api/quote/product_info/`, body)
      .then(({ data }) => {
        setQuotationData((prev) => {
          const updateQuotData = { ...prev, ...data.data };
          return updateQuotData;
        });
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

  const watchProductInfo = watch("productInfo");
  return (
    <>
      <Typography variant="h6" component="h1" className="h_style">
        Product Specification
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map((field, index) => {
          return (
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              className="justify-center mt-5"
              key={field.id}
            >
              <Grid item xs={12} className="flex justify-between gap-x-1">
                <Typography variant="h6">Product:{1 + index}</Typography>{" "}
                <Stack>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    className="py-1"
                    disabled={fields.length == 1}
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </Stack>
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
                    name={`productInfo.${index}.product_category_id`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        // freeSolo
                        onChange={(event, item) => {
                          onChange(item);
                          hdlCategoryChange(index, item);
                        }}
                        value={value}
                        options={category}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        getOptionLabel={(item) =>
                          item.label ? item.label : ""
                        }
                        renderOption={(props, option) => (
                          <Box component="li" {...props} key={uuidv4()}>
                            {option.label}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            label="Category *"
                            margin="dense"
                            size="small"
                            error={
                              errors?.productInfo?.length > 0 &&
                              // prettier-ignore
                              //@ts-ignore
                              !!errors?.productInfo[index]?.product_category_id?.id.message
                            }
                            helperText={
                              errors?.productInfo?.length > 0 &&
                              // prettier-ignore
                              //@ts-ignore
                              errors?.productInfo[index]?.product_category_id?.id?.message
                            }
                          />
                        )}
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
                    name={`productInfo.${index}.product_model_id`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        // freeSolo
                        onChange={(event, item) => {
                          onChange(item);
                        }}
                        value={value}
                        options={
                          watchProductInfo.length > 0
                            ? watchProductInfo[index].modelList
                            : []
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        getOptionLabel={(item) =>
                          item.product_desc ? item.product_desc : ""
                        }
                        renderOption={(props, option) => (
                          <Box component="li" {...props} key={uuidv4()}>
                            {option.product_desc}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            label="Model *"
                            margin="dense"
                            size="small"
                            error={
                              // prettier-ignore
                              //@ts-ignore
                              errors?.productInfo?.length > 0 && !!errors?.productInfo[index]?.product_model_id?.product_variant_id?.message
                            }
                            helperText={
                              // prettier-ignore
                              //@ts-ignore
                              errors?.productInfo?.length > 0 && errors?.productInfo[index]?.product_model_id?.product_variant_id?.message
                            }
                          />
                        )}
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
                    name={`productInfo.${index}.quantity`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Quantity *"
                        type="number"
                        margin="dense"
                        size="small"
                        error={
                          errors?.productInfo?.length > 0 &&
                          !!errors?.productInfo[index]?.quantity?.message
                        }
                        helperText={
                          errors?.productInfo?.length > 0 &&
                          errors?.productInfo[index]?.quantity?.message
                        }
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
                    name={`productInfo.${index}.discount_pct`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Discount (%) *"
                        type="number"
                        margin="dense"
                        size="small"
                        inputProps={{ max: 10 }}
                        error={
                          errors?.productInfo?.length > 0 &&
                          !!errors?.productInfo[index]?.discount_pct?.message
                        }
                        helperText={
                          errors?.productInfo?.length > 0 &&
                          errors?.productInfo[index]?.discount_pct?.message
                        }
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
                    name={`productInfo.${index}.additional_warranty`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Additional Warranty"
                        type="number"
                        margin="dense"
                        size="small"
                        error={
                          errors?.productInfo?.length > 0 &&
                          !!errors?.productInfo[index]?.additional_warranty
                            ?.message
                        }
                        helperText={
                          errors?.productInfo?.length > 0 &&
                          errors?.productInfo[index]?.additional_warranty
                            ?.message
                        }
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
                    name={`productInfo.${index}.additional_warranty_charge`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Additional warranty charge"
                        type="number"
                        margin="dense"
                        size="small"
                        error={
                          errors?.productInfo?.length > 0 &&
                          !!errors?.productInfo[index]
                            ?.additional_warranty_charge?.message
                        }
                        helperText={
                          errors?.productInfo?.length > 0 &&
                          errors?.productInfo[index]?.additional_warranty_charge
                            ?.message
                        }
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          );
        })}
        <Button
          startIcon={<AddCircleIcon />}
          onClick={hdlAddMoreProduct}
          className="py-1 mt-2"
          variant="contained"
          color="success"
          size="small"
        >
          Add more product
        </Button>
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

export default ProductInfo;
