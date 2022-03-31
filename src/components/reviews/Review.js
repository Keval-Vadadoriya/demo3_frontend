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
import { addReview, getReviews } from "../../store/actions/review-actions";

const Review = (props) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [review, setReview] = useState(0);
  const [initialRating, setInitialRating] = useState(0);
  const { status, reviews, errorMessage } = useSelector(
    (state) => state.reviews
  );
  const role = useSelector((state) => state.login.role);

  const workerid = useParams();
  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const changeReviewHandler = (event, value) => {
    setInitialRating(value);
    setReview(value);
  };
  const addReviewHandler = async (event) => {
    event.preventDefault();
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

  useEffect(async () => {
    if (role === "user") {
      dispatch(getReviews({ workerId: workerid.id }));
    }
    if (role === "worker") {
      dispatch(getReviews({ workerId: props.workerId }));
    }
  }, []);
  let reviewList;
  if (reviews) {
    reviewList = reviews.map((review) => {
      return (
        <Box
          component="div"
          key={review._id}
          sx={{ backgroundColor: "#808080" }}
        >
          <Typography variant="h5" color="white">
            {review.owner.name}
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
      {/* {errorMessage && <p>{errorMessage}</p>} */}
      {/* {status === "loading" && <h1>hey</h1>} */}
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
