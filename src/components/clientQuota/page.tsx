"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const page = () => {
  return (
    <Box className="w-full h-screen flex justify-center items-center">
      <Box className="flex flex-col gap-y-4">
        <Box className="flex flex-row gap-x-4">
          <Typography className="text-gray-400">client info</Typography>
          <hr className="my-hr" />
        </Box>

        <Box>
          <FormControl>
            <Box className="flex flex-row gap-x-14">
              <Box>
                <FormLabel className="text-black">Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker className="w-80" label="Date" />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box className="w-80">
                <FormLabel className="flex flex-row gap-x-2">
                  <Typography className="text-black">Reference no </Typography>{" "}
                  <Typography>(if any)</Typography>{" "}
                </FormLabel>
                <TextField
                  fullWidth
                  label="Reference no"
                  id="fullWidth"
                  margin="dense"
                />
              </Box>
            </Box>
          </FormControl>
        </Box>

        <Box className="flex flex-row gap-x-14">
          <Box className="flex flex-col gap-y-4">
            <FormLabel className="text-black">Client Name</FormLabel>
            <Box className="w-80">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Client name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Client name"
                >
                  <MenuItem value={10}>Shudipta Majumder</MenuItem>
                  <MenuItem value={20}>Abu Sadat</MenuItem>
                  <MenuItem value={30}>Durul Huda</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box className="flex flex-col gap-y-4">
            <FormLabel className="text-black">Client Degignation</FormLabel>
            <Box className="w-80">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Client Degignation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Client Degignation"
                >
                  <MenuItem value={10}>sr. Officer</MenuItem>
                  <MenuItem value={20}>Principle Officer</MenuItem>
                  <MenuItem value={30}>Assistant Officer</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <FormLabel className="text-black">Client Address</FormLabel>
        <TextField
          id="standard-multiline-static"
          label="Client Address"
          multiline
          rows={3}
          variant="standard"
        />
        <Box className=" flex flex-col items-center gap-14	">
          <Box
            sx={{
              width: 700,
              height: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              align: "left",
            }}
          >
            <Checkbox />
            <Typography sx={{ fontSize: 14 }}>
              I accept all the{" "}
              <a className="text-sky-700 no-underline" href="">
                terms and conditions
              </a>{" "}
              . For check all the terms & Conditinon please{" "}
              <a className="text-sky-700 no-underline" href="">
                click
              </a>{" "}
              on the link.
            </Typography>
          </Box>

          <Box>
            <Button size="large" type="submit" variant="contained">
              Get Quote
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default page;
