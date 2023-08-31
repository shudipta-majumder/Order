import { Box, TextareaAutosize, Typography } from "@mui/material";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Grid from "@mui/material/Grid";
dayjs.extend(LocalizedFormat);
type Props = { quotationDetails: {} };

const CoverLetter = ({ quotationDetails }: Props) => {
  // prettier-ignore
  //@ts-ignore
  const {quotation_reference,client_date,client_name,client_designation,client_address,rep_name,rep_designation,rep_mobile,rep_email,reference_no} = quotationDetails;
  return (
    <Box className="[&>*]:text-justify">
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="flex">
        <Grid item xs={12} md={6} className="md:order-1 xs:order-2">
          <Typography className="mb-3 ">
            Date: {dayjs(client_date).format("LL")}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} className="md:order-2 xs:order-1">
          <Typography className="mb-3 md:text-right	">
            {quotation_reference}
          </Typography>
        </Grid>
      </Grid>

      <Typography className="font-semibold mb-5">
        Reference No: {reference_no}
      </Typography>
      <Typography variant="h6" className="font-semibold">
        {client_name}
      </Typography>
      <Typography>{client_designation}</Typography>
      <Typography>{client_address}</Typography>
      <Typography variant="h6" className="font-semibold mt-10 mb-5">
        Technical Specification & Price Offer for &rdquo;Supply of Digital
        Products&rdquo;
      </Typography>
      <Box>
        <Typography className="mb-3">Dear Sir</Typography>
        <Typography className="mb-3">
          Greetings from WALTON Digi-Tech Industries Limited!{" "}
        </Typography>
        <Typography className="mb-3">
          We are sending this technical specification and price after as per
          your requirement. You have stated the need for IT products for your
          reputed organization.
        </Typography>
        <Typography className="mb-3">
          Our company is ons of the most reliable and credible entities to
          provide IT, IOT and Digital Products along with related Services. The
          quality of products and services we deliver to our customers is the
          best in the market.
        </Typography>
        <Typography className="mb-3">
          We are providing this business proposal along with the technical
          specification for your kind acknowledgement Hence we are grateful to
          you for allowing us to submit the business proposal and we are looking
          forward to serve you.
        </Typography>
      </Box>
      <Typography className="mt-8 mb-10">Sincerely yours</Typography>
      <Typography>-------------- </Typography>
      <Typography>
        Name : {rep_name}
        <br />
        Designation : {rep_designation}
        <br />
        Mobile :{rep_mobile}
        <br />
        E-mail : {rep_email}
      </Typography>
    </Box>
  );
};

export default CoverLetter;
