"use client";
import axios from "@/lib/axios";
import PreviewIcon from "@mui/icons-material/Preview";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function QuotationList() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quotation, setQuotation] = useState({ total_row: 0, rows: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { data: session, status } = useSession();

  const router = useRouter();
  //@ts-ignore
  let userId = session?.user?.data?.id;
  useEffect(() => {
    setLoading(true);
    let timeoutId = setTimeout(() => {
      axios
        .get(
          search
            ? `/api/quote/allquotation/?q=${search}`
            : `/api/quote/allquotation/?user=${userId}&page_size=10&page_number=1`
        )
        .then(({ data }) => {
          setQuotation((prev) => {
            return { prev, ...data.data };
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setLoading(true);
    axios
      .get(
        `/api/quote/allquotation/?user=${userId}&page_size=${rowsPerPage}&page_number=${newPage}`
      )
      .then(({ data }) => {
        setQuotation(data.data);
        setPage(newPage);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    event.preventDefault();
  };

  return (
    <Container maxWidth="lg">
      <Box className="flex flex-row justify-center">
        <TextField
          className="max-w-[500px] mb-[20px]"
          placeholder="Search…"
          value={search}
          onChange={handleInputChange}
          fullWidth
          size="small"
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Box className="h_style flex flex-wrap gap-x-4 justify-between">
            <Typography variant="h6" component="h1">
              Quotation List
            </Typography>
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
            ) : quotation?.rows?.length > 0 ? (
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow className="[&>th]:font-semibold">
                    <TableCell width="50px">Sl</TableCell>
                    <TableCell>Ref. No</TableCell>
                    <TableCell>Organization</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      Archive
                    </TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quotation.rows.map((quot, index) => {
                    const {
                      id,
                      step,
                      quotation_reference,
                      client_name,
                      updated_number,
                      is_submitted,
                      client_organization,
                    } = quot;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={uuidv4()}
                      >
                        <TableCell width="50px">
                          {page * rowsPerPage - rowsPerPage + ++index}
                        </TableCell>
                        <TableCell>{quotation_reference}</TableCell>
                        <TableCell>{client_organization}</TableCell>
                        <TableCell>
                          {client_name ? client_name : "N/A"}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            component={NextLink}
                            href={`/admin/quotation/archive/${quotation_reference}`}
                            className="min-w-0"
                            disabled={updated_number > 0 ? false : true}
                          >
                            {updated_number}
                          </Button>
                        </TableCell>
                        <TableCell>
                          {is_submitted ? "Completed" : "In Complete"}
                        </TableCell>
                        <TableCell align="right">
                          <Box className="flex flex-row gap-2 justify-end">
                            <Tooltip title="View">
                              <Typography component="span">
                                <Button
                                  variant="contained"
                                  size="small"
                                  className="min-w-0"
                                  component={NextLink}
                                  href={`/admin/quotation/view/${id}`}
                                  disabled={is_submitted ? false : true}
                                >
                                  <PreviewIcon fontSize="small" />
                                </Button>
                              </Typography>
                            </Tooltip>
                          </Box>
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
          {quotation.total_row > rowsPerPage && (
            <Pagination
              size="small"
              count={Math.ceil(quotation.total_row / rowsPerPage)}
              variant="outlined"
              shape="rounded"
              color="primary"
              className="[&>ul]:justify-center mt-4"
              onChange={handleChangePage}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
