"use client";

import React from "react";
import {
  Box,
  Typography,
  FormLabel,
  FormControl,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  Divider,
  Checkbox,
  Button,
} from "@mui/material";

const page = () => {
  return (
    <Box className="w-full h-screen flex justify-center py-28	">
      <Box className="flex flex-col gap-y-20">
        <Box>
          <Box className="flex flex-col gap-y-4">
            <Box className="flex flex-row gap-x-4">
              <Typography className="text-gray-400">General info</Typography>
              <hr className="my-hr" />
            </Box>

            <Box>
              <FormControl>
                <Box className="flex flex-row gap-x-14">
                  <Box className="w-80">
                    <FormLabel>
                      <Typography className="text-black">Your Name </Typography>
                    </FormLabel>
                    <TextField
                      fullWidth
                      label="Name"
                      id="fullWidth"
                      margin="dense"
                    />
                  </Box>
                  <Box className="w-80">
                    <FormLabel>
                      <Typography className="text-black">
                        Your Designation{" "}
                      </Typography>{" "}
                    </FormLabel>
                    <TextField
                      fullWidth
                      label="Designation"
                      id="fullWidth"
                      margin="dense"
                    />
                  </Box>
                </Box>
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <Box className="flex flex-row gap-x-14">
                  <Box className="w-80">
                    <FormLabel>
                      <Typography className="text-black">Mobile </Typography>
                    </FormLabel>
                    <TextField
                      fullWidth
                      label="+880"
                      id="fullWidth"
                      margin="dense"
                    />
                  </Box>
                  <Box className="w-80">
                    <FormLabel>
                      <Typography className="text-black">E-mail </Typography>{" "}
                    </FormLabel>
                    <TextField
                      fullWidth
                      label="Email"
                      id="fullWidth"
                      margin="dense"
                    />
                  </Box>
                </Box>
              </FormControl>
            </Box>

            <Box className="flex flex-row gap-x-14">
              <Box className="flex flex-col gap-y-4">
                <FormLabel className="text-black"> Legal Entity</FormLabel>
                <Box className="w-80">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Legal Entity
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Legal Entity"
                    >
                      <MenuItem value={10}>Shudipta Majumder</MenuItem>
                      <MenuItem value={20}>Abu Sadat</MenuItem>
                      <MenuItem value={30}>Durul Huda</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box className="flex flex-col gap-y-4">
                <FormLabel className="text-black">Oparating Unit</FormLabel>
                <Box className="w-80">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Oparating Unit
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="CSelect Oparating Unit"
                    >
                      <MenuItem value={10}>sr. Officer</MenuItem>
                      <MenuItem value={20}>Principle Officer</MenuItem>
                      <MenuItem value={30}>Assistant Officer</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 1st end */}

        <Box>
          <Box className="flex flex-col gap-y-4">
            <Box className="flex flex-row gap-x-4">
              <Typography className="text-gray-400">Product info</Typography>
              <hr className="my-hr" />
            </Box>

            <Box className="flex flex-row gap-x-14">
              <Box className="flex flex-col gap-y-4">
                <FormLabel className="text-black">Catagory</FormLabel>
                <Box className="w-80">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Catagory
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Catagory"
                    >
                      <MenuItem value={10}>Shudipta Majumder</MenuItem>
                      <MenuItem value={20}>Abu Sadat</MenuItem>
                      <MenuItem value={30}>Durul Huda</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box className="flex flex-col gap-y-4">
                <FormLabel className="text-black">Model</FormLabel>
                <Box className="w-80">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Model
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Model"
                    >
                      <MenuItem value={10}>sr. Officer</MenuItem>
                      <MenuItem value={20}>Principle Officer</MenuItem>
                      <MenuItem value={30}>Assistant Officer</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>

            <Box>
              <FormControl>
                <Box className="flex flex-row gap-x-14">
                  <Box className="w-80">
                    <FormLabel>
                      <Typography className="text-black">Quantity</Typography>{" "}
                    </FormLabel>
                    <TextField
                      fullWidth
                      label="Input Quantity"
                      id="fullWidth"
                      margin="dense"
                    />
                  </Box>
                  <Box className="w-80">
                    <FormLabel className="flex flex-row gap-x-2">
                      <Typography className="text-black">Discount</Typography>{" "}
                      <Typography>(if any)</Typography>{" "}
                    </FormLabel>
                    <TextField
                      fullWidth
                      label="Discount"
                      id="fullWidth"
                      margin="dense"
                    />
                  </Box>
                </Box>
              </FormControl>
            </Box>

            <Box className="flex flex-row gap-x-2">
              <Box>Icon</Box>
              <Box className="flex flex-row gap-x-2">
                <Typography className="text-blue-800">Add more </Typography>
                <Typography> &</Typography>
                <Typography className="text-blue-800">
                  add multiple if once
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 2nd end */}

        <Box>
          <Box className="flex flex-col gap-y-4">
            <Box className="flex flex-row gap-x-4">
              <Typography className="text-gray-400">
                Policy & Payment
              </Typography>
              <hr className="my-hr" />
            </Box>

            <Box className="flex flex-row gap-x-14">
              <Box className="flex flex-col gap-y-4">
                <FormLabel className="text-black">Payment</FormLabel>
                <Box className="w-80">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Payment Mode
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Payment Mode"
                    >
                      <MenuItem value={10}>Shudipta Majumder</MenuItem>
                      <MenuItem value={20}>Abu Sadat</MenuItem>
                      <MenuItem value={30}>Durul Huda</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box className="w-80">
                <FormLabel className="flex flex-row gap-x-2">
                  <Typography className="text-black">
                    Delivery Lead Time
                  </Typography>{" "}
                  <Typography>(Working Days)</Typography>{" "}
                </FormLabel>
                <TextField
                  fullWidth
                  label="Delivery Lead Time"
                  id="fullWidth"
                  margin="dense"
                />
              </Box>

              {/* <Box className="flex flex-col gap-y-4">
                <FormLabel className="text-black">Price Validity</FormLabel>
                <Box className="w-80">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Price Validity
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Price Validity"
                    >
                      <MenuItem value={10}>sr. Officer</MenuItem>
                      <MenuItem value={20}>Principle Officer</MenuItem>
                      <MenuItem value={30}>Assistant Officer</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box> */}
            </Box>
            <Box className=" flex flex-col items-center gap-y-10">
              <Box className="w-full h-5 flex flex-row items-center gap-x-1">
                <Checkbox />
                <Typography>Is Applicable </Typography>
                <Typography className="text-blue-800"> VAT/AIT?</Typography>
              </Box>

              <Box>
                <Button size="large" type="submit" variant="contained">
                  Go Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 3rd end */}
      </Box>
    </Box>
  );
};

export default page;
