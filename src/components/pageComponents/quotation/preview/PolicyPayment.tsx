import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button, FormControl, Grid, Typography } from "@mui/material";
import NextLink from "next/link";

type Props = {};

const PolicyPayment = ({ quotData }) => {
  const { id, payment_mode, delivery_lead_time, price_validity, vat_ait } =
    quotData;
  return (
    <Box className="my-6">
      <Box className="h_style flex flex-wrap gap-x-4 justify-between">
        <Typography variant="h6">Policy & Payment</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<BorderColorIcon />}
          color="info"
          component={NextLink}
          href={`/quotation/new?id=${id}&step=2`}
        >
          Edit
        </Button>
      </Box>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Payment Mode</Typography>
            <Typography className="font-semibold">{payment_mode}</Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">
              Delivery Lead Time(Working days)
            </Typography>
            <Typography className="font-semibold">
              {delivery_lead_time}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Price Validity</Typography>
            <Typography className="font-semibold">{price_validity}</Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">VAT / AIT</Typography>
            <Typography className="font-semibold">
              {vat_ait ? "Yes" : "No"}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PolicyPayment;
