import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GenericFormStates } from "./components/GenericFormStates";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./components/appbarstyles.css";


import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DisplayFormData from "./components/DisplayFormData";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Box sx={{ flexGrow: 1 }} style={{marginTop:'0px', marginBottom:'50px'}}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Link to="/" style={{marginRight:'15px'}}>
                  <Typography variant="h6" color="inherit" component="div">
                  Home
                  </Typography></Link>
                  <Link to="/formdata">
                  <Typography variant="h6" color="inherit" component="div">
                  Data
                </Typography></Link>
              </Toolbar>
            </AppBar>
          </Box>
          <Routes>
            <Route path="/" element={<GenericFormStates />} />
            <Route path="/formdata" element={<DisplayFormData />} />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
