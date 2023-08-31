"use client";
import MainHeader from "@/components/header/MainHeader";
import { Box } from "@mui/material";
import React from "react";

const FullWidthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <Box className="my-6 md:my-10">{children}</Box>
    </>
  );
};

export default FullWidthLayout;
