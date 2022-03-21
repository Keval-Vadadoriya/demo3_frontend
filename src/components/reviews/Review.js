import { useEffect, useState } from "react";
import ReviewCard from "../reviews/ReviewCard";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import classes from "./Review.module.css";
import { useSelector, useDispatch } from "react-redux";
import Rating from "react-rating";
import { addReview, getReviews } from "../../store/actions/review-actions";

const Review = () => {
  const ownerId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [review, setReview] = useState(0);
  const [initialRating, setInitialRating] = useState(0);
  const { status, reviews, errorMessage } = useSelector(
    (state) => state.reviews
  );

  // console.log(status, reviews);

  const workerid = useParams();
  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const changeReviewHandler = (value) => {
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
          owner: ownerId,
          workerId: workerid.id,
        })
      );
    }
  };
  if (status === "review added") {
    dispatch(getReviews(workerid.id));
  }

  useEffect(async () => {
    dispatch(getReviews(workerid.id));
  }, []);
  let reviewList;
  if (reviews) {
    reviewList = reviews.map((review) => {
      return (
        <ReviewCard
          description={review.description}
          name={review.owner.name}
          rating={review.review}
          key={review._id}
        />
      );
    });
  }
  return (
    <div className={classes.reviewlist}>
      {errorMessage && <p>{errorMessage}</p>}
      {status === "loading" && <h1>hey</h1>}
      <div>{reviews && reviewList}</div>
      <div className={classes.addReview}>
        <form onSubmit={addReviewHandler}>
          <h1>Add Review</h1>

          <Input
            label="review"
            input={{
              placeholder: "Enter a Review",
              id: "review",
              onChange: changeDescriptionHandler,
              type: "text",
              required: true,
            }}
          />
          <Rating
            start={0}
            stop={5}
            onClick={changeReviewHandler}
            initialRating={initialRating}
          />
          <br />
          <input type="submit" value="Add Review"></input>
        </form>
      </div>
    </div>
  );
};
export default Review;
