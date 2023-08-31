"use client";
import axios from "@/lib/axios";
import PreviewIcon from "@mui/icons-material/Preview";
import UndoIcon from "@mui/icons-material/Undo";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  params: { ref: string };
};

const ArchiveList = ({ params }: Props) => {
  const [archiveQuotations, setArchiveQuotations] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/quote/all_updated_quotes/?ref=${params.ref}`)
      .then(({ data }) => {
        setArchiveQuotations(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Box className="h_style flex flex-wrap gap-x-4 justify-between">
            <Typography variant="h6" component="h1">
              Archive List{" "}
              <Typography variant="caption">({params.ref})</Typography>
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<UndoIcon />}
              component={NextLink}
              href="/quotation"
            >
              Back Quotations
            </Button>
          </Box>
          <TableContainer className="">
            {loading ? (
              [...Array(rowsPerPage)].map((item, index) => {
                return (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={38}
                    className="mb-1"
                    key={uuidv4()}
                  />
                );
              })
            ) : archiveQuotations?.length > 0 ? (
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow className="[&>th]:font-semibold">
                    <TableCell width="50px">Sl</TableCell>
                    <TableCell>Ref. No</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {archiveQuotations.map((quot, index) => {
                    const { id, quotation_reference, client_name } = quot;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={uuidv4()}
                      >
                        <TableCell width="50px">{++index}</TableCell>
                        <TableCell>{quotation_reference}</TableCell>
                        <TableCell>
                          {client_name ? client_name : "N/A"}
                        </TableCell>
                        <TableCell align="right">
                          <NextLink href={`/admin/quotation/view/${id}`}>
                            <Chip
                              icon={<PreviewIcon />}
                              size="small"
                              color="primary"
                              label="View"
                              className="cursor-pointer"
                            />
                          </NextLink>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <Paper elevation={0} className="text-center">
                <Typography variant="h5" className="my-4 text-warning">
                  Quotation not found
                </Typography>
              </Paper>
            )}
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ArchiveList;
