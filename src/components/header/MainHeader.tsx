"use client";
import DehazeIcon from "@mui/icons-material/Dehaze";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
} from "@mui/material";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import AccountNav from "../nav/AccountNav";
import MainNav from "../nav/MainNav";
import MainNavXs from "../nav/MainNavXs";
import { useSession } from "next-auth/react";

type Props = {};

const MainHeader = () => {
  const { data: session, status } = useSession();
  const [sticky, setSticky] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <AppBar
        component="header"
        position="sticky"
        className={`main-header-wrapper ${sticky && "active"} !bg-white`}
        color="inherit"
      >
        <Box className="nav-bar-wrapper">
          <Container maxWidth="lg">
            <Box className="nav-bar">
              <Box className={`nav-left`}>
                <Box className="nav-logo">
                  <NextLink href="/">
                    <NextImage
                      src="/images/logo/logo.png"
                      alt="logo"
                      width="100"
                      height="100"
                      priority
                    />
                  </NextLink>
                </Box>
                <Box className="hidden md:block">
                  <MainNav />
                </Box>
              </Box>
              <Box className="nav-right">
                <AccountNav />
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => setOpenDrawer(!openDrawer)}
                    className="cursor-pointer h-auto ml-4 min-w-[auto] md:hidden px-[7px] py-[3px]"
                  >
                    <DehazeIcon className="w-6 h-6" />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </AppBar>
      <Box className="md:hidden">
        <Drawer
          className="main-navbar-drawer"
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          sx={{ ".MuiDrawer-paper": { width: "300px" } }}
        >
          <MainNavXs />
        </Drawer>
      </Box>
    </>
  );
};

export default MainHeader;
