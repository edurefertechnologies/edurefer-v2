"use client";

import { useState, useTransition } from "react";
import {
  MessageSquare,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { submitCourseReview } from "@/actions/courses/submit-course-review";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;

  user: {
    firstName: string;
    lastName: string | null;
    image: string | null;
  };
}

interface MyReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface Props {
  courseId: string;
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  myReview: MyReview | null;
  canReview: boolean;
}

export default function CourseReviews({
  courseId,
  reviews,
  averageRating,
  reviewCount,
  myReview,
  canReview,
}: Props) {
  const [rating, setRating] = useState(
    myReview?.rating ?? 0
  );

  const [hoverRating, setHoverRating] =
    useState(0);

  const [comment, setComment] = useState(
    myReview?.comment ?? ""
  );

  const [message, setMessage] =
    useState("");

  const [isPending, startTransition] =
    useTransition();

  const handleSubmit = () => {
    setMessage("");

    if (rating < 1 || rating > 5) {
      setMessage(
        "Please select a rating."
      );
      return;
    }

    startTransition(async () => {
      const result =
        await submitCourseReview({
          courseId,
          rating,
          comment,
        });

      setMessage(result.message);
    });
  };

  return (
    <section
      id="reviews"
      className="scroll-mt-24 py-12">
      <div className="mx-auto max-w-5xl">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Student Reviews
          </h2>

          <p className="mt-2 text-muted-foreground">
            See what students think about
            this course.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="mt-8 rounded-2xl border bg-card p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-5xl font-bold">
                {averageRating.toFixed(1)}
              </p>

              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <=
                          Math.round(
                            averageRating
                          )
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                        }`}
                    />
                  )
                )}
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Based on {reviewCount}{" "}
                {reviewCount === 1
                  ? "review"
                  : "reviews"}
              </p>
            </div>
          </div>
        </div>

        {/* Review Form */}
        {canReview && (
          <div className="mt-6 rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-semibold">
              {myReview
                ? "Edit Your Review"
                : "Rate This Course"}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Share your experience with
              other students.
            </p>

            {/* Stars */}
            <div className="mt-5 flex gap-2">
              {[1, 2, 3, 4, 5].map(
                (star) => {
                  const active =
                    star <=
                    (hoverRating || rating);

                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setRating(star)
                      }
                      onMouseEnter={() =>
                        setHoverRating(star)
                      }
                      onMouseLeave={() =>
                        setHoverRating(0)
                      }
                      className="transition hover:scale-110"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`h-8 w-8 ${active
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                          }`}
                      />
                    </button>
                  );
                }
              )}
            </div>

            {/* Comment */}
            <div className="mt-5">
              <label
                htmlFor="review-comment"
                className="text-sm font-medium"
              >
                Your Review
              </label>

              <textarea
                id="review-comment"
                value={comment}
                onChange={(event) =>
                  setComment(
                    event.target.value
                  )
                }
                maxLength={1000}
                rows={5}
                placeholder="Tell us about your experience with this course..."
                className="mt-2 w-full resize-none rounded-lg border bg-background p-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <div className="mt-1 text-right text-xs text-muted-foreground">
                {comment.length}/1000
              </div>
            </div>

            {message && (
              <p className="mt-3 text-sm">
                {message}
              </p>
            )}

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={
                isPending || rating === 0
              }
              className="mt-5"
            >
              {isPending
                ? "Saving..."
                : myReview
                  ? "Update Review"
                  : "Submit Review"}
            </Button>
          </div>
        )}

        {/* Non-enrolled */}
        {!canReview && (
          <div className="mt-6 rounded-xl border bg-muted/30 p-5">
            <p className="text-sm text-muted-foreground">
              Only students enrolled in
              this course can submit a
              review.
            </p>
          </div>
        )}

        {/* Reviews */}
        <div className="mt-8 space-y-4">
          {reviews.length === 0 ? (
            <div className="rounded-2xl border p-8 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />

              <h3 className="mt-4 font-semibold">
                No reviews yet
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Be the first student to
                review this course.
              </p>
            </div>
          ) : (
            reviews.map((review) => {
              const studentName = [
                review.user.firstName,
                review.user.lastName,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <article
                  key={review.id}
                  className="rounded-2xl border bg-card p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold">
                        {studentName}
                      </p>

                      <div className="mt-2 flex gap-1">
                        {[
                          1, 2, 3, 4, 5,
                        ].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <=
                                review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                              }`}
                          />
                        ))}
                      </div>
                    </div>

                    <time className="text-xs text-muted-foreground">
                      {new Date(
                        review.updatedAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </time>
                  </div>

                  {review.comment && (
                    <p className="mt-4 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                      {review.comment}
                    </p>
                  )}
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}