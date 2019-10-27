import React, { memo } from "react";
import { AppBar, Toolbar, Paper } from "@material-ui/core";

const Layout = memo(({ header, children }) => (
  <Paper
    elevation={0}
    style={{
      padding: 0,
      margin: 0,
      backgroundColor: "inherit"
    }}
  >
    <AppBar color="primary" position="static">
      <Toolbar>{header}</Toolbar>
    </AppBar>
    {children}
  </Paper>
));

export default Layout;
