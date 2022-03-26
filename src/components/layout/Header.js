import classes from "./header.module.css";
import { useNavigate, Link } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";
import LogoutOutlinedIcon from "@mui/icons-material/Logout";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import worker from "./log.png";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
const pages = ["Chats", "Workers", "MyProjects"];
const settings = ["Profile", "Logout"];
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const role = useSelector((state) => state.login.role);
  const user = useSelector((state) => state.user.user);

  const loginHandler = () => {
    navigate("/login", { replace: true });
  };
  const logoutHandler = () => {
    if (window.confirm("Are You Sure?")) {
      localStorage.clear();
      dispatch(
        loginActions.setLoginStatus({
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
    navigate(`/home/${event.target.value}`);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event, value) => {
    console.log(event.target.value);
    navigate(`/home/${event.target.value}`);
    setAnchorElUser(null);
  };
  return (
    <>
      {/* <header className={classes.header}>
        <img src={worker} width="8%" height="100%" alt="jdfssd" />
        <h1>Demo</h1>
        {token && (
          <ul>
            <li>
              <Link to="/home/profile" className={classes.link}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/home/chats" className={classes.link}>
                Chats
              </Link>
            </li>
            <li>
              {role === "user" && (
                <Link to="/home/workers" className={classes.link}>
                  Workers
                </Link>
              )}
              {role === "worker" && (
                <Link to="/home/projects" className={classes.link}>
                  Projects
                </Link>
              )}
            </li>
            <li>
              {role === "user" && (
                <Link to="/home/myprojects" className={classes.link}>
                  MyProjects
                </Link>
              )}
            </li>
          </ul>
        )}
        {!token && (
          <button onClick={loginHandler}>
            Login
            <LoginOutlinedIcon />
          </button>
        )}
        {token && (
          <button onClick={logoutHandler}>
            Logout
            <LogoutOutlinedIcon />
          </button>
        )}
      </header> */}
      <AppBar position="static">
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
                {pages.map((page) => (
                  <MenuItem key={page}>
                    <Button onClick={handleCloseNavMenu} value={page}>
                      {page}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              DEMO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  value={page}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={`http://127.0.0.1:3001/${user?.avatar}`}
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
                <MenuItem>
                  <Button onClick={handleCloseUserMenu} value="profile">
                    Profile
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button onClick={logoutHandler}>Logout</Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
