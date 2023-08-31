import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button, FormControl, Grid, Typography } from "@mui/material";
import NextLink from "next/link";
import { v4 as uuidv4 } from "uuid";

type Props = {};

const ProductInfo = ({ quotData }) => {
  const { id, product_details } = quotData;
  return (
    <Box className="my-6">
      <Box className="h_style flex flex-wrap gap-x-4 justify-between">
        <Typography variant="h6">Product Information</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<BorderColorIcon />}
          color="info"
          component={NextLink}
          href={`/quotation/new?id=${id}&step=1`}
        >
          Edit
        </Button>
      </Box>
      {product_details?.map((product, index) => {
        const {
          product_category_name,
          product_model_name,
          quantity,
          discount_pct,
          additional_warranty,
          additional_warranty_charge,
        } = product;
        return (
          <Box key={uuidv4()} className="my-4">
            <Typography variant="h6" className="opacity-60">
              Product: {++index}
            </Typography>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={6}>
                <FormControl margin="dense" fullWidth>
                  <Typography variant="subtitle2">Category</Typography>
                  <Typography className="font-semibold">
                    {product_category_name}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl margin="dense" fullWidth>
                  <Typography variant="subtitle2">Model</Typography>
                  <Typography className="font-semibold">
                    {product_model_name}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl margin="dense" fullWidth>
                  <Typography variant="subtitle2">Quantity</Typography>
                  <Typography className="font-semibold">{quantity}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl margin="dense" fullWidth>
                  <Typography variant="subtitle2">Discount (if any)</Typography>
                  <Typography className="font-semibold">
                    {discount_pct}
                  </Typography>
                </FormControl>
              </Grid>
              {additional_warranty && (
                <Grid item xs={12} md={6}>
                  <FormControl margin="dense" fullWidth>
                    <Typography variant="subtitle2">
                      Additional Warranty
                    </Typography>
                    <Typography className="font-semibold">
                      {additional_warranty}
                    </Typography>
                  </FormControl>
                </Grid>
              )}
              {additional_warranty_charge && (
                <Grid item xs={12} md={6}>
                  <FormControl margin="dense" fullWidth>
                    <Typography variant="subtitle2">
                      Additional Warranty Charge
                    </Typography>
                    <Typography className="font-semibold">
                      {additional_warranty_charge}
                    </Typography>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default ProductInfo;
