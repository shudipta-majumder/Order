"use client";
import { Box, Typography } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

import React from "react";

const page = () => {
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
        width: 920px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        text-align: justify;
        line-height: 1.8;
        padding: 18px;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[700] : grey[200]
        };
        box-shadow: 0px 2px 2px ${
          theme.palette.mode === "dark" ? grey[900] : grey[50]
        };
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${
            theme.palette.mode === "dark" ? blue[500] : blue[200]
          };
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
  );

  return (
    <Box className="flex flex-col items-center py-3	">
      <Box className="text-left">
        <Box className="ml-8	">
          <Box className="flex flex-col gap-y-11	">
            <Typography>Date: Day/Month/Year</Typography>
            <Typography>Reference No (if any)</Typography>
          </Box>
          <Box className="flex flex-col gap-y-11 ">
            <Box>
              <Typography variant="h6" className="font-extrabold	">
                Mr. Md. Joynal Abedin
              </Typography>
              <Typography>
                Executive Engineer <br />
                Dhaka WASA, Kawranbazar <br />
                Dhaka-1215, Bargladesh
              </Typography>
            </Box>
            <Typography variant="h6" className="font-extrabold">
              Technical Specification & Price Offer for &rdquo;Supply of Digital
              Products&rdquo;
            </Typography>
          </Box>
        </Box>

        <Box
          className="mt-8
"
        >
          <StyledTextarea
            maxRows={14}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua."
          />
        </Box>

        <Box className="flex flex-col mt-8 gap-y-28 ml-8">
          <Typography>Sincerely yours</Typography>
          <Box className="flex flex-col ">
            <Typography>-------------- </Typography>
            <Typography>Name </Typography>
            <Typography>Designation </Typography>
            <Typography>Mobile </Typography>
            <Typography>E-mail </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default page;
