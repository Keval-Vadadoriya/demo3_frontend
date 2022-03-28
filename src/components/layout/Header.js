import { useNavigate, Link } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import * as React from "react";

import MenuIcon from "@mui/icons-material/Menu";

import {
  Tab,
  Tabs,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  withTheme,
} from "@mui/material";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const token = useSelector((state) => state.login.token);
  const role = useSelector((state) => state.login.role);
  const user = useSelector((state) => state.user.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loginHandler = () => {
    navigate("/login", { replace: true });
  };
  const logoutHandler = () => {
    setAnchorElUser(null);

    if (window.confirm("Are You Sure?")) {
      localStorage.clear();
      dispatch(
        loginActions.setToken({
          token: "",
        })
      );
      navigate("/");
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    console.log(event.target.value);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event, value) => {
    console.log(event.target.value);
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              DEMO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              {token && (
                <>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem
                      key={"chats"}
                      component={Link}
                      to={`/home/chats`}
                      onClick={handleCloseNavMenu}
                    >
                      Chats
                    </MenuItem>
                    {role === "user" && (
                      <MenuItem
                        key={"workers"}
                        component={Link}
                        to={`/home/workers`}
                        onClick={handleCloseNavMenu}
                      >
                        Workers
                      </MenuItem>
                    )}
                    {role === "worker" && (
                      <MenuItem
                        key={"projects"}
                        component={Link}
                        to={`/home/projects`}
                        onClick={handleCloseNavMenu}
                      >
                        Projects
                      </MenuItem>
                    )}
                    {role === "user" && (
                      <MenuItem
                        key={"myprojects"}
                        component={Link}
                        to={`/home/myprojects`}
                        onClick={handleCloseNavMenu}
                      >
                        MyProjects
                      </MenuItem>
                    )}
                  </Menu>
                </>
              )}
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              DEMO
            </Typography>
            {token && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    md: "flex",
                    borderBottom: 1,
                    borderColor: "divider",
                  },
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  sx={{ textColor: "red" }}
                  aria-label="wrapped label tabs example"
                >
                  <Tab
                    key={"chats"}
                    label={"chats"}
                    component={Link}
                    to={"/home/chats"}
                    sx={{ color: "white", "&:hover": { color: "green" } }}
                  />
                  {role === "user" && (
                    <Tab
                      key={"workers"}
                      label={"workers"}
                      component={Link}
                      to={"/home/workers"}
                    />
                  )}
                  {role === "user" && (
                    <Tab
                      key={"myprojects"}
                      label={"myprojects"}
                      component={Link}
                      to={"/home/myprojects"}
                    />
                  )}
                  {role === "worker" && (
                    <Tab
                      key={"projects"}
                      label={"projects"}
                      component={Link}
                      to={"/home/projects"}
                    />
                  )}
                </Tabs>
              </Box>
            )}

            {token && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        user.avatar
                          ? `http://127.0.0.1:3001/${user?.avatar}`
                          : ""
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    component={Link}
                    to={"/home/profile"}
                    onClick={handleCloseUserMenu}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
            {!token && (
              <Box sx={{ flexGrow: 0 }}>
                <Button onClick={loginHandler} sx={{ color: "black" }}>
                  Login
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
