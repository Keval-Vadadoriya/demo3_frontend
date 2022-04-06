import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import {
  reviewActions,
  addReview,
  getReviews,
} from "../../store/actions/review-actions";
import { snackbarActions } from "../../store/snackbar-slice";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  review: {
    backgroundColor: "#808080",
    margin: "10px",
    padding: "10px",
    borderRadius: "20px",
  },
});

const Review = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [review, setReview] = useState(0);
  const [initialRating, setInitialRating] = useState(0);
  const { status, reviews, errorMessage } = useSelector(
    (state) => state.reviews
  );
  const role = useSelector((state) => state.login.role);

  const workerid = useParams();

  useEffect(() => {
    console.log("here");
    if (role === "user") {
      dispatch(getReviews({ workerId: workerid.id }));
    }
    if (role === "worker") {
      dispatch(getReviews({ workerId: props.workerId }));
    }
  }, [role]);
  useEffect(() => {
    if (status === "Review Added Successfully") {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "success",
          message: status,
        })
      );
      dispatch(reviewActions.setStatus({ status: "idle" }));
    }
    if (errorMessage) {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "error",
          message: errorMessage,
        })
      );
      dispatch(reviewActions.setErrorMessage({ errorMessage: "" }));
    }
  }, [status, errorMessage]);
  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const changeReviewHandler = (event, value) => {
    setInitialRating(value);
    setReview(value);
  };
  const addReviewHandler = async (event) => {
    event.preventDefault();
    setInitialRating(0);
    setDescription("");
    if (description.length > 0) {
      dispatch(
        addReview({
          description,
          review,
          workerId: workerid.id,
        })
      );
    }
  };

  let reviewList;
  if (reviews) {
    reviewList = reviews.map((review) => {
      return (
        <Box
          component="div"
          key={review._id}
          className={classes.review}
          sx={{}}
        >
          <Typography variant="h5" color="white">
            By {review.owner.name}
          </Typography>
          <Rating name="read-only" value={review.review} readOnly />
          <Typography variant="h6" color="white">
            {review.description}
          </Typography>
        </Box>
      );
    });
  }
  return (
    <>
      <Container>
        {reviews && reviewList}
        {errorMessage && <p>{errorMessage}</p>}
        {role === "user" && (
          <Box component="form" onSubmit={addReviewHandler}>
            <Typography variant="h4">Add Review</Typography>

            <TextField
              required
              fullWidth
              name="review-description"
              label="review-description"
              type="text"
              id="review-description"
              autoComplete="review-description"
              value={description}
              onChange={changeDescriptionHandler}
            />

            <Rating value={initialRating} onChange={changeReviewHandler} />
            <Button type="submit">Add Review</Button>
          </Box>
        )}
      </Container>
    </>
  );
};
export default Review;
