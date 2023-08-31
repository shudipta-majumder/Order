import MainMenuItems from "@/utility/MainMenuItems";
import { Box } from "@mui/material";
import NextLink from "next/link";
import { useEffect } from "react";

const showChildMenu = (children) => {
  return children.map((cItem) => {
    if (cItem.children) {
      return (
        <li className="dropdown-link parent" key={cItem.key}>
          <a href="#">{cItem.label}</a>
          <ul className="dropdown second">{showChildMenu(cItem.children)}</ul>
        </li>
      );
    }
    return (
      <li className="dropdown-link" key={cItem.key}>
        <NextLink href={cItem.url} target={cItem.target}>
          {cItem.label}
        </NextLink>
      </li>
    );
  });
};

const MainNav = () => {
  return (
    <Box className="nav-links">
      <ul>
        {MainMenuItems.map((item) => {
          if (item.children) {
            return (
              <li className="nav-link parent" key={item.key}>
                <a href="#">{item.label}</a>
                <ul className="dropdown">{showChildMenu(item.children)}</ul>
              </li>
            );
          }
          return (
            <li className="nav-link" key={item.key}>
              <NextLink href={item.url} target={item.target}>
                {item.label}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default MainNav;
