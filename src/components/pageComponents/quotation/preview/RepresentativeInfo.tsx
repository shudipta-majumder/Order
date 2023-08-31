import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button, FormControl, Grid, Typography } from "@mui/material";
import NextLink from "next/link";

type Props = {};

const RepresentativeInfo = ({ quotData }) => {
  const { id, rep_name, rep_designation, rep_mobile, rep_email } = quotData;
  return (
    <Box className="my-6">
      <Box className="h_style flex flex-wrap gap-x-4 justify-between">
        <Typography variant="h6">Representative Info</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<BorderColorIcon />}
          color="info"
          component={NextLink}
          href={`/quotation/new?id=${id}&step=3`}
        >
          Edit
        </Button>
      </Box>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Name</Typography>
            <Typography className="font-semibold">{rep_name}</Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Designation</Typography>
            <Typography className="font-semibold">{rep_designation}</Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Mobile</Typography>
            <Typography className="font-semibold">{rep_mobile}</Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <Typography variant="subtitle2">Email</Typography>
            <Typography className="font-semibold">{rep_email}</Typography>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RepresentativeInfo;
