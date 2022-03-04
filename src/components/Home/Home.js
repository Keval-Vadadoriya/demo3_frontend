import { Link, Outlet } from "react-router-dom";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";

const Home = () => {
  const role = useSelector((state) => state.login.role);

  return (
    <div className={classes.x}>
      <div className={classes.side1}>
        <ul>
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <Link to="chats">Chats</Link>
          </li>
          {/* <li>
            <Link to="review">Reviews</Link>
          </li> */}
          {role === "user" && (
            <li>
              <Link to="worker">Workers</Link>
            </li>
          )}
        </ul>
      </div>
      <div className={classes.side2}>
        <Outlet />
      </div>
    </div>
  );
};
export default Home;
