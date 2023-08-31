"use client";
import "@/styles/globals.scss";
import theme from "@/utility/theme/theme";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <SessionProvider>
          <main>
            <ProgressBar
              height="2px"
              color="#1976d2"
              options={{
                showSpinner: true,
                easing: "ease",
                speed: 500,
              }}
              shallowRouting
            />
            {children}
            {/* <SimpleBackdrop /> */}
            <ToastContainer
              containerId="corp-quot"
              position="top-right"
              autoClose={1500}
              draggable={false}
            />
          </main>
        </SessionProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
