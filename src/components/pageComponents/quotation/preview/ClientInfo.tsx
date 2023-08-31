import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button, FormControl, Grid, Typography } from "@mui/material";
import NextLink from "next/link";

type Props = {};

const ClientInfo = ({ quotData }) => {
  const {
    id,
    client_date,
    client_name,
    client_designation,
    client_organization,
    client_address,
    reference_no,
  } = quotData;
  return (
    <Box className="my-6">
      <Box className="h_style flex flex-wrap gap-x-4 justify-between">
        <Typography variant="h6">Client Information</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<BorderColorIcon />}
          color="info"
          component={NextLink}
          href={`/quotation/new?id=${id}&step=0`}
        >
          Edit
        </Button>
      </Box>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Date</Typography>
            <Typography className="font-semibold">{client_date}</Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Reference no (if any)</Typography>
            <Typography className="font-semibold">{reference_no}</Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Organization</Typography>
            <Typography className="font-semibold">
              {client_organization}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Client Name</Typography>
            <Typography className="font-semibold">{client_name}</Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Client Designation</Typography>
            <Typography className="font-semibold">
              {client_designation}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Client Address</Typography>
            <Typography className="font-semibold">{client_address}</Typography>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientInfo;
