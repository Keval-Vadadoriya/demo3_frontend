import { useNavigate, Link, NavLink } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/styles";
import logo from "../../logo.jpg";
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
import { chatActions } from "../../store/actions/chat-actions";
import { myprojectActions } from "../../store/actions/myproject-actions";
import { projectActions } from "../../store/actions/project-actions";
import { reviewActions } from "../../store/actions/review-actions";
import { signupActions } from "../../store/actions/signup-actions";
import { workersActions } from "../../store/actions/workers-action";
import { snackbarActions } from "../../store/snackbar-slice";
import { socketActions } from "../../store/socket-slice";
import { userActions } from "../../store/user-slice";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.third.extra,
    border: "3px dashed black",
    fontSize: "30px",

    textAlign: "center",
    borderTopLeftRadius: "25px",
    borderBottomRightRadius: "25px",
    // borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135)",
    color: "black",
    height: 48,
    padding: "0 30px",
  },
  link: {
    margin: "5px",
    backgroundColor: theme.palette.third.light,
    color: "black",
    margin: 10,
    padding: 10,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  appbar: (theme) => ({
    backgroundColor: theme.palette.secondary.main,
    // backgroundColor: theme.palette.primary.main,
  }),
}));
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
      dispatch(chatActions.reset());
      dispatch(myprojectActions.reset());
      dispatch(projectActions.reset());
      dispatch(reviewActions.reset());
      dispatch(signupActions.reset());
      dispatch(workersActions.reset());
      dispatch(loginActions.reset());
      dispatch(snackbarActions.reset());
      dispatch(socketActions.reset());
      dispatch(userActions.reset());
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
            <Avatar
              src={logo}
              sx={{
                mr: 2,
                display: {
                  xs: "none",
                  md: "flex",
                  height: "56px",
                  width: "56px",
                },
              }}
            />
            <Typography
              className={classes.root}
              variant="h6"
              noWrap
              component="div"
              fontFamily="Arvo,sans"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
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
              fontFamily="Arvo"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
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
                          backgroundColor: theme.palette.third.main,
                          color: theme.palette.secondary.main,
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
                            backgroundColor: theme.palette.third.main,
                            color: theme.palette.secondary.main,
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
                            backgroundColor: theme.palette.third.main,
                            color: theme.palette.secondary.main,
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
                            backgroundColor: theme.palette.third.main,
                            color: theme.palette.secondary.main,
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
                      backgroundColor: theme.palette.third.light,
                      "&:hover": { backgroundColor: theme.palette.third.main },
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
              <Box sx={{ position: "fixed", right: "20px" }}>
                <Button
                  variant="contained"
                  onClick={loginHandler}
                  sx={{
                    color: "black",
                    borderRadius: "10px",
                    backgroundColor: theme.palette.third.light,
                    width: "90px",
                    padding: "10px",
                    fontFamily: "Arvo",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: theme.palette.third.extra,
                    },
                  }}
                >
                  Sign In
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
