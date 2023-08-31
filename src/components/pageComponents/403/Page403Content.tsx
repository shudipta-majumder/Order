import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import NextLink from "next/link";

type Props = {};

const Page403Content = (props: Props) => {
  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid
          item
          xs={12}
          className="h-screen flex justify-center items-center"
        >
          <Box className="py-5 text-center">
            <LockPersonIcon className="text-2xl md:text-9xl" />
            <Typography variant="h4">
              Access to this page is restricted
            </Typography>
            <Typography>
              Please check with the site admin if you believe this is a mistake.
            </Typography>
            <NextLink href="/">
              <Button
                variant="contained"
                startIcon={<ReplayIcon />}
                className="mt-5"
              >
                Back to home
              </Button>
            </NextLink>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Page403Content;
