import { useNavigate, Link, NavLink } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/styles";

import {
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
} from "@mui/material";

const useStyles = makeStyles({
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // border: "1px solid black",
    fontSize: "30px",
    textAlign: "center",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  link: {
    margin: "5px",
    backgroundColor: "rgb(44,44,44)",
    color: "white",
    margin: 10,
    padding: 5,
    borderRadius: 5,
  },
  appbar: (theme) => ({
    backgroundColor: "rgb(255, 102, 0)",
    // backgroundColor: theme.palette.primary.main,
  }),
});
const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const role = useSelector((state) => state.login.role);
  const user = useSelector((state) => state.user.user);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const classes = useStyles(theme);
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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar position="sticky" className={classes.appbar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              className={classes.root}
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              EasyWork
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
              EasyWork
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
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="h5"
                  component={NavLink}
                  to={"/home/chats"}
                  className={classes.link}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          backgroundColor: "grey",
                          color: "orange",
                          boxShadow: "2px 2px 2px  black",
                        }
                      : {}
                  }
                  sx={{ textDecoration: "none" }}
                >
                  Chats
                </Typography>
                {role === "user" && (
                  <Typography
                    variant="h5"
                    component={NavLink}
                    className={classes.link}
                    to={"/home/workers"}
                    style={({ isActive }) =>
                      isActive
                        ? {
                            backgroundColor: "grey",
                            color: "orange",
                            boxShadow: "2px 2px 2px  black",
                          }
                        : {}
                    }
                    sx={{ textDecoration: "none" }}
                  >
                    Workers
                  </Typography>
                )}
                {role === "user" && (
                  <Typography
                    variant="h5"
                    component={NavLink}
                    className={classes.link}
                    to={"/home/myprojects"}
                    style={({ isActive }) =>
                      isActive
                        ? {
                            backgroundColor: "grey",
                            color: "orange",
                            boxShadow: "2px 2px 2px  black",
                          }
                        : {}
                    }
                    sx={{ textDecoration: "none" }}
                  >
                    MyProjects
                  </Typography>
                )}
                {role === "worker" && (
                  <Typography
                    variant="h5"
                    component={NavLink}
                    className={classes.link}
                    to={"/home/projects"}
                    style={({ isActive }) =>
                      isActive
                        ? {
                            backgroundColor: "grey",
                            color: "orange",
                            boxShadow: "2px 2px 2px  black",
                          }
                        : {}
                    }
                    sx={{ textDecoration: "none" }}
                  >
                    Projects
                  </Typography>
                )}
              </Box>
            )}

            {token && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                      p: 0,
                      size: "small",
                      padding: { xs: "2", md: "7px" },
                      backgroundColor: "rgb(85, 85, 72)",
                      boxShadow: "5",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        user.avatar
                          ? `${process.env.REACT_APP_HOST}/${user?.avatar}`
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
              <Box sx={{ position: "fixed", right: "0" }}>
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
