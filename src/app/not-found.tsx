"use client";
import React from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import NextLink from "next/link";

export default function Custom404() {
  return (
    <Box className="page-404">
      <Container maxWidth="xl" className="text-center">
        <Box
          className="page-wrap"
          sx={{
            margin: {
              xs: "30px 0",
              sm: "40px 0",
              md: "60px 0",
              lg: "80px 0",
              xl: "margin: 100px 0",
            },
          }}
        >
          <Typography variant="h3" sx={{ color: "extend.color6", mb: "10px" }}>
            Uh-0h! Page not found
          </Typography>
          <Typography
            className="sub-heading"
            sx={{
              maxWidth: { md: "40%" },
              marginLeft: { md: "auto" },
              marginRight: { md: "auto" },
            }}
          >
            Sorry, we could’t find this page. But don’t worry you can find
            plenty others things on
            <Typography
              component="span"
              className="color-text"
              sx={{ color: "primary.main" }}
            >
              {" "}
              home page{" "}
            </Typography>
          </Typography>
          <NextLink href="/">
            <Button
              size="small"
              component="span"
              variant="outlined"
              className="back-to-home basic-btn btn-3 btn-small"
              sx={{ mt: "12px" }}
            >
              Back to home
            </Button>
          </NextLink>
          <Box
            className="text-404"
            sx={{
              fontSize: {
                xs: "10rem",
                sm: "15rem",
                md: "20rem",
                lg: "25rem",
                xl: "32rem",
              },
              fontWeight: "bold",
              color: "extend.color6",
              lineHeight: 1,
              mt: "30px",
            }}
          >
            404
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
