import { type Review } from './review'

export interface UserReview {
  user_reviewed: boolean
  review: Review
}
